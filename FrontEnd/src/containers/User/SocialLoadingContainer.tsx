import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { socialLoginUser } from '@src/api/userApi'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'
import MainContainer from '@src/containers/main/MainContainer'
import Swal from 'sweetalert2'

const SocialLoadingContainer = () => {
  const [, setCookie] = useCookies(['accessToken'])
  const navigate = useNavigate()
  const { provider } = useParams()
  const code = new URL(document.location.toString()).searchParams.get('code')

  const { data } = useQuery({
    queryKey: ['SocialLoginUser'],
    queryFn: () => socialLoginUser(provider!, code!),
  })

  useEffect(() => {
    if (data) {
      if (data.dataHeader.successCode === 1) {
        console.log('로그인실패 : ', data.dataHeader.resultMessage)
      } else {
        // 쿠키에 accessToken 저장 (7일 동안 유지)
        const { accessToken } = data.dataBody.tokenInfo
        setCookie('accessToken', accessToken, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })

        // 로컬 스토리지에 memberInfo 및 로그인 여부 저장
        const { memberInfo } = data.dataBody
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
    }
  }, [data, setCookie, navigate])

  return <MainContainer />
}

export default SocialLoadingContainer
