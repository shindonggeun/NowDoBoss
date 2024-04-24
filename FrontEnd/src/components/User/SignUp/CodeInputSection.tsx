import { ChangeEvent, useState } from 'react'
import userStore from '@src/stores/userStore'
import { CodeInputSectionPropsType } from '@src/types/UserType'
import * as i from '@src/components/styles/UserStyle/InputStyle'

const CodeInputSection = (props: CodeInputSectionPropsType) => {
  const { handleVerifyEmailCode } = props
  const { setEmailCode, signUpError, setSignUpError } = userStore()
  const [code, setCode] = useState<string>('')

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSignUpError('codeErr', '')
    setCode(value)
    setEmailCode(value)
  }

  return (
    <i.EmailContainer>
      <i.EmailSecondRow>
        <i.HalfInput
          type="text"
          placeholder="000000"
          value={code}
          onChange={handleCodeChange}
        />
        <i.Btn onClick={handleVerifyEmailCode}>인증번호 확인 3:00</i.Btn>
      </i.EmailSecondRow>
      <div>{signUpError.codeErr}</div>
    </i.EmailContainer>
  )
}

export default CodeInputSection
