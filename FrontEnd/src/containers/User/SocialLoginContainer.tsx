import { useMutation, useQuery } from '@tanstack/react-query'
import { getSocialAuthUrl } from '@src/api/userApi'
import * as s from '@src/containers/User/SocialLoginContainerStyle'
import firebase from 'firebase'
import { saveFcmToken } from '@src/api/fcmApi.tsx'

interface Props {
  state: string
}

const SocialLoginContainer = (props: Props) => {
  const { state } = props

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

  // FCM 토큰을 서버로 보내는 Mutation
  const { mutate: saveFcmTokenMutation } = useMutation({
    mutationFn: saveFcmToken,
  })

  // 표준 Notification API를 사용하여 알림 권한 요청
  const messaging = firebase.messaging()

  const firebaseMessage = async () => {
    try {
      const permission = await Notification.requestPermission()
      console.log(permission)
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

  const handleRedirectUrl = (url: string) => {
    window.location.href = url
    firebaseMessage()
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
