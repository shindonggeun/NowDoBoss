import React from 'react'
import * as i from '@src/components/styles/UserStyle/InputStyle'

interface EmailInputProps {
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  // eslint-disable-next-line react/require-default-props
  required?: boolean // Optional prop, 기본값은 true로 설정
  handleSendEmailCode: () => void
  btnText: string
}

const EmailInputWithBtn = ({
  placeholder,
  value,
  onChange,
  id,
  required = true,
  handleSendEmailCode,
  btnText,
}: EmailInputProps) => {
  const handleClick = () => {
    if (btnText !== '전송 완료') {
      handleSendEmailCode() // 인증 코드 발송 함수
    }
  }

  return (
    <i.Container>
      <i.Input
        type="email"
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
      <i.BtnIconWrap
        onClick={handleClick}
        style={{ pointerEvents: btnText === '전송 완료' ? 'none' : 'auto' }}
      >
        <i.CheckBtn
          style={{
            backgroundColor: btnText === '전송 완료' ? '#ccc' : '#007bff',
            cursor: btnText === '전송 완료' ? 'default' : 'pointer',
          }}
        >
          {btnText}
        </i.CheckBtn>
      </i.BtnIconWrap>
    </i.Container>
  )
}

export default EmailInputWithBtn
