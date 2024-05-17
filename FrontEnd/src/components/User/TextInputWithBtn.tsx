import React from 'react'
import * as i from '@src/components/styles/UserStyle/InputStyle'

interface TextInputProps {
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  // eslint-disable-next-line react/require-default-props
  required?: boolean // Optional prop, 기본값은 true로 설정
  handleVerifyEmailCode: () => void
  codeText: string
}

const TextInputWithBtn = ({
  placeholder,
  value,
  onChange,
  id,
  required = true,
  handleVerifyEmailCode,
  codeText,
}: TextInputProps) => {
  const handleClick = () => {
    if (codeText !== '인증 완료') {
      handleVerifyEmailCode() // 인증 코드 확인 함수
    }
  }

  return (
    <i.Container>
      <i.Input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
      <i.BtnIconWrap
        onClick={handleClick}
        style={{ pointerEvents: codeText === '인증 완료' ? 'none' : 'auto' }}
      >
        <i.CheckBtn
          style={{
            backgroundColor: codeText === '인증 완료' ? '#ccc' : '#007bff',
            cursor: codeText === '인증 완료' ? 'default' : 'pointer',
          }}
        >
          {codeText}
        </i.CheckBtn>
      </i.BtnIconWrap>
    </i.Container>
  )
}

export default TextInputWithBtn
