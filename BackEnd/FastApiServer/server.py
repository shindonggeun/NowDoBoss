from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import recommendation
import recommend
app = FastAPI()

class UserRequest(BaseModel):
    userId: int
    type: str
    code: int
@app.post("/recommend")
async def recommend_commercial_areas(request: UserRequest):
    try:
        recommendations = recommendation.recommend_commercials(request)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.on_event("shutdown")
def shutdown_event():
    recommendation.stop_spark()  # Spark 세션 종료 처리

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
