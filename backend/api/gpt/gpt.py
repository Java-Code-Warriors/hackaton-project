import requests
from fastapi import HTTPException
import json
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

YANDEX_API_KEY = "AQVN0C2Xw14JQ0CV4zzGbD_OFNdb3UxYNEYQ7bBV"
YANDEX_ENDPOINT = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Api-Key {YANDEX_API_KEY}",
}


def process_gpt(text):
    try:
        prompt = {
            "modelUri": "gpt://b1g953keccr0bd9r191t/yandexgpt-lite/latest",
            "completionOptions": {
                "stream": False,
                "temperature": 0.6,
                "maxTokens": "2000"
            },
            "messages": [
                {"role": "system", "text": "Ты умный ассистент"},
                {"role": "user", "text": text}
            ]
        }

        response = requests.post(YANDEX_ENDPOINT, headers=headers, json=prompt)
        response.raise_for_status()
        data = response.json()
        result = data["result"]["alternatives"][0]["message"]["text"]
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
