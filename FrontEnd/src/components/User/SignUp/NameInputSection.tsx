import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import * as i from '@src/components/styles/UserStyle/InputStyle'

const NameInputSection = () => {
  const { setSignUpData, signUpError } = userStore()
  const [name, setName] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName(value)
    setSignUpData('name', value)
  }

  return (
    <i.Container>
      <i.InputTitle>Name</i.InputTitle>
      <i.HalfInput
        type="text"
        placeholder="Your name"
        value={name}
        onChange={handleInputChange}
      />
      {signUpError.nameError && <i.ErrMsg>{signUpError.nameError}</i.ErrMsg>}
    </i.Container>
  )
}

export default NameInputSection
