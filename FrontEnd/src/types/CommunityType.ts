// 게시글 생성 시 보내는 데이터 type
export type CommunityCreateDataType = {
  category: string
  title: string
  content: string
  images: string[]
}

// 상세 페이지 get 요청 시 받은 데이터 리스트
export type CommunityData = {
  communityId: number
  category: string
  title: string
  content: string
  writerNickname: string
  readCount: number
  commentCount: number
  writerId: number
  writerProfileImage: string
  createdAt: string
  images: {
    imageId: 6
    url: string
  }[]
}

// 리스트 페이지 get 요청 시 받은 데이터 리스트
export type CommunityListData = {
  communityId: number
  category: string
  title: string
  content: string
  writerNickname: string
  readCount: number
  commentCount: number
}[]
