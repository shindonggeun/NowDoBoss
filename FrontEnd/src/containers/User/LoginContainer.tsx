import { useMutation } from '@tanstack/react-query'
import userStore from '@src/stores/userStore'
import { loginUser } from '@src/api/userApi'
import InfoSection from '@src/components/User/InfoSection'
import EmailInputSection from '@src/components/User/LogIn/EmailInputSection'
import PwInputSection from '@src/components/User/LogIn/PwInputSection'
import AskSection from '@src/components/User/AskSection'
import SocialBtnSection from '@src/components/User/SocialBtnSection'
import * as u from '@src/containers/User/UserContainerStyle'

const LoginContainer = () => {
  const { loginData } = userStore()

  // 일반 로그인
  const { mutate: LoginUser } = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: loginUser,
  })

  const handleLoginUser = () => {
    LoginUser(loginData)
  }

  return (
    <u.Container>
      <u.LeftWrap>
        <InfoSection
          title="Welecome back!"
          subtitle="로그인 후 다양한 서비스를 이용하세요."
        />
        <EmailInputSection />
        <PwInputSection />
        <u.ForgetPwLink>비밀번호가 생각나지 않으신가요?</u.ForgetPwLink>
        <u.Btn marginTop="1%" onClick={handleLoginUser}>
          Log In
        </u.Btn>
        <AskSection title="아직 회원이 아니신가요?" subtitle="Sign up" />
        <SocialBtnSection />
      </u.LeftWrap>
      <u.RightWrap />
    </u.Container>
  )
}
export default LoginContainer
