import { customAxios } from '@src/util/auth/customAxios'

// export const fetchTopList = async () => {
//   return customAxios
//     .get(`/district/top/ten`)
//     .then(res => res.data)
//     .catch(err => console.log(err))
// }

// 시뮬레이션 업종별 가게 사이즈
export const fetchStoreSize = async (serviceCode: string) => {
  // console.log(serviceCode)
  // console.log('가게 데이터 가져오는중')
  return customAxios
    .get(`/simulation/store?serviceCode=${serviceCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 시뮬레이션 프렌차이즈 검색
export const fetchFranchiseList = async (
  keyword: string | null,
  lastId: number,
) => {
  // console.log('==프렌차이즈 검색중==')
  return customAxios
    .get(`/simulation/franchisee?keyword=${keyword}&lastId=${lastId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
