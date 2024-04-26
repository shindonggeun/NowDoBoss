import { useNavigate, useParams } from 'react-router-dom'
import { socialLoginUser } from '@src/api/userApi'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

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

        // 로컬 스토리지에 memberInfo 저장
        const { memberInfo } = data.dataBody
        localStorage.setItem('memberInfo', JSON.stringify(memberInfo))

        console.log('로그인성공! 메인페이지로 리다이렉트합니다.')
        navigate('/')
      }
    }
  }, [data, setCookie, navigate])

  return <>소셜 로그인 중입니다.</>
}

export default SocialLoadingContainer
