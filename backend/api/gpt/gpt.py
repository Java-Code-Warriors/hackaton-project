import requests
import json
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

YANDEX_API_KEY = "AQVN0C2Xw14JQ0CV4zzGbD_OFNdb3UxYNEYQ7bBV"
YANDEX_ENDPOINT = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Api-Key {YANDEX_API_KEY}",
}


def generate_prompt_from_request(request_obj):
    prompt_text = (
        f"Пользователь ищет подарок." +
        f"Пол: {request_obj.gender}" +
        f"Бюджет: {request_obj.budget}" +
        f"Назначение подарка: {request_obj.purpose}"
        f"Предложи подходящий подарок."
    )
    return prompt_text


async def process_gpt(promt_text):
    try:
        prompt = {
            "modelUri": "gpt://b1g953keccr0bd9r191t/yandexgpt-lite/latest",
            "completionOptions": {
                "stream": False,
                "temperature": 0.6,
                "maxTokens": "2000"
            },
            "messages": [
                {"role": "system", "text": "Предложи подходящий подарок.  Выведи только названия 5 товаров через запятую.  Все товары должны быть на сайте https://www.dns-shop.ru/"},
                {"role": "user", "text": promt_text}
            ]
        }


        response = requests.post(YANDEX_ENDPOINT, headers=headers, json=prompt, timeout=50)
        response.raise_for_status()
        data = json.loads(response.text)

        logging.info(f"Ответ от YandexGPT: {json.dumps(data, indent=2)}")
        
        result = data["result"]["alternatives"][0]["message"]["text"]
        print(result)
        
        return result

    except requests.exceptions.RequestException as e:
        logging.error(f"Ошибка запроса к YandexGPT: {e}")
        return f"Ошибка запроса к YandexGPT: {e}"
    except json.JSONDecodeError as e:
        logging.error(f"Ошибка декодирования JSON ответа: {e}")
        return f"Ошибка декодирования JSON ответа: {e}"
    except KeyError as e:
        logging.error(f"Ключ 'text' отсутствует в ответе YandexGPT: {e}")
        return f"Ошибка: Ответ YandexGPT не содержит ожидаемых данных."