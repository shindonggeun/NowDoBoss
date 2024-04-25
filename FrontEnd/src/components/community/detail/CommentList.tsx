import * as c from '@src/components/styles/community/CommentListStyle'
import React, { useState } from 'react'
import TimeCounting, { TimeCountingOption } from 'time-counting'
import { useMutation, useQuery } from '@tanstack/react-query'
import { commentCreate, fetchCommentList } from '@src/api/communityApi.tsx'
import { CommentCreateType, CommentDataType } from '@src/types/CommunityType'

interface CommentPropsType {
  communityId: string | undefined
}

const CommentList = (props: CommentPropsType) => {
  const { communityId } = props
  const [comment, setComment] = useState<string>('')
  // 생성 시간 보여주는 라이브러리 사용
  const TimeOption: TimeCountingOption = {
    // 기준이 되는 현재 시간
    objectTime: new Date(),
    lang: 'ko',
    calculate: {
      justNow: 3601,
    },
  }
  // 댓글 목록 호출
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fetchCommentList'],
    queryFn: () => fetchCommentList(Number(communityId)),
  })

  // 댓글 생성
  const { mutate } = useMutation({
    mutationFn: commentCreate,
    onSuccess: () => {
      refetch()
    },
  })

  const onSubmit = () => {
    const commentCreateData: CommentCreateType = {
      communityId: Number(communityId),
      data: { content: comment },
    }
    mutate(commentCreateData)
    setComment('')
  }

  return (
    <div>
      {!isLoading && data ? (
        <c.Container>
          <c.CommentTitle>댓글 {data.dataBody.length}</c.CommentTitle>
          <c.CommentBox>
            <c.CommentInput
              $isActive={comment.length > 0}
              placeholder="댓글을 작성하세요."
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setComment(e.target.value)
              }}
            />
            <c.CommentSubmit
              $isActive={comment.length > 0}
              onClick={() => {
                onSubmit()
              }}
            >
              작성
            </c.CommentSubmit>
          </c.CommentBox>
          {data.dataBody.map((comment: CommentDataType) => (
            <c.CommentCard key={comment.commentId}>
              <c.CommentContainer>
                <c.CommentContainer>
                  <c.CommentProfile />
                  <c.CommentUser>
                    <c.CommentName>{comment.writerNickname}</c.CommentName>
                    {/* <m.CommentTime>2024-03-12 16:40</m.CommentTime> */}
                    <c.CommentTime>
                      {TimeCounting('2024-04-24 4:00:00', TimeOption)}
                    </c.CommentTime>
                  </c.CommentUser>
                </c.CommentContainer>
                <c.ModDiv>
                  <c.ModButton>수정</c.ModButton>
                  <c.ModButton>삭제</c.ModButton>
                </c.ModDiv>
              </c.CommentContainer>
              <c.CommentContent>{comment.content}</c.CommentContent>
            </c.CommentCard>
          ))}
        </c.Container>
      ) : (
        ''
      )}
    </div>
  )
}

export default CommentList
