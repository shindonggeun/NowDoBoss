import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import { EmailInputSectionPropsType } from '@src/types/UserType'
import * as i from '@src/components/styles/UserStyle/InputStyle'

const EmailInputSection = (props: EmailInputSectionPropsType) => {
  const { handleSendEmailCode } = props
  const { setSignUpData, signUpError, setSignUpError } = userStore()
  const [email, setEmail] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSignUpError('emailErr', '')
    setEmail(value)
    setSignUpData('email', value)
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
      <div>{signUpError.emailErr}</div>
    </i.EmailContainer>
  )
}

export default EmailInputSection
