from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import recommendation
import asyncio

app = FastAPI()

class UserRequest(BaseModel):
    userId: int


@app.post("/recommend")
async def recommend_commercial_areas(request: UserRequest):
    print("추천에 도착!")
    return recommendation.recommend_commercials(request.userId)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
