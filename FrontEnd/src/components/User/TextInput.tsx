import React from 'react'
import * as i from '@src/components/styles/UserStyle/InputStyle'

interface TextInputProps {
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  // eslint-disable-next-line react/require-default-props
  required?: boolean // Optional prop, 기본값은 true로 설정
}

const TextInput = ({
  placeholder,
  value,
  onChange,
  id,
  required = true,
}: TextInputProps) => {
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
    </i.Container>
  )
}

export default TextInput
