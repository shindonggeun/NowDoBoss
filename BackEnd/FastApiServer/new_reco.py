# import tensorflow as tf
# import tensorflow_recommenders as tfrs

# # 데이터 정의
# interactions_dict = {
#     "userId": [1, 2, 3, 4, 5],
#     "commercialCode": [1001, 1002, 1003, 1004, 1005],
#     "rating": [3.5, 4.0, 5.0, 3.0, 4.5],
#     "action": ["click", "search", "save", "analysis", "click"]
# }

# # 각 행동에 대한 가중치를 지정
# action_weights = {
#     "click": 2,
#     "search": 4,
#     "analysis": 7,
#     "save": 10
# }

# # TensorFlow 데이터셋으로 변환
# interactions = tf.data.Dataset.from_tensor_slices(interactions_dict)

# # 행동 가중치를 데이터셋에 추가
# def add_action_weights(feature):
#     return {**feature, "action_weight": action_weights[feature["action"]]}

# interactions = interactions.map(add_action_weights)

# # 추천 모델 정의
# class RecommenderModel(tfrs.Model):
#     def __init__(self, user_model, commercial_model, task):
#         super().__init__()
#         self.user_model = user_model
#         self.commercial_model = commercial_model
#         self.task = task

#     def compute_loss(self, features, training=False):
#         user_embeddings = self.user_model(features["userId"])
#         commercial_embeddings = self.commercial_model(features["commercialCode"])
#         return self.task(user_embeddings, commercial_embeddings, features["action_weight"])

# # 사용자 및 상품 모델 정의
# user_model = tf.keras.Sequential([
#     tf.keras.layers.StringLookup(vocabulary=unique_user_ids, mask_token=None),
#     tf.keras.layers.Embedding(len(unique_user_ids) + 1, embedding_dimension)
# ])

# commercial_model = tf.keras.Sequential([
#     tf.keras.layers.StringLookup(vocabulary=unique_commercial_codes, mask_token=None),
#     tf.keras.layers.Embedding(len(unique_commercial_codes) + 1, embedding_dimension)
# ])

# # Task 설정
# task = tfrs.tasks.Ranking(
#     loss=tf.keras.losses.MeanSquaredError(),
#     metrics=[tf.keras.metrics.RootMeanSquaredError()]
# )

# # 모델 컴파일 및 훈련
# model = RecommenderModel(user_model, commercial_model, task)
# model.compile(optimizer=tf.keras.optimizers.Adagrad(0.5))
# model.fit(interactions, epochs=10)
