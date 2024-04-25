import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt
from sklearn.metrics import silhouette_samples
import numpy as np
import joblib

# 1. 유동 인구 모델
# 엑셀 파일 읽기
file_path = "/content/drive/MyDrive/서울시 상권분석서비스(길단위인구-행정동).csv"  # 파일 경로를 적절히 수정하세요
df = pd.read_csv(file_path, encoding='CP949')

# 필요한 데이터만 추출
df_current = df[df['기준_년분기_코드'] == 20233]
df_previous = df[df['기준_년분기_코드'] == 20224]
df = df[df['기준_년분기_코드'] == 20233]

# 유동인구 증감률 계산 및 새로운 열 추가
df['유동인구_증감률'] = ((df_current['총_유동인구_수'].values - df_previous['총_유동인구_수'].values) / df_previous['총_유동인구_수'].values) * 100
df['활동시간_유동인구_비율'] = (df['시간대_06_11_유동인구_수'] + df['시간대_11_14_유동인구_수'] + df['시간대_14_17_유동인구_수']) / df['총_유동인구_수'] * 100
df['야간시간_유동인구_비율'] = (df['시간대_17_21_유동인구_수'] + df['시간대_21_24_유동인구_수']) / df['총_유동인구_수'] * 100
df['심야시간_유동인구_비율'] = df['시간대_00_06_유동인구_수'] / df['총_유동인구_수'] * 100
df['유동인구_평균연령'] = (df['연령대_10_유동인구_수']*15 + df['연령대_20_유동인구_수']*25 + df['연령대_30_유동인구_수']*35 + df['연령대_40_유동인구_수']*45 + df['연령대_50_유동인구_수']*55 + df['연령대_60_이상_유동인구_수']*80) / df['총_유동인구_수']

# 필요한 열만 선택
df = df[['행정동_코드', '행정동_코드_명', '총_유동인구_수', '활동시간_유동인구_비율', '야간시간_유동인구_비율', '심야시간_유동인구_비율', '유동인구_평균연령', '유동인구_증감률']]

# '자치구코드' 열을 제외한 열을 군집화에 사용
X = df.drop(columns=['행정동_코드', '행정동_코드_명'])

# 최적의 군집 개수를 찾기 위한 반복문
best_score = -1
best_k = 0

for k in range(3, 10):  # 군집 개수를 3부터 10까지 시도
    kmeans = KMeans(n_clusters=k, random_state=42)
    cluster_labels = kmeans.fit_predict(X)
    silhouette_avg = silhouette_score(X, cluster_labels)

    if silhouette_avg > best_score:
        best_score = silhouette_avg
        best_k = k

cluster_centers = kmeans.cluster_centers_

# K-평균 군집화
kmeans = KMeans(n_clusters=best_k, random_state=42)
cluster_labels = kmeans.fit_predict(X)

cluster_centers = kmeans.cluster_centers_

# 각 군집의 중심점 좌표를 데이터프레임으로 변환하여 출력
cluster_centers_df = pd.DataFrame(cluster_centers, columns=X.columns)

# 각 자치구의 군집 레이블 확인
df['Cluster'] = cluster_labels

# 각 데이터 포인트의 실루엣 계수 계산
silhouette_values = silhouette_samples(X, cluster_labels)

# 각 데이터 포인트를 그룹별로 정렬
df_copy = df.copy()  # Series를 복사
df_copy['Silhouette'] = silhouette_values
df_copy.sort_values(by='Cluster', inplace=True)

# 실루엣 계수 시각화
plt.figure(figsize=(10, 6))

y_lower = 10
for i in range(best_k):
    cluster_silhouette_values = df_copy[df_copy['Cluster'] == i]['Silhouette']
    cluster_silhouette_values = cluster_silhouette_values.sort_values(ascending=False)  # 복사된 Series를 정렬
    cluster_size = cluster_silhouette_values.shape[0]
    y_upper = y_lower + cluster_size

    color = plt.cm.get_cmap('tab10')(float(i) / best_k)
    plt.fill_betweenx(np.arange(y_lower, y_upper), 0, cluster_silhouette_values, facecolor=color, edgecolor=color, alpha=0.7)

    plt.text(-0.05, y_lower + 0.5 * cluster_size, str(i))

    # 작은 군집의 샘플 포인트를 표시
    if cluster_size == 1:
        plt.scatter(0, y_lower + 0.5, color=color, marker='o', s=100)  # 작은 군집의 샘플 포인트 표시

    y_lower = y_upper + 10

plt.xlabel('Silhouette Coefficients')
plt.ylabel('Cluster')
plt.title('Silhouette Plot for KMeans Clustering')
plt.axvline(x=silhouette_avg, color='red', linestyle='--')
plt.yticks([])
plt.show()

# 학습된 모델을 파일로 저장
joblib.dump(kmeans, 'kmeans_foot_traffic.pkl')



# ------------------------------------------------------------------------------------------------------------------------
# 2. 추정 매출
file_path = "/content/drive/MyDrive/서울시 상권분석서비스(추정매출-행정동).csv"  # 파일 경로를 적절히 수정하세요
df = pd.read_csv(file_path, encoding='CP949')
df = df[df['기준_년분기_코드'] == 20233]

# '행정동_코드'를 기준으로 그룹화하여 당월 매출 금액 합계 구하기
df = df.groupby('행정동_코드').sum('당월_매출_금액').reset_index()
df = df[['행정동_코드', '당월_매출_금액']]

file_path = "/content/drive/MyDrive/서울시_상권분석서비스(추정매출-행정동)_2022년.csv"  # 파일 경로를 적절히 수정하세요
df2 = pd.read_csv(file_path, encoding='CP949')
df2 = df2[df2['기준_년분기_코드'] == 20224]

# '행정동_코드'를 기준으로 그룹화하여 당월 매출 금액 합계 구하기
df2 = df2.groupby('행정동_코드').sum('당월_매출_금액').reset_index()
df2 = df2[['행정동_코드', '당월_매출_금액']]

df = pd.merge(df, df2, on='행정동_코드', how='inner')

df['당월_매출_증감률'] = (df['당월_매출_금액_x'] - df['당월_매출_금액_y']) / df['당월_매출_금액_y'] * 100

file_path = "/content/drive/MyDrive/서울시 상권분석서비스(추정매출-행정동).csv"  # 파일 경로를 적절히 수정하세요
df2 = pd.read_csv(file_path, encoding='CP949')
df2 = df2[df2['기준_년분기_코드'] == 20233]
service_code_list = df2['서비스_업종_코드'].unique().tolist()
df2 = df2[['행정동_코드', '서비스_업종_코드', '당월_매출_금액']]

# 각 서비스 업종 코드에 대한 새로운 칼럼을 추가하고 값을 0으로 초기화
for code in service_code_list:
    df[code] = 0
df = df[['행정동_코드', '당월_매출_금액_x', '당월_매출_증감률', 'CS100001', 'CS100002', 'CS100003', 'CS100004', 'CS100005', 'CS100006', 'CS100007', 'CS100008', 'CS100009', 'CS100010', 'CS200001', 'CS200002', 'CS200003', 'CS200005', 'CS200006', 'CS200007', 'CS200008', 'CS200016', 'CS200017', 'CS200019', 'CS200024', 'CS200025', 'CS200026', 'CS200028', 'CS200029', 'CS200030', 'CS200031', 'CS200032', 'CS200033', 'CS200034', 'CS200036', 'CS200037', 'CS300001', 'CS300002', 'CS300003', 'CS300004', 'CS300006', 'CS300007', 'CS300008', 'CS300009', 'CS300010', 'CS300011', 'CS300014', 'CS300015', 'CS300016', 'CS300017', 'CS300018', 'CS300019', 'CS300020', 'CS300021', 'CS300022', 'CS300024', 'CS300025', 'CS300026', 'CS300027', 'CS300028', 'CS300029', 'CS300031', 'CS300032', 'CS300033', 'CS300035', 'CS300036', 'CS300043']]

# df의 행정동 코드와 서비스 업종 코드를 기준으로 df2의 당월 매출 총액 값을 df에 삽입
for index, row in df.iterrows():
    for code in service_code_list:
        # df2에서 해당 행정동 코드와 서비스 업종 코드가 일치하는 행을 찾음
        matching_row = df2[(df2['행정동_코드'] == row['행정동_코드']) & (df2['서비스_업종_코드'] == code)]
        if not matching_row.empty:
            # 일치하는 경우 해당 값으로 df에 삽입
            df.loc[index, code] = matching_row['당월_매출_금액'].iloc[0]

# 서비스 업종 코드를 대분류로 매핑하는 딕셔너리 생성
code_mapping = {
    'CS100001': 'RESTAURANT', 'CS100002': 'RESTAURANT', 'CS100003': 'RESTAURANT', 'CS100004': 'RESTAURANT', 'CS100005': 'RESTAURANT',
    'CS100006': 'RESTAURANT', 'CS100007': 'RESTAURANT', 'CS100008': 'RESTAURANT', 'CS100009': 'RESTAURANT', 'CS100010': 'RESTAURANT',
    'CS200001': 'ACADEMY', 'CS200002': 'ACADEMY', 'CS200003': 'ACADEMY', 'CS200005': 'ACADEMY',
    'CS200016': 'LEISURE', 'CS200017': 'LEISURE', 'CS200019': 'LEISURE', 'CS200024': 'LEISURE', 'CS200037': 'LEISURE',
    'CS200006': 'SERVICE', 'CS200007': 'SERVICE', 'CS200008': 'SERVICE', 'CS200031': 'SERVICE', 'CS200032': 'SERVICE',
    'CS200033': 'SERVICE', 'CS200034': 'SERVICE', 'CS200036': 'SERVICE', 'CS200025': 'SERVICE', 'CS200026': 'SERVICE',
    'CS200028': 'SERVICE', 'CS200029': 'SERVICE', 'CS200030': 'SERVICE',
    'CS300001': 'RETAIL', 'CS300002': 'RETAIL', 'CS300003': 'RETAIL', 'CS300004': 'RETAIL',
    'CS300006': 'RETAIL', 'CS300007': 'RETAIL', 'CS300008': 'RETAIL', 'CS300009': 'RETAIL', 'CS300010': 'RETAIL',
    'CS300011': 'RETAIL', 'CS300014': 'RETAIL', 'CS300015': 'RETAIL', 'CS300016': 'RETAIL', 'CS300017': 'RETAIL',
    'CS300018': 'RETAIL', 'CS300019': 'RETAIL', 'CS300020': 'HOUSEHOLDS', 'CS300021': 'HOUSEHOLDS', 'CS300022': 'HOUSEHOLDS',
    'CS300024': 'HOUSEHOLDS', 'CS300026': 'HOUSEHOLDS', 'CS300027': 'HOUSEHOLDS', 'CS300028': 'HOUSEHOLDS', 'CS300029': 'HOUSEHOLDS',
    'CS300031': 'HOUSEHOLDS', 'CS300032': 'HOUSEHOLDS', 'CS300033': 'HOUSEHOLDS', 'CS300035': 'HOUSEHOLDS', 'CS300036': 'HOUSEHOLDS',
    'CS300043': 'HOUSEHOLDS'
}
# 새로운 대분류별 칼럼 생성
df['RESTAURANT'] = 0
df['ACADEMY'] = 0
df['LEISURE'] = 0
df['SERVICE'] = 0
df['RETAIL'] = 0
df['HOUSEHOLDS'] = 0
# 대분류로 매핑된 서비스 업종 코드에 대응하는 칼럼에 당월 매출 금액 할당
for index, row in df.iterrows():
    for code, category in code_mapping.items():
        df.loc[index, category] += row[code]
df = df[['행정동_코드', '당월_매출_금액_x', '당월_매출_증감률', 'RESTAURANT', 'ACADEMY', 'LEISURE', 'SERVICE', 'RETAIL', 'HOUSEHOLDS']]

# 각 업종별 매출을 비율로 변환
df.loc[:, 'RESTAURANT'] = df['RESTAURANT'] / df['당월_매출_금액_x'] * 100
df.loc[:, 'ACADEMY'] = df['ACADEMY'] / df['당월_매출_금액_x'] * 100
df.loc[:, 'LEISURE'] = df['LEISURE'] / df['당월_매출_금액_x'] * 100
df.loc[:, 'SERVICE'] = df['SERVICE'] / df['당월_매출_금액_x'] * 100
df.loc[:, 'RETAIL'] = df['RETAIL'] / df['당월_매출_금액_x'] * 100
df.loc[:, 'HOUSEHOLDS'] = df['HOUSEHOLDS'] / df['당월_매출_금액_x'] * 100

# '자치구코드' 열을 제외한 열을 군집화에 사용
X = df.drop(columns=['행정동_코드', '당월_매출_금액_x', '당월_매출_증감률'])

# 최적의 군집 개수를 찾기 위한 반복문
best_score = -1
best_k = 0

for k in range(6, 10):  # 군집 개수를 2부터 10까지 시도
    kmeans = KMeans(n_clusters=k, random_state=42)
    cluster_labels = kmeans.fit_predict(X)
    silhouette_avg = silhouette_score(X, cluster_labels)

    if silhouette_avg > best_score:
        best_score = silhouette_avg
        best_k = k
print("최적의 점수:", best_score)
print("최적의 군집 개수:", best_k)

cluster_centers = kmeans.cluster_centers_

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


# 각 데이터 포인트의 실루엣 계수 계산
silhouette_values = silhouette_samples(X, cluster_labels)

# 각 데이터 포인트를 그룹별로 정렬
df_copy = df.copy()  # Series를 복사
df_copy['Silhouette'] = silhouette_values
df_copy.sort_values(by='Cluster', inplace=True)

# 실루엣 계수 시각화
plt.figure(figsize=(10, 6))

y_lower = 10
for i in range(best_k):
    cluster_silhouette_values = df_copy[df_copy['Cluster'] == i]['Silhouette']
    cluster_silhouette_values = cluster_silhouette_values.sort_values(ascending=False)  # 복사된 Series를 정렬
    cluster_size = cluster_silhouette_values.shape[0]
    y_upper = y_lower + cluster_size

    color = plt.cm.get_cmap('tab10')(float(i) / best_k)
    plt.fill_betweenx(np.arange(y_lower, y_upper), 0, cluster_silhouette_values, facecolor=color, edgecolor=color, alpha=0.7)

    plt.text(-0.05, y_lower + 0.5 * cluster_size, str(i))

    # 작은 군집의 샘플 포인트를 표시
    if cluster_size == 1:
        plt.scatter(0, y_lower + 0.5, color=color, marker='o', s=100)  # 작은 군집의 샘플 포인트 표시

    y_lower = y_upper + 10

plt.xlabel('Silhouette Coefficients')
plt.ylabel('Cluster')
plt.title('Silhouette Plot for KMeans Clustering')
plt.axvline(x=silhouette_avg, color='red', linestyle='--')
plt.yticks([])
plt.show()

# 학습된 모델을 파일로 저장
joblib.dump(kmeans, 'kmeans_sales.pkl')