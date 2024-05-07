import * as c from '@src/components/styles/chatting/ChattingInputStyle'
import React, { useState } from 'react'
import send_message from '@src/assets/send_message.svg'

const ChattingInput = ({ onSend }: { onSend: (content: string) => void }) => {
  const [contentValue, setContentValue] = useState<string>('')

  const handleSend = () => {
    if (contentValue.trim()) {
      onSend(contentValue)
      setContentValue('')
    }
  }

  return (
    <c.Container>
      <c.Input
        placeholder="내용을 입력해주세요."
        defaultValue={contentValue}
        maxLength={499}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setContentValue(e.target.value)
        }}
      />
      <c.SubmitButton $isActive={contentValue !== ''} onClick={handleSend}>
        <c.SubmitImg src={send_message} />
      </c.SubmitButton>
    </c.Container>
  )
}

export default ChattingInput
