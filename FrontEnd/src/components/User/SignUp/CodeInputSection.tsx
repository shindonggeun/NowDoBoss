import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import { CodeInputSectionPropsType } from '@src/types/UserType'
import * as i from '@src/components/styles/UserStyle/InputStyle'

const CodeInputSection = (props: CodeInputSectionPropsType) => {
  const { handleVerifyEmailCode } = props
  const { setEmailCode, emailError, setEmailError } = userStore()
  const [code, setCode] = useState<string>('')

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmailError('codeErr', '')
    setCode(value)
    setEmailCode(value)
  }

  return (
    <i.CodeContainer>
      <i.EmailSecondRow>
        <i.HalfInput
          type="text"
          placeholder="Code"
          value={code}
          onChange={handleCodeChange}
        />
        <i.Btn onClick={handleVerifyEmailCode}>
          <div>인증번호확인</div>
          <div />
        </i.Btn>
      </i.EmailSecondRow>
      {emailError.codeErr && <i.ErrMsg>{emailError.codeErr}</i.ErrMsg>}
    </i.CodeContainer>
  )
}

export default CodeInputSection
