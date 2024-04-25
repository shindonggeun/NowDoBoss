import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import * as i from '@src/components/styles/UserStyle/InputStyle'

const PwInputSection = () => {
  const { setLoginData } = userStore()
  const [pw, setPw] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPw(value)
    setLoginData('password', value)
  }

  return (
    <i.Container>
      <div>Password</div>
      <i.HalfInput
        type="password"
        placeholder="Your password"
        value={pw}
        onChange={handleInputChange}
      />
    </i.Container>
  )
}

export default PwInputSection
