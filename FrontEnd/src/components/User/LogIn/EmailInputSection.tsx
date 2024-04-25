import userStore from '@src/stores/userStore'
import * as i from '@src/components/styles/UserStyle/InputStyle'
import { ChangeEvent, useState } from 'react'

const EmailInputSection = () => {
  const { setLoginData } = userStore()
  const [email, setEmail] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
    setLoginData('email', value)
  }

  return (
    <i.LoginContainer>
      <i.InputTitle>Email</i.InputTitle>
      <i.EmailFlex1Input
        type="email"
        placeholder="example@example.com"
        value={email}
        onChange={handleInputChange}
      />
    </i.LoginContainer>
  )
}

export default EmailInputSection
