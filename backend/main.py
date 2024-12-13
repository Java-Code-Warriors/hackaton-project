from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import uvicorn
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from api.gpt.gpt import process_gpt
from api.gpt.gpt import generate_prompt_from_request

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QuestRequest(BaseModel):
    gender: str
    budget: str
    purpose: str


@app.post("/api/gpt/text")
async def process_data(request: Request):
    try:
        data = await request.json()
        input_text = data.get("text")
        if input_text is None:
            return JSONResponse({"error": "Missing input data"}, status_code=400)
        result = await process_gpt(input_text)

        return JSONResponse({"text": result})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

@app.post("/api/gpt/quest")
async def process_quest(request: QuestRequest):
    try:
        promt_text = generate_prompt_from_request(request)
        print(promt_text)
        result = await process_gpt(promt_text)
        return JSONResponse({"response": result})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)



@app.middleware("http")
async def log_requests(request: Request, call_next):
    print(f"Получен запрос: {request.method} {request.url}")
    response = await call_next(request)
    print(f"Ответ: {response.status_code}")
    return response


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
