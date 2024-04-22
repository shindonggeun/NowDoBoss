import React, { useState } from 'react'
import { SignUpDataType } from '@src/types/UserType'
import InfoSection from '@src/components/User/InfoSection'
import AskSection from '@src/components/User/AskSection'
import * as u from '@src/containers/User/UserContainerStyle'

const SignUpContainer = () => {
  const [emailCode, setEmailCode] = useState<string>('')
  const [repeatPw, setRepeatPw] = useState<string>('')
  const [formData, setFormData] = useState<SignUpDataType>({
    name: '',
    nickname: '',
    email: '',
    password: '',
  })

  const handleInputChange = (
    fieldName: keyof SignUpDataType,
    value: string,
  ) => {
    setFormData(prevState => ({
      ...prevState,
      [fieldName]: value,
    }))
  }
  const handleEmailCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCode(e.target.value)
  }
  const handleRepeatPwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPw(e.target.value)
  }

  return (
    <u.Container>
      <u.LeftWrap>
        <InfoSection
          title="Welecome!"
          subtitle="환영합니다! 회원가입 후 다양한 기능을 이용하세요."
        />
        <u.RowSection>
          <u.InputDiv>
            <u.Label htmlFor="Name">Name</u.Label>
            <u.Input
              id="Name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
            />
          </u.InputDiv>
          <u.InputDiv>
            <u.Label htmlFor="Nickname">Nickname</u.Label>
            <u.Input
              id="Nickname"
              type="text"
              placeholder="Your nickname"
              value={formData.nickname}
              onChange={e => handleInputChange('nickname', e.target.value)}
            />
          </u.InputDiv>
        </u.RowSection>
        <u.EmailSection>
          <u.Label htmlFor="Email">Email</u.Label>
          <u.InputButtonDiv>
            <u.EmailInput
              id="Email"
              type="email"
              placeholder="example@example.com"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
            />
            <u.EmailSendBtn>인증번호 전송</u.EmailSendBtn>
          </u.InputButtonDiv>
          <u.EmailCodeSection>
            <u.EmailCodeInput
              type="text"
              placeholder="000000"
              value={emailCode}
              onChange={handleEmailCodeChange}
            />
            <u.EmailCheckBtn>
              <span>인증번호 확인</span>
              <span>3:00</span>
            </u.EmailCheckBtn>
          </u.EmailCodeSection>
        </u.EmailSection>
        <u.RowSection>
          <u.InputDiv>
            <u.Label htmlFor="Password">Password</u.Label>
            <u.Input
              id="Password"
              type="password"
              placeholder="Your password"
              value={formData.password}
              onChange={e => handleInputChange('password', e.target.value)}
            />
          </u.InputDiv>
          <u.InputDiv>
            <u.Label htmlFor="Repeat password">Repeat password</u.Label>
            <u.Input
              id="Repeat password"
              type="password"
              placeholder="Repeat"
              value={repeatPw}
              onChange={handleRepeatPwChange}
            />
          </u.InputDiv>
        </u.RowSection>
        <button
          type="submit"
          style={{ width: '100%', marginTop: '6%', fontSize: '1rem' }}
        >
          Sign Up
        </button>
        <AskSection title="계정이 이미 있으신가요?" subtitle="Log In" />
      </u.LeftWrap>
      <u.RightWrap />
    </u.Container>
  )
}

export default SignUpContainer
