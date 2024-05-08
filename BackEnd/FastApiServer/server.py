from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import recommendation
import asyncio

app = FastAPI()

class UserRequest(BaseModel):
    userId: int

# async def run_recommendation(userId: int):
#     try:
#         # 추천 기능을 포함하는 외부 모듈 또는 클래스의 메서드 호출
#         recommendations = await recommendation.recommend_commercials(userId)
#         return recommendations  # 추천 결과 반환

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# @app.post("/recommend")
# async def recommend_commercial_areas(request: UserRequest):
#     print("추천에 도착!")
#     print("확인!")
#     try:
#         print("추천하기 전!")
#         # 백그라운드에서 비동기 작업 실행
#         task = asyncio.create_task(run_recommendation(request.userId))
        
#         # 타임아웃 설정 (예: 5초)
#         try:
#             await asyncio.wait_for(task, timeout=5.0)
#         except asyncio.TimeoutError:
#             # 작업이 시간 초과되면 예외 처리
#             print("추천 요청이 시간 초과되었습니다.")
#             task.cancel()  # 작업 취소
#             raise HTTPException(status_code=504, detail="요청 시간 초과")
        
#         # 작업 완료 후 결과 반환
#         return {"message": "추천이 완료되었습니다."}
    
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
