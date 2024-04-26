import { customAxios } from '@src/util/auth/customAxios'

// 자치구 top10 리스트 + 자치구 나열
export const fetchTopList = async () => {
  return customAxios
    .get(`/district/top/ten`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
