import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import userStore from '@src/stores/userStore'
import { loginUser } from '@src/api/userApi'
import InfoSection from '@src/components/User/InfoSection'
import EmailInputSection from '@src/components/User/LogIn/EmailInputSection'
import PwInputSection from '@src/components/User/LogIn/PwInputSection'
import AskSection from '@src/components/User/AskSection'
import SocialLoginContainer from '@src/containers/User/SocialLoginContainer'
import * as u from '@src/containers/User/UserContainerStyle'
import Swal from 'sweetalert2'

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
        console.log(`로그인 실패 ${res.dataHeader.resultMessage}`)
      } else {
        // 쿠키에 accessToken 저장 (7일 동안 유지)
        const { accessToken } = res.dataBody.tokenInfo
        setCookie('accessToken', accessToken, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })

        // 로컬 스토리지에 memberInfo 및 로그인 여부 저장
        const { memberInfo } = res.dataBody
        localStorage.setItem('memberInfo', JSON.stringify(memberInfo))
        localStorage.setItem('isLogIn', 'true')

        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: toast => {
            const toastElement = toast
            toastElement.onmouseenter = Swal.stopTimer
            toastElement.onmouseleave = Swal.resumeTimer
          },
        })

        Toast.fire({
          icon: 'success',
          title: '성공적으로 로그인되었습니다.',
        })

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
        <u.Btn marginTop="6%" onClick={handleLoginUser}>
          Log In
        </u.Btn>
        <AskSection title="아직 회원이 아니신가요?" subtitle="Sign up" />
        <SocialLoginContainer state="login" />
      </u.LeftWrap>
      <u.RightWrap />
    </u.Container>
  )
}
export default LoginContainer
