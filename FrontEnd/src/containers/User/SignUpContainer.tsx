import { useMutation } from '@tanstack/react-query'
import userStore from '@src/stores/userStore'
import {
  registerUser,
  sendEmailVerificationCode,
  verifyEmailVerificationCode,
} from '@src/api/userApi'
import InfoSection from '@src/components/User/InfoSection'
import NameInputSection from '@src/components/User/SignUp/NameInputSection'
import NicknameInputSection from '@src/components/User/SignUp/NicknameInputSection'
import EmailInputSection from '@src/components/User/SignUp/EmailInputSection'
import PwInputSection from '@src/components/User/SignUp/PwInputSection'
import RepeatPwInputSection from '@src/components/User/SignUp/RepeatPwInputSection'
import AskSection from '@src/components/User/AskSection'
import SocialBtnSection from '@src/components/User/SocialBtnSection'
import * as u from '@src/containers/User/UserContainerStyle'

const SignUpContainer = () => {
  const { signUpData, emailCode } = userStore()

  // 이메일 인증코드 발송
  const { mutate: SendEmailVerificationCode } = useMutation({
    mutationKey: ['sendEmailVerificationCode'],
    mutationFn: sendEmailVerificationCode,
  })

  const handleSendEmailCode = () => {
    SendEmailVerificationCode(signUpData.email)
  }

  // 이메일 인증코드 검증
  const { mutate: VerifyEmailVerificationCode } = useMutation({
    mutationKey: ['verifyEmailVerificationCode'],
    mutationFn: verifyEmailVerificationCode,
  })

  const handleVerifyEmailCode = () => {
    const params = {
      memberEmail: signUpData.email,
      emailCode,
    }
    VerifyEmailVerificationCode(params)
  }

  // 회원가입
  const { mutate: RegisterUser } = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: registerUser,
  })

  const handleRegisterUser = () => {
    RegisterUser(signUpData)
  }

  return (
    <u.Container>
      <u.LeftWrap>
        <InfoSection
          title="Welecome!"
          subtitle="환영합니다! 회원가입 후 다양한 기능을 이용하세요."
        />
        <u.InputWrap>
          <NameInputSection />
          <NicknameInputSection />
        </u.InputWrap>
        <EmailInputSection
          handleSendEmailCode={handleSendEmailCode}
          handleVerifyEmailCode={handleVerifyEmailCode}
        />
        <u.InputWrap>
          <PwInputSection />
          <RepeatPwInputSection />
        </u.InputWrap>
        <u.Btn marginTop="7%" onClick={handleRegisterUser}>
          Sign Up
        </u.Btn>
        <AskSection title="계정이 이미 있으신가요?" subtitle="Log In" />
        <SocialBtnSection />
      </u.LeftWrap>
      <u.RightWrap />
    </u.Container>
  )
}

export default SignUpContainer
