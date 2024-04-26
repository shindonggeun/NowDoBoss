import { useQuery } from '@tanstack/react-query'
import { getSocialAuthUrl } from '@src/api/userApi'

const SocialLoginContainer = () => {
  const { data: naverUrl } = useQuery({
    queryKey: ['naverUrl'],
    queryFn: () => getSocialAuthUrl('naver'),
  })

  const { data: kakaoUrl } = useQuery({
    queryKey: ['kakaoUrl'],
    queryFn: () => getSocialAuthUrl('kakao'),
  })

  const { data: googleUrl } = useQuery({
    queryKey: ['googleUrl'],
    queryFn: () => getSocialAuthUrl('google'),
  })

  const handleRedirectUrl = (url: string) => {
    window.location.href = url
  }

  return (
    <div>
      <div>
        <div onClick={() => handleRedirectUrl(googleUrl.dataBody)}>
          구글구글구글
        </div>
        <div onClick={() => handleRedirectUrl(naverUrl.dataBody)}>
          네이버네이버
        </div>
        <div onClick={() => handleRedirectUrl(kakaoUrl.dataBody)}>
          카카오카카오
        </div>
      </div>
    </div>
  )
}

export default SocialLoginContainer
