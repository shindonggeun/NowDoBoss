import { useQuery } from '@tanstack/react-query'
import { getSocialAuthUrl } from '@src/api/userApi'
import * as s from '@src/containers/User/SocialLoginContainerStyle'

interface Props {
  state: string
}

const SocialLoginContainer = (props: Props) => {
  const { state } = props
  console.log(state)

  const { data: googleUrl } = useQuery({
    queryKey: ['googleUrl'],
    queryFn: () => getSocialAuthUrl('google'),
  })

  const { data: naverUrl } = useQuery({
    queryKey: ['naverUrl'],
    queryFn: () => getSocialAuthUrl('naver'),
  })

  const { data: kakaoUrl } = useQuery({
    queryKey: ['kakaoUrl'],
    queryFn: () => getSocialAuthUrl('kakao'),
  })

  const handleRedirectUrl = (url: string) => {
    window.location.href = url
  }

  return (
    <s.Container>
      {state === 'login' ? (
        <>
          <s.OrTextSmallWrapper>
            <s.Separator />
            <s.OrText>또는</s.OrText>
            <s.Separator />
          </s.OrTextSmallWrapper>
          <s.SmallButtonWrapper>
            <s.GoogleBtnSmall
              onClick={() => handleRedirectUrl(googleUrl.dataBody)}
            />
            <s.NaverBtnSmall
              onClick={() => handleRedirectUrl(naverUrl.dataBody)}
            />
            <s.KakaoBtnSmall
              onClick={() => handleRedirectUrl(kakaoUrl.dataBody)}
            />
          </s.SmallButtonWrapper>
        </>
      ) : (
        <>
          <s.TopSeparator />
          <s.ButtonWrapper>
            <s.GoogleBtn
              onClick={() => handleRedirectUrl(googleUrl.dataBody)}
            />
            <s.NaverBtn onClick={() => handleRedirectUrl(naverUrl.dataBody)} />
            <s.KakaoBtn onClick={() => handleRedirectUrl(kakaoUrl.dataBody)} />
          </s.ButtonWrapper>
          <s.OrTextWrapper>
            <s.Separator />
            <s.OrText>또는</s.OrText>
            <s.Separator />
          </s.OrTextWrapper>
        </>
      )}
    </s.Container>
  )
}

export default SocialLoginContainer
