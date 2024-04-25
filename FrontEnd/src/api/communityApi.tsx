import { customAxios } from '@src/util/auth/customAxios'
import {
  CommentCreateType,
  CommentListDataType,
  CommunityCreateDataType,
} from '@src/types/CommunityType'

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

// 커뮤니티 댓글 생성 post api
export const commentCreate = async (
  commentCreateData: CommentCreateType,
): Promise<CommentListDataType> => {
  return customAxios
    .post(
      `/community/${commentCreateData.communityId}/comment`,
      commentCreateData.data,
    )
    .then(res => res.data)
    .catch(err => console.log(err))
}
// 커뮤니티 댓글 조회 get api
export const fetchCommentList = async (communityId: number) => {
  return customAxios
    .get(`/community/${communityId}/comment`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
