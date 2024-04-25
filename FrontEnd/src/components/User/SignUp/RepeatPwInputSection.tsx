import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import * as i from '@src/components/styles/UserStyle/InputStyle'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

const RepeatPwInputSection = () => {
  const { signUpData } = userStore()
  const [repeat, setRepeat] = useState<string>('')
  const [isCollect, setIsCollect] = useState<boolean>(false)

  const handleRepeatChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setRepeat(value)

    if (value === '') {
      setIsCollect(false)
    } else {
      const isMatch = signUpData.password === value
      setIsCollect(isMatch)
    }
  }

  let borderColor = '#ccc'
  if (repeat !== '') {
    borderColor = isCollect ? '#28a745' : '#dc3545'
  }

  return (
    <i.Container>
      <i.CheckIconWrap>
        <i.InputTitle>Repeat password</i.InputTitle>
        {isCollect && <CheckRoundedIcon style={{ color: '#28a745' }} />}
      </i.CheckIconWrap>
      <i.HalfInput
        type="password"
        placeholder="Repeat"
        value={repeat}
        onChange={handleRepeatChange}
        style={{ borderColor }}
      />
    </i.Container>
  )
}

export default RepeatPwInputSection
