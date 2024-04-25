import * as c from '@src/components/styles/community/CommentListStyle'
import React, { useState } from 'react'
import TimeCounting, { TimeCountingOption } from 'time-counting'

const CommentList = () => {
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

  return (
    <c.Container>
      <c.CommentTitle>댓글 0</c.CommentTitle>
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
            // console.log('제출완료')
            setComment('')
          }}
        >
          작성
        </c.CommentSubmit>
      </c.CommentBox>
      <c.CommentCard>
        <c.CommentContainer>
          <c.CommentProfile />
          <c.CommentUser>
            <c.CommentName>최성호</c.CommentName>
            {/* <m.CommentTime>2024-03-12 16:40</m.CommentTime> */}
            <c.CommentTime>
              {TimeCounting('2024-04-24 4:00:00', TimeOption)}
            </c.CommentTime>
          </c.CommentUser>
        </c.CommentContainer>
        <c.CommentContent>좋은 글 잘 읽었습니다.</c.CommentContent>
      </c.CommentCard>
    </c.Container>
  )
}

export default CommentList
