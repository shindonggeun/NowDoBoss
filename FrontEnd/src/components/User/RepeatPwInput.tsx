import React, { ChangeEvent, useState } from 'react'
import * as i from '@src/components/styles/UserStyle/InputStyle'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import * as p from '@src/components/styles/profile/PasswordInputStyle'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'

interface RepeatPwInputProps {
  password: string
  isCollect: boolean
  setIsCollect: React.Dispatch<React.SetStateAction<boolean>>
}

const RepeatPwInput = ({
  password,
  isCollect,
  setIsCollect,
}: RepeatPwInputProps) => {
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleRepeatChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPasswordRepeat(value)

    if (value === '') {
      setIsCollect(false)
    } else {
      const isMatch = value === password
      setIsCollect(isMatch)
    }
  }

  let borderColor = '#ccc'
  if (passwordRepeat !== '') {
    borderColor = isCollect ? '#28a745' : '#dc3545'
  }

  return (
    <i.Container>
      <i.Input
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder="비밀번호 확인"
        value={passwordRepeat}
        onChange={handleRepeatChange}
        style={{ borderColor }}
      />
      {isCollect ? (
        <i.CheckIconWrap>
          <CheckRoundedIcon fontSize="small" style={{ color: '#28a745' }} />
        </i.CheckIconWrap>
      ) : (
        <p.Icon onClick={togglePasswordVisibility}>
          {isPasswordVisible ? (
            <VisibilityOffOutlinedIcon fontSize="small" />
          ) : (
            <VisibilityOutlinedIcon fontSize="small" />
          )}
        </p.Icon>
      )}
    </i.Container>
  )
}

export default RepeatPwInput
