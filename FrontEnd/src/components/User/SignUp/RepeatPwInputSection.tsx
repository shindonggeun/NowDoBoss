import { ChangeEvent, useState } from 'react'
import * as i from '@src/components/styles/UserStyle/InputStyle'

const RepeatPwInputSection = () => {
  const [repeat, setRepeat] = useState<string>('')

  const handleRepeatChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setRepeat(value)
  }

  return (
    <i.Container>
      <div>Repeat password</div>
      <i.HalfInput
        type="password"
        placeholder="Repeat"
        value={repeat}
        onChange={handleRepeatChange}
      />
    </i.Container>
  )
}

export default RepeatPwInputSection
