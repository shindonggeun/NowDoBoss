import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import * as i from '@src/components/styles/UserStyle/InputStyle'

const NicknameInputSection = () => {
  const { setSignUpData } = userStore()
  const [nickname, setNickname] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNickname(value)
    setSignUpData('nickname', value)
  }

  return (
    <i.Container>
      <div>Nickname</div>
      <i.HalfInput
        type="text"
        placeholder="Your nickname"
        value={nickname}
        onChange={handleInputChange}
      />
    </i.Container>
  )
}

export default NicknameInputSection
