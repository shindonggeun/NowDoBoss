import * as c from '@src/components/styles/chatting/ChattingInputStyle'
import React, { useState } from 'react'
import send_message from '@src/assets/send_message.svg'

const ChattingInput = ({ onSend }: { onSend: (content: string) => void }) => {
  const [contentValue, setContentValue] = useState<string>('')

  // 내용 제출 함수
  const handleSend = () => {
    if (contentValue.trim()) {
      onSend(contentValue)
      setContentValue('')
    }
  }

  // textarea에서 enter 누르면 전송되는 로직
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // 기본 동작 방지
      handleSend() // 제출 로직 실행
    }
  }

  return (
    <c.Container>
      <c.Textarea
        as="textarea"
        placeholder="내용을 입력해주세요."
        value={contentValue}
        maxLength={499}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setContentValue(e.target.value)
        }}
        onKeyDown={handleKeyDown}
        rows={5} // 높이를 설정해서 줄바꿈 가능하도록 설정
      />
      <c.SubmitButton $isActive={contentValue !== ''} onClick={handleSend}>
        <c.SubmitImg src={send_message} />
      </c.SubmitButton>
    </c.Container>
  )
}

export default ChattingInput
