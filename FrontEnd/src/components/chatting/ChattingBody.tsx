import * as c from '@src/components/styles/chatting/ChattingBodyStyle'
import React, { useState } from 'react'
import send_message from '@src/assets/send_message.svg'

const ChattingBody = () => {
  const [contentValue, setContentValue] = useState<string>('')

  return (
    <c.Container>
      <c.Header>
        <c.ChatInfo>
          <c.ChatImg />
          <c.ChatDiv>
            <c.ChatTitle>제목</c.ChatTitle>
            <c.ChatMembers>3 members</c.ChatMembers>
          </c.ChatDiv>
        </c.ChatInfo>
        <c.More>⋯</c.More>
      </c.Header>
      <c.Input
        placeholder="내용을 입력해주세요."
        defaultValue={contentValue}
        maxLength={499}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setContentValue(e.target.value)
        }}
      />
      <c.SubmitButton
        $isActive={contentValue !== ''}
        onClick={() => {
          console.log('채팅 제출')
          setContentValue('')
        }}
      >
        <c.SubmitImg src={send_message} />
      </c.SubmitButton>
    </c.Container>
  )
}

export default ChattingBody
