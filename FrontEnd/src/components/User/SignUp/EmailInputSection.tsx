import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import { EmailInputSectionPropsType } from '@src/types/UserType'
import * as i from '@src/components/styles/UserStyle/InputStyle'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

const EmailInputSection = (props: EmailInputSectionPropsType) => {
  const { handleSendEmailCode, codeSuccessCode } = props
  const { setSignUpData, emailError, setEmailError } = userStore()
  const [email, setEmail] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmailError('emailErr', '')
    setEmail(value)
    setSignUpData('email', value)
  }

  return (
    <div>
      <i.CheckIconWrap>
        <i.InputTitle>Email</i.InputTitle>
        {codeSuccessCode === 0 && (
          <CheckRoundedIcon style={{ color: '#28a745' }} />
        )}
      </i.CheckIconWrap>
      <i.EmailFirstRow>
        <i.EmailFlex2Input
          type="email"
          placeholder="example@example.com"
          value={email}
          onChange={handleInputChange}
          style={{ borderColor: codeSuccessCode === 0 ? '#28a745' : '#ccc' }}
        />
        <i.Btn onClick={handleSendEmailCode}>이메일 인증</i.Btn>
      </i.EmailFirstRow>
      {emailError.emailErr && <i.ErrMsg>{emailError.emailErr}</i.ErrMsg>}
    </div>
  )
}

export default EmailInputSection
