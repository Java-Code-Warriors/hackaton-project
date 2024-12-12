from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import uvicorn
import requests
import os

app = FastAPI()

# Замените на ваши ключи и ID каталога
YANDEX_API_KEY = os.environ.get("YANDEX_API_KEY")
YANDEX_CATALOG_ID = os.environ.get("b1g953keccr0bd9r191t")
YANDEX_ENDPOINT = "https://api.cloud.yandex.net/language-models/v1/models/yandexgpt-lite/generate" # Endpoint для YandexGPT Lite

headers = {
    "Authorization": f"Bearer {YANDEX_API_KEY}",
    "Content-Type": "application/json",
}

@app.post("/api/gpt")
async def process_data(request: Request):
    try:
        data = await request.json()
        input_text = data.get("input")
        if input_text is None:
            return JSONResponse({"error": "Missing input data"}, status_code=400)

        payload = {
            "query": input_text,
            "parameters": {
                "temperature": 0.7, # Настройте параметры по необходимости
                "max_tokens": 100,   # Настройте параметры по необходимости
            },
        }

        response = requests.post(YANDEX_ENDPOINT, headers=headers, json=payload)
        response.raise_for_status() # Проверка на ошибки HTTP

        result = response.json()
        return JSONResponse({"result": result["text"]}) # Возвращаем только текст ответа

    except requests.exceptions.RequestException as e:
        return JSONResponse({"error": f"YandexGPT API error: {e}"}, status_code=500)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)