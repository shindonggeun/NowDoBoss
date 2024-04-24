from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.cluster import kmeans
import joblib
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from sklearn.metrics import pairwise_distances
from typing import List

# 유사 행정동 군집
foot_traffic_first = ['11530510', '11440720', '11650621', '11740660', '11215870', '11590510', '11260575', '11710632', '11380552', '11710562', '11215810', '11710580', '11320690', '11620625', '11305615', '11230600', '11215840', '11410620', '11440655', '11215770']
foot_traffic_second = ['11170660', '11200620', '11380632', '11350624', '11530595', '11305575', '11470680', '11710590', '11560670', '11320522', '11140665', '11200645', '11290780', '11290580', '11290590', '11200580', '11305603', '11650620', '11140645', '11620545']
foot_traffic_third = ['11305545', '11230545', '11740610', '11305555', '11380625', '11350595', '11620595', '11650530', '11560535', '11680650', '11290705', '11230560', '11410720', '11470650', '11305534', '11305635', '11680531', '11230536', '11440565', '11410585']

# 유동인구 모델을 불러오고 추천을 수행하는 함수
def get_foot_traffic_recommendations(user_id: int, type: int, code: str, commercial_list: List):
    # 모델 불러오기
    kmeans = joblib.load("kmeans_foot_traffic.pkl")

    # 주어진 새로운 데이터 - 받은 상권 코드 리스트들을 가지고 해당 상권 코드에 해당하는 유동인구 관련 데이터 리스트 가져오기
    # 이건 샘플
    data_values = [
        [3457038, 48.455614, 28.487740, 23.056588, 43.210399, -6.824034],
        [3866927, 58.545920, 28.324662, 13.129392, 45.081807, -4.413311],
        [940763, 55.902390, 25.147460, 18.950256, 45.104160, 1.674210],
        [1131589, 44.036837, 27.068043, 28.895120, 45.539604, -2.924892],
        [758392, 41.834038, 28.739755, 29.426339, 49.088934, -10.857430],
        [8433702, 42.462456, 29.820107, 27.717448, 46.550838, -2.046162],
        [6528442, 43.211841, 29.216037, 27.572153, 46.586358, -0.738406],
        [16988146, 43.768331, 29.215578, 27.016085, 47.498907, 0.274199],
        [8350, 51.137725, 28.215569, 20.646707, 45.173653, 5.044660],
        [7175487, 44.224664, 28.404525, 27.370811, 45.820607, -0.767818]
    ]

    new_data = np.array(data_values)

    # 1. 군집의 중심값 가져오기
    cluster_centers = kmeans.cluster_centers_

    # 2. 각 군집에서의 상위 3개의 유사한 데이터와 유사도 찾기
    top3_foot_traffic_recommendations = [[] for _ in range(len(kmeans.cluster_centers_))]
    for cluster_index in range(len(kmeans.cluster_centers_)):
        cluster_center = cluster_centers[cluster_index]
        similarities_to_cluster_center = cosine_similarity(new_data, [cluster_center])
        cluster_data_indices = np.argsort(similarities_to_cluster_center[:, 0])[::-1][:3]  # 해당 군집의 상위 3개 데이터의 인덱스
        for similarity, data_index in zip(similarities_to_cluster_center[cluster_data_indices], cluster_data_indices):
            similar_data = data_values[data_index]
            top3_foot_traffic_recommendations[cluster_index].append({
                '상권코드': data_index,
                '유사도': similarity[0],
                '입력데이터': similar_data[0:],
            })

    # 3. 결과 출력
    print("각 군집별 유사도 Top 3:")
    for cluster_index, top3 in enumerate(top3_foot_traffic_recommendations):
        print(f"Cluster {cluster_index}:")
        for idx, similar in enumerate(top3):
            print(f"Top {idx+1}: {similar}")

    return top3_foot_traffic_recommendations

# 매출 모델을 불러오고 추천을 수행하는 함수
def get_sales_recommendations(user_id: int, num_recommendations: int):
    # 모델 불러오기
    kmeans = joblib.load("kmeans_sales.pkl")

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

class Commercial(BaseModel):
    commercial_code: str
    commercial_code_name: str

# 추천 요청에 사용될 요청 데이터 모델
class RecommendationRequest(BaseModel):
    user_id: int
    type: int
    code: str
    commercial_list: List[Commercial]



# 유동인구 추천 API 엔드포인트
@app.post("/recommendations/foot/traffic")
async def foot_traffic_recommendations(request: RecommendationRequest):
    user_id = request.user_id
    type = request.type
    commercial_list = request.commercial_list

    recommendations = get_foot_traffic_recommendations(user_id, type, commercial_list)
    return {"recommendations": recommendations}


# 매출 추천 API 엔드포인트
@app.post("/recommendations/sales")
async def sales_recommendations(request: RecommendationRequest):
    user_id = request.user_id
    type = request.type
    commercial_list = request.commercial_list

    recommendations = get_foot_traffic_recommendations(user_id, type, commercial_list)
    return {"recommendations": recommendations}


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}
