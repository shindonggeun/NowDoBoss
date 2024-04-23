import * as m from '@src/components/styles/community/CommunityDetailStyle'
import React, { useState } from 'react'

const MainContent = () => {
  const [comment, setComment] = useState<string>('')

  return (
    <m.Container>
      <m.BackButton>
        <m.BackIcon src="/src/assets/arrow_left.svg" />
        <m.BackText>목록으로 돌아가기</m.BackText>
      </m.BackButton>
      <m.Title>강동구에 창업하신 사장님들께 질문드립니다..</m.Title>
      <m.Category>창업고민</m.Category>
      <m.Time>2024년 4월 21일 16시 20분</m.Time>
      <m.ContentImg />
      <m.Content>
        사장님들 안녕하신가요, 저는 강동구에 창업하기 위해 준비중인 예비
        창업자입니다. 요즘 고민이 있는데요, 자금이 넉넉치 못해 월세가 저렴하면서
        폐업률이 낮은 상권이 어디가 있을까요..? 그리고 롱런하는 꿀팁
        부탁드립니다...!
      </m.Content>
      <m.CommentTitle>댓글 0</m.CommentTitle>
      <m.CommentBox>
        <m.CommentInput
          placeholder="댓글을 작성하세요."
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setComment(e.target.value)
          }}
        />
        <m.CommentSubmit>작성</m.CommentSubmit>
      </m.CommentBox>
      <m.CommentCard>
        <m.CommentContainer>
          <m.CommentProfile />
          <m.CommentUser>
            <m.CommentName>최성호</m.CommentName>
            <m.CommentTime>2024-03-12 16:40</m.CommentTime>
          </m.CommentUser>
        </m.CommentContainer>
        <m.CommentContent>좋은 글 잘 읽었습니다.</m.CommentContent>
      </m.CommentCard>
    </m.Container>
  )
}

export default MainContent
