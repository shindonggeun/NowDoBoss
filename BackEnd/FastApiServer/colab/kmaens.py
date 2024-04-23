from google.colab import drive
import joblib
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

drive.mount('/content/drive')


# 유동 인구 데이터 가져오기
file_path = "/content/drive/MyDrive/서울시 상권분석서비스(길단위인구-자치구).csv"  
df = pd.read_csv(file_path, encoding='CP949')
df = df[df['기준_년분기_코드'] == 20233]
df = df[['자치구_코드', '자치구_코드_명', '총_유동인구_수']]
df = df.sort_values(by='자치구_코드', ascending=True)

# 상권 변화 지표 데이터 데이터 프레임에 추가
file_path = "/content/drive/MyDrive/서울시 상권분석서비스(상권변화지표-자치구).csv"  
df2 = pd.read_csv(file_path, encoding='CP949')
df2 = df2[df2['기준_년분기_코드'] == 20233]
df2 = df2[['자치구_코드', '운영_영업_개월_평균', '폐업_영업_개월_평균']]
df2 = df2.sort_values(by='자치구_코드', ascending=True)

df = pd.merge(df, df2, on='자치구_코드', how='inner')

# 상주 인구 데이터 데이터 프레임에 추가
file_path = "/content/drive/MyDrive/서울시 상권분석서비스(상주인구-자치구).csv"  
df2 = pd.read_csv(file_path, encoding='CP949')
df2 = df2[df2['기준_년분기_코드'] == 20233]
df2 = df2[['자치구_코드', '총_상주인구_수']]
df2 = df2.sort_values(by='자치구_코드', ascending=True)

df = pd.merge(df, df2, on='자치구_코드', how='inner')

# 소득 소비 데이터 데이터 프레임에 추가
file_path = "/content/drive/MyDrive/서울시 상권분석서비스(소득소비-자치구).csv"  
df2 = pd.read_csv(file_path, encoding='CP949')
df2 = df2[df2['기준_년분기_코드'] == 20233]
df2 = df2.rename(columns={'행정동_코드': '자치구_코드'})
df2 = df2[['자치구_코드', '지출_총금액', '음식_지출_총금액']]
df2 = df2.sort_values(by='자치구_코드', ascending=True)

df = pd.merge(df, df2, on='자치구_코드', how='inner')

# 추정 매출 데이터 데이터 프레임에 추가
file_path = "/content/drive/MyDrive/서울시 상권분석서비스(추정매출-자치구).csv"  # 파일 경로를 적절히 수정하세요
df2 = pd.read_csv(file_path, encoding='CP949')
df2 = df2[df2['기준_년분기_코드'] == 20233]
df2 = df2[['자치구_코드', '당월_매출_금액']]
# '자치구코드'를 기준으로 그룹화하고 값을 더하기
df2 = df2.groupby('자치구_코드').sum()
df = pd.merge(df, df2, on='자치구_코드', how='inner')


# '자치구코드' 열을 제외한 열을 군집화에 사용
X = df.drop(columns=['자치구_코드', '자치구_코드_명'])

# 최적의 군집 개수를 찾기 위한 반복문
best_score = -1
best_k = 0

for k in range(3, 25):  # 군집 개수를 2부터 10까지 시도
    kmeans = KMeans(n_clusters=k, random_state=42)
    cluster_labels = kmeans.fit_predict(X)
    silhouette_avg = silhouette_score(X, cluster_labels)

    if silhouette_avg > best_score:
        best_score = silhouette_avg
        best_k = k
print("최적의 점수:", best_score)
print("최적의 군집 개수:", best_k)

cluster_centers = kmeans.cluster_centers_
print(cluster_centers)

# K-평균 군집화
kmeans = KMeans(n_clusters=best_k, random_state=42)
cluster_labels = kmeans.fit_predict(X)

cluster_centers = kmeans.cluster_centers_

# 각 군집의 중심점 좌표를 데이터프레임으로 변환하여 출력
cluster_centers_df = pd.DataFrame(cluster_centers, columns=X.columns)
print("각 군집의 중심점의 특성 값:")
print(cluster_centers_df)

# 각 자치구의 군집 레이블 확인
df['Cluster'] = cluster_labels


# 학습된 모델을 파일로 저장
joblib.dump(kmeans, 'kmeans_model.pkl')