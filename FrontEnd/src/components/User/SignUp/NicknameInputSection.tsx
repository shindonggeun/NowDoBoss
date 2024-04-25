import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import * as i from '@src/components/styles/UserStyle/InputStyle'

const NicknameInputSection = () => {
  const { setSignUpData, signUpError } = userStore()
  const [nickname, setNickname] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNickname(value)
    setSignUpData('nickname', value)
  }

  return (
    <i.Container>
      <i.InputTitle>Nickname</i.InputTitle>
      <i.HalfInput
        type="text"
        placeholder="Your nickname"
        value={nickname}
        onChange={handleInputChange}
      />
      {signUpError.nicknameError && (
        <i.ErrMsg>{signUpError.nicknameError}</i.ErrMsg>
      )}
    </i.Container>
  )
}

export default NicknameInputSection
