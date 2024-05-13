import { useMutation } from '@tanstack/react-query'
import { getSocialAuthUrl } from '@src/api/userApi'
import * as s from '@src/containers/User/SocialLoginContainerStyle'

interface Props {
  state: string
}

const SocialLoginContainer = (props: Props) => {
  const { state } = props

  const { mutate: GetSocialAuthUrl } = useMutation({
    mutationKey: ['GetSocialAuthUrl'],
    mutationFn: getSocialAuthUrl,
    onSuccess: res => {
      window.location.href = res.dataBody
    },
  })

  const handleRedirectUrl = (oAuthDomain: string) => {
    GetSocialAuthUrl(oAuthDomain)
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
            <s.GoogleBtnSmall onClick={() => handleRedirectUrl('google')} />
            <s.NaverBtnSmall onClick={() => handleRedirectUrl('naver')} />
            <s.KakaoBtnSmall onClick={() => handleRedirectUrl('kakao')} />
          </s.SmallButtonWrapper>
        </>
      ) : (
        <>
          <s.TopSeparator />
          <s.ButtonWrapper>
            <s.GoogleBtn onClick={() => handleRedirectUrl('google')} />
            <s.NaverBtn onClick={() => handleRedirectUrl('naver')} />
            <s.KakaoBtn onClick={() => handleRedirectUrl('kakao')} />
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
