import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import * as i from '@src/components/styles/UserStyle/InputStyle'

const NameInputSection = () => {
  const { setSignUpData } = userStore()
  const [name, setName] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName(value)
    setSignUpData('name', value)
  }

  return (
    <i.Container>
      <div>Name</div>
      <i.HalfInput
        type="text"
        placeholder="Your name"
        value={name}
        onChange={handleInputChange}
      />
    </i.Container>
  )
}

export default NameInputSection
