import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import { EmailInputSectionPropsType } from '@src/types/UserType'
import * as i from '@src/components/styles/UserStyle/InputStyle'

const EmailInputSection = (props: EmailInputSectionPropsType) => {
  const { setSignUpData, setEmailCode } = userStore()
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const { handleSendEmailCode, handleVerifyEmailCode } = props

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
    setSignUpData('email', value)
  }

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setCode(value)
    setEmailCode(value)
  }

  return (
    <i.EmailContainer>
      <div>Email</div>
      <i.EmailFirstRow>
        <i.EmailFlex2Input
          type="email"
          placeholder="example@example.com"
          value={email}
          onChange={handleInputChange}
        />
        <i.Btn onClick={handleSendEmailCode}>인증번호 전송</i.Btn>
      </i.EmailFirstRow>
      <i.EmailSecondRow>
        <i.HalfInput
          type="text"
          placeholder="000000"
          value={code}
          onChange={handleCodeChange}
        />
        <i.Btn onClick={handleVerifyEmailCode}>인증번호 확인 3:00</i.Btn>
      </i.EmailSecondRow>
    </i.EmailContainer>
  )
}

export default EmailInputSection
