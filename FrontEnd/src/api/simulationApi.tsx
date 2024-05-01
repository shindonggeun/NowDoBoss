import { customAxios } from '@src/util/auth/customAxios'

// export const fetchTopList = async () => {
//   return customAxios
//     .get(`/district/top/ten`)
//     .then(res => res.data)
//     .catch(err => console.log(err))
// }

// 시뮬레이션 업종별 가게 사이즈
export const fetchStoreSize = async (serviceCode: string) => {
  return customAxios
    .get(`/simulation/store?serviceCode=${serviceCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
