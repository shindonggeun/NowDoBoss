import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import userStore from '@src/stores/userStore'
import { loginUser } from '@src/api/userApi'
import InfoSection from '@src/components/User/InfoSection'
import EmailInputSection from '@src/components/User/LogIn/EmailInputSection'
import PwInputSection from '@src/components/User/LogIn/PwInputSection'
import AskSection from '@src/components/User/AskSection'
import SocialBtnSection from '@src/components/User/SocialBtnSection'
import LogoutContainer from '@src/containers/User/LogoutContainer'
import * as u from '@src/containers/User/UserContainerStyle'

const LoginContainer = () => {
  const { loginData } = userStore()
  const [, setCookie] = useCookies(['accessToken'])
  const navigate = useNavigate()

  // 일반 로그인
  const { mutate: LoginUser } = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: loginUser,
    onSuccess: res => {
      if (res.dataHeader.successCode === 1) {
        console.log('로그인실패 : ', res.dataHeader.resultMessage)
      } else {
        // 쿠키에 accessToken 저장 (7일 동안 유지)
        const { accessToken } = res.dataBody.tokenInfo
        setCookie('accessToken', accessToken, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })

        // 로컬 스토리지에 memberInfo 저장
        const { memberInfo } = res.dataBody
        localStorage.setItem('memberInfo', JSON.stringify(memberInfo))

        console.log('로그인성공! 메인페이지로 리다이렉트합니다.')

        navigate('/')
      }
    },
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
        <LogoutContainer />
      </u.LeftWrap>
      <u.RightWrap />
    </u.Container>
  )
}
export default LoginContainer
