from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.cluster import kmeans
import joblib
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from sklearn.metrics import pairwise_distances

# 모델을 불러오고 추천을 수행하는 함수
def get_recommendations(user_id: int, num_recommendations: int):
    # 모델 불러오기
    kmeans = joblib.load("kmeans_model.pkl")

    # 주어진 새로운 데이터
    new_data = np.array([[63238612, 116, 56, 219681, 255881883000, 32067498000, 1.360529e+12, -1]])

    # 1. 새로운 데이터의 군집 예측
    new_data_cluster = kmeans.predict(new_data)
    print(new_data_cluster)

    # 2. 가장 유사도가 높은 군집 내의 모든 상권 데이터를 DB에서 가져오기
    #cluster_data = X[cluster_labels == new_data_cluster]
    cluster_data = 0

    # 3. 군집 내의 데이터와 유사도 계산
    similarities_to_cluster_data = cosine_similarity(new_data, cluster_data)

    # 4. 가장 유사도가 높은 자치구 데이터 3개 찾기
    top_similarities_to_cluster_data = sorted(enumerate(similarities_to_cluster_data[0]), key=lambda x: x[1], reverse=True)[:3]

    # 결과 출력
    print(f"Cluster with highest similarity: {new_data_cluster[0]}")
    print("Top 3 similar districts:")
    for idx, similarity in top_similarities_to_cluster_data:
        print(f"\tDistrict Index: {idx}, Similarity: {similarity:.4f}")

    return recommendations

app = FastAPI()


# 추천 요청에 사용될 요청 데이터 모델
class RecommendationRequest(BaseModel):
    user_id: int
    num_recommendations: int

# 추천 API 엔드포인트
@app.post("/recommendations/")
async def recommendations(request: RecommendationRequest):
    user_id = request.user_id
    num_recommendations = request.num_recommendations
    recommendations = get_recommendations(user_id, num_recommendations)
    return {"recommendations": recommendations}


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
