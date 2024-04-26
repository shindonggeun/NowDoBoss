import { customAxios } from '@src/util/auth/customAxios'
import {
  CommentCreateType,
  CommentDeleteDataType,
  CommentListDataType,
  CommentModifyDataType,
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
// 커뮤니티 댓글 조회 get api
export const commentModify = async (
  commentModifyData: CommentModifyDataType,
) => {
  return customAxios
    .patch(
      `/community/${commentModifyData.communityId}/comment/${commentModifyData.commentId}`,
      commentModifyData.data,
    )
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 댓글 삭제 delete api
export const commentDelete = async (
  commentDeleteData: CommentDeleteDataType,
) => {
  return customAxios
    .delete(
      `/community/${commentDeleteData.communityId}/comment/${commentDeleteData.commentId}`,
    )
    .then(res => res.data)
    .catch(err => console.log(err))
}
