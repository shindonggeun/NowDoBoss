import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { loginUser } from '@src/api/userApi'
import { saveFcmToken } from '@src/api/fcmApi'
import InfoSection from '@src/components/User/InfoSection'
import EmailInput from '@src/components/User/EmailInput'
import PasswordInput from '@src/components/profile/PasswordInput'
import AskSection from '@src/components/User/AskSection'
import SocialLoginContainer from '@src/containers/User/SocialLoginContainer'
import * as u from '@src/containers/User/UserContainerStyle'
import Swal from 'sweetalert2'
import firebase from 'firebase'

// firebase config 불러오기

const LoginContainer = () => {
  const [, setCookie] = useCookies(['accessToken'])
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('') // 에러 메시지 상태
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

  // fcm 서비스 워커 등록 로직
  const registerServiceWorker = () => {
    if (!isIOS && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js')
          .then(registration => {
            // 테스트콘솔
            console.log(registration)
          })
          .catch(err => {
            console.log('Service Worker 등록 실패:', err)
          })
      })
    }
  }

  useEffect(() => {
    registerServiceWorker()
  }, [])

  // FCM 토큰을 서버로 보내는 Mutation
  const { mutate: saveFcmTokenMutation } = useMutation({
    mutationFn: saveFcmToken,
    onSuccess: () => {
      console.log('FCM전송')
    },
    onError: error => {
      console.error('FCM 토큰 전송 에러:', error)
    },
  })

  // 표준 Notification API를 사용하여 알림 권한 요청
  const messaging = firebase.messaging()

  const firebaseMessage = async () => {
    if (!isIOS) {
      try {
        const permission = await Notification.requestPermission()

        if (permission === 'granted') {
          console.log('Notification permission granted.')

          // FCM 토큰을 가져옵니다.
          messaging
            .getToken()
            .then(token => {
              console.log('Token:', token)
              saveFcmTokenMutation(token)
            })
            .catch(err => {
              console.error('Token retrieval failed:', err)
            })
        } else {
          console.log('Unable to get permission to notify.')
        }
      } catch (error) {
        console.error('Permission request failed', error)
      }
    }
  }

  // 일반 로그인
  const { mutate: LoginUser } = useMutation({
    mutationKey: ['loginUser'],
    mutationFn: loginUser,
    onSuccess: res => {
      if (res.dataHeader.successCode === 1) {
        setErrorMessage(res.dataHeader.resultMessage)
      } else {
        // 쿠키에 accessToken 저장 (7일 동안 유지)
        const { accessToken } = res.dataBody.tokenInfo
        setCookie('accessToken', accessToken, {
          path: '/',
        })

        // 로그인 성공하면 fcm 토큰 요청 함수 실행, 안에서 토큰 저장 로직 실행
        firebaseMessage()

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

  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      email,
      password,
    }

    LoginUser(data)
    setErrorMessage('') // 에러 메시지 초기화
  }

  return (
    <u.Container>
      <u.LeftWrap>
        <InfoSection
          title="Welecome back!"
          subtitle="로그인 후 다양한 서비스를 이용하세요."
        />

        <u.Form onSubmit={handleLoginUser}>
          {errorMessage && <u.ErrorMsg>{errorMessage}</u.ErrorMsg>}
          <EmailInput
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="email"
            placeholder="이메일"
          />
          <u.InputContainer>
            <PasswordInput
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="password"
              placeholder="비밀번호"
            />
            <u.InputMsg>영문, 숫자, 특수문자 포함 8~16자</u.InputMsg>
          </u.InputContainer>
          <u.Btn type="submit">Log In</u.Btn>
        </u.Form>

        <AskSection title="아직 회원이 아니신가요?" subtitle="Sign up" />
        <SocialLoginContainer state="login" />
      </u.LeftWrap>
      <u.RightWrap>
        <u.ImgDiv>
          <img src="/gifs/buildings.gif" alt="img" />
        </u.ImgDiv>
      </u.RightWrap>
    </u.Container>
  )
}
export default LoginContainer
