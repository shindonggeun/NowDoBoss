import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import * as i from '@src/components/styles/UserStyle/InputStyle'

const PwInputSection = () => {
  const { setSignUpData, signUpError } = userStore()
  const [pw, setPw] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPw(value)
    setSignUpData('password', value)
  }

  return (
    <i.Container>
      <i.InputTitle>Password</i.InputTitle>
      <i.HalfInput
        type="password"
        placeholder="Your password"
        value={pw}
        onChange={handleInputChange}
      />
      {signUpError.passwordError && (
        <i.ErrMsg>{signUpError.passwordError}</i.ErrMsg>
      )}
    </i.Container>
  )
}

export default PwInputSection
