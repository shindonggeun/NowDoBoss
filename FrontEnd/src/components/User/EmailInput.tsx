import React from 'react'
import * as p from '@src/components/styles/profile/PasswordInputStyle'

interface EmailInputProps {
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  // eslint-disable-next-line react/require-default-props
  required?: boolean // Optional prop, 기본값은 true로 설정
}

const EmailInput = ({
  placeholder,
  value,
  onChange,
  id,
  required = true,
}: EmailInputProps) => {
  return (
    <p.Container>
      <p.Input
        type="email"
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </p.Container>
  )
}

export default EmailInput
