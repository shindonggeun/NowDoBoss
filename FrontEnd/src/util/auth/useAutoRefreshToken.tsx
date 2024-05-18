import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'
import { useMutation } from '@tanstack/react-query'
import { reissueAccessToken } from '@src/api/userApi'

interface DecodedToken {
  jti: string
  email: string
  name: string
  nickname: string
  profileImage: string
  role: string
  iat: number
  exp: number
}

const useAutoRefreshToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'])
  const navigate = useNavigate()

  const { mutate: ReissueAccessToken } = useMutation({
    mutationKey: ['ReissueAccessToken'],
    mutationFn: reissueAccessToken,
    onSuccess: res => {
      // 성공
      if (res.dataHeader.successCode === 0) {
        // 쿠키에 있는 accessToken 업데이트
        setCookie('accessToken', res.dataBody, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        })
      }
      // 실패 - Redis에 저장된 RefreshToken 만료
      else {
        // 쿠키에서 accessToken 삭제
        removeCookie('accessToken', { path: '/' })

        // 로컬 스토리지에서 memberInfo 및 로그인 여부 삭제
        localStorage.removeItem('memberInfo')
        localStorage.removeItem('isLogIn')

        // 로그인 페이지로 리다이렉트
        navigate('/login')
      }
    },
  })

  useEffect(() => {
    const { accessToken } = cookies

    if (!accessToken) return

    const decodedToken = jwtDecode(accessToken) as DecodedToken
    const currentTime = Date.now() / 1000

    // accessToken 만료 시간이 현재 시간보다 작다면 재발급 요청
    if (decodedToken.exp < currentTime) {
      ReissueAccessToken(decodedToken.email)
    }
  }, [cookies, setCookie, ReissueAccessToken])
}

export default useAutoRefreshToken
