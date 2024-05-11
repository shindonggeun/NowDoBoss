import React, { useState } from 'react'
import * as p from '@src/components/styles/profile/PasswordInputStyle'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'

interface PasswordInputProps {
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  required?: boolean // Optional prop, 기본값은 true로 설정할 수 있습니다.
}

const PasswordInput = ({
  placeholder,
  value,
  onChange,
  id,
  required = true,
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <p.Container>
      <p.Input
        type={isPasswordVisible ? 'text' : 'password'}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
      <p.Icon onClick={togglePasswordVisibility}>
        {isPasswordVisible ? (
          <VisibilityOffOutlinedIcon fontSize="small" />
        ) : (
          <VisibilityOutlinedIcon fontSize="small" />
        )}
      </p.Icon>
    </p.Container>
  )
}

export default PasswordInput
