import * as c from '@src/components/styles/community/CommentListStyle'
import React, { useState } from 'react'
import TimeCounting, { TimeCountingOption } from 'time-counting'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  commentCreate,
  commentDelete,
  commentModify,
  fetchCommentList,
} from '@src/api/communityApi'
import {
  CommentCreateType,
  CommentDataType,
  CommentModifyDataType,
} from '@src/types/CommunityType'
import Swal from 'sweetalert2'
import NotLogin from '@src/common/swal/NotLogin.tsx'
import { useNavigate } from 'react-router-dom'

interface CommentPropsType {
  communityId: string | undefined
  userId: number
}

const CommentList = (props: CommentPropsType) => {
  const { communityId, userId } = props
  const navigate = useNavigate()
  // 댓글 작성창에 들어가는 데이터
  const [commentValue, setCommentValue] = useState<string>('')
  const [isMod, setIsMod] = useState<boolean>(false)
  // 댓글 수정창에 들어가는 데이터
  const [modCommentValue, setModCommentValue] = useState<string>('')
  const [modCommentIdValue, setModCommentIdValue] = useState<number>(0)

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
  const { mutate: mutateCreateComment } = useMutation({
    mutationFn: commentCreate,
    onSuccess: () => {
      // 댓글 생성 성공 시 댓글 목록 재호출
      refetch()
    },
  })

  const onSubmit = () => {
    const commentCreateData: CommentCreateType = {
      communityId: Number(communityId),
      data: { content: commentValue },
    }
    mutateCreateComment(commentCreateData)
    setCommentValue('')
  }

  // 댓글 수정
  const { mutate: mutateModifyComment } = useMutation({
    mutationFn: commentModify,
    onSuccess: () => {
      // 댓글 수정 성공 시 댓글 목록 재호출
      refetch()
      setIsMod(false)
    },
  })

  const onModify = () => {
    setIsMod(!isMod)
  }

  const onSubmitMod = () => {
    const commentModifyData: CommentModifyDataType = {
      communityId: Number(communityId),
      commentId: modCommentIdValue,
      data: { content: modCommentValue },
    }
    mutateModifyComment(commentModifyData)
  }

  // 댓글 삭제
  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: commentDelete,
    onSuccess: () => {
      // 댓글 삭제 성공 시 댓글 목록 재호출
      refetch()
    },
  })

  const onDelete = (commentId: number) => {
    Swal.fire({
      title: '댓글을 삭제하시겠습니까?',
      showDenyButton: true,
      icon: 'warning',
      confirmButtonText: '네',
      denyButtonText: '아니요',
      confirmButtonColor: '#429f50',
      cancelButtonColor: '#d33',
    }).then(result => {
      if (result.isConfirmed) {
        const CommentData = {
          communityId: Number(communityId),
          commentId,
        }
        mutateDeleteComment(CommentData)
      }
    })
  }

  const handleCommentInput = () => {
    if (!userId) {
      NotLogin(navigate)
    }
  }

  return (
    <div>
      {!isLoading && data ? (
        <c.Container>
          <c.CommentTitle>댓글 {data.dataBody.length}</c.CommentTitle>
          <c.CommentBox
            onClick={() => {
              handleCommentInput()
            }}
          >
            <c.CommentInput
              $isActive={commentValue.length > 0}
              placeholder="댓글을 작성하세요."
              value={commentValue}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setCommentValue(e.target.value)
              }}
            />
            <c.CommentSubmit
              $isActive={commentValue.length > 0}
              onClick={() => {
                onSubmit()
              }}
            >
              작성
            </c.CommentSubmit>
          </c.CommentBox>
          {data.dataBody.map((commentData: CommentDataType) => (
            <c.CommentCard key={commentData.commentId}>
              <c.CommentContainer>
                <c.CommentContainer>
                  <c.CommentProfile />
                  <c.CommentUser>
                    <c.CommentName>{commentData.writerNickname}</c.CommentName>
                    {/* <m.CommentTime>2024-03-12 16:40</m.CommentTime> */}
                    <c.CommentTime>
                      {TimeCounting(commentData.createdAt, TimeOption)}
                    </c.CommentTime>
                  </c.CommentUser>
                </c.CommentContainer>

                {commentData.writerId === userId ? (
                  <c.ModDiv>
                    <c.ModButton
                      onClick={() => {
                        setModCommentIdValue(commentData.commentId)
                        onModify()
                      }}
                    >
                      {!isMod ? '수정' : '취소'}
                    </c.ModButton>
                    <c.ModButton
                      onClick={() => {
                        onDelete(commentData.commentId)
                      }}
                    >
                      삭제
                    </c.ModButton>
                  </c.ModDiv>
                ) : (
                  ''
                )}
              </c.CommentContainer>
              {/* 수정 버튼 눌렀을 때 */}
              {isMod ? (
                <c.CommentMod>
                  <c.CommentBox>
                    <c.CommentInput
                      $isActive={modCommentValue.length > 0}
                      placeholder="댓글을 작성하세요."
                      defaultValue={commentData.content}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setModCommentValue(e.target.value)
                      }}
                    />
                    <c.CommentSubmit
                      $isActive={modCommentValue.length > 0}
                      onClick={() => {
                        onSubmitMod()
                      }}
                    >
                      작성
                    </c.CommentSubmit>
                  </c.CommentBox>
                </c.CommentMod>
              ) : (
                <c.CommentContent>{commentData.content}</c.CommentContent>
              )}
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
