import { useMutation } from '@tanstack/react-query'
import { getSocialAuthUrl } from '@src/api/userApi'
import * as s from '@src/containers/User/SocialLoginContainerStyle'
import firebase from 'firebase'
import { saveFcmToken } from '@src/api/fcmApi'

interface Props {
  state: string
}

const SocialLoginContainer = (props: Props) => {
  const { state } = props
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

  const { mutate: GetSocialAuthUrl } = useMutation({
    mutationKey: ['GetSocialAuthUrl'],
    mutationFn: getSocialAuthUrl,
    onSuccess: res => {
      window.location.href = res.dataBody
    },
  })

  // FCM 토큰을 서버로 보내는 Mutation
  const { mutate: saveFcmTokenMutation } = useMutation({
    mutationFn: saveFcmToken,
  })

  // 표준 Notification API를 사용하여 알림 권한 요청
  const messaging = firebase.messaging()

  const firebaseMessage = async () => {
    if (!isIOS) {
      try {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          // FCM 토큰을 가져옵니다.
          messaging.getToken().then(token => {
            saveFcmTokenMutation(token)
          })
        }
      } catch (error) {
        console.error('Permission request failed', error)
      }
    }
  }

  const handleRedirectUrl = (oAuthDomain: string) => {
    GetSocialAuthUrl(oAuthDomain)
    setTimeout(() => firebaseMessage(), 1000)
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
