import { customAxios } from '@src/util/auth/customAxios'
import { CommunityCreateDataType } from '@src/types/CommunityType'

// 커뮤니티 게시글 생성 post api
export const communityCreate = async (data: CommunityCreateDataType) => {
  return customAxios
    .post(`/community`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 커뮤니티 목록 get api
export const fetchCommunityList = async (category: string) => {
  return customAxios
    .get(`/community?category=${category}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 커뮤니티 상세 get api
export const fetchCommunityDetail = async (communityId: number) => {
  return customAxios
    .get(`/community/${communityId}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
