import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
  registerUser,
  sendEmailVerificationCode,
  verifyEmailVerificationCode,
} from '@src/api/userApi'
import InfoSection from '@src/components/User/InfoSection'
import TextInput from '@src/components/User/TextInput'
import EmailInputWithBtn from '@src/components/User/EmailInputWithBtn'
import TextInputWithBtn from '@src/components/User/TextInputWithBtn'
import PasswordInput from '@src/components/profile/PasswordInput'
import RepeatPwInput from '@src/components/User/RepeatPwInput'
import AskSection from '@src/components/User/AskSection'
import * as u from '@src/containers/User/UserContainerStyle'
import { confetti } from '@src/App'
import Swal from 'sweetalert2'

const SignUpGeneralContainer = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [emailCode, setEmailCode] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage] = useState('')
  const [btnText, setBtnText] = useState('이메일 인증')
  const [codeText, setCodeText] = useState('확인')
  const [isSend, setIsSend] = useState<boolean>(false) // 인증 코드 전송 여부
  const [isMatch, setIsMatch] = useState<boolean>(false) // 인증 코드 검증 여부
  const [isCollect, setIsCollect] = useState<boolean>(false) // 비밀번호 확인 성공 여부
  const [errorMessage, setErrorMessage] = useState('') // 에러 메시지 상태

  // confetti 함수
  const handleConfetti = () => {
    confetti.addConfetti({
      confettiColors: [
        '#ff00ff', // 핑크
        '#ffff00', // 노랑
        '#00ff00', // 녹색
        '#00ffff', // 청록
        '#0000ff', // 파랑
        '#ff0000', // 빨강
        '#800080', // 보라
        '#ffa500', // 주황
        '#008000', // 초록
      ],
      confettiRadius: 5,
      confettiNumber: 800,
    })
  }

  // 이메일 인증코드 발송
  const { mutate: SendEmailVerificationCode } = useMutation({
    mutationKey: ['sendEmailVerificationCode'],
    mutationFn: sendEmailVerificationCode,
    onSuccess: res => {
      if (res.dataHeader.successCode === 1) {
        setErrorMessage(res.dataHeader.resultMessage)
      } else {
        setBtnText('전송 완료')
        setIsSend(true)
        setErrorMessage('')
      }
    },
    onError: () => {
      setErrorMessage('올바른 이메일 형식을 입력하세요.')
    },
  })

  const handleSendEmailCode = () => {
    SendEmailVerificationCode(email)
  }

  // 이메일 인증코드 검증
  const { mutate: VerifyEmailVerificationCode } = useMutation({
    mutationKey: ['verifyEmailVerificationCode'],
    mutationFn: verifyEmailVerificationCode,
    onSuccess: res => {
      if (res.dataHeader.successCode === 1) {
        setErrorMessage(res.dataHeader.resultMessage)
      } else {
        setCodeText('인증 완료')
        setIsMatch(true)
        setErrorMessage('')
      }
    },
  })

  const handleVerifyEmailCode = () => {
    const paths = {
      memberEmail: email,
      emailCode,
    }
    VerifyEmailVerificationCode(paths)
  }

  // 회원가입
  const { mutate: RegisterUser } = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: registerUser,
    onSuccess: res => {
      // 성공했을 때
      if (res.dataHeader.successCode === 0) {
        handleConfetti()
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
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
          title: '회원가입을 축하합니다!',
        })
        navigate('/login')
      }
      // 실패 - 1. 중복된 이메일
      else if (
        res.dataHeader.successCode === 1 &&
        res.dataHeader.resultCode === null
      ) {
        setErrorMessage(
          '이미 가입되어 있는 이메일입니다. 로그인하여 서비스를 이용하세요. ',
        )
      }
      // 실패 - 2. 유효성 검사 관련 오류
      else if (
        res.dataHeader.successCode === 1 &&
        res.dataHeader.resultCode === 'validError'
      ) {
        setErrorMessage('유효성 검사 관련 오류')
      }
    },
  })

  const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = {
      name,
      nickname,
      email,
      password,
      profileImage,
    }

    if (!isSend) {
      setErrorMessage('이메일 인증을 완료해주세요.')
    } else if (!isMatch) {
      setErrorMessage('이메일 인증을 완료해주세요.')
    } else if (!isCollect) {
      setErrorMessage('비밀번호를 올바르게 입력해주세요.')
    } else {
      RegisterUser(data)
      setErrorMessage('') // 에러 메시지 초기화
    }
  }

  return (
    <u.Container>
      <u.LeftWrap>
        <InfoSection
          title="Welecome!"
          subtitle="환영합니다! 회원가입 후 다양한 기능을 이용하세요."
        />
        <u.Form onSubmit={handleRegisterUser}>
          {errorMessage && <u.ErrorMsg>{errorMessage}</u.ErrorMsg>}
          <TextInput
            value={name}
            onChange={e => setName(e.target.value)}
            id="name"
            placeholder="이름"
          />
          <TextInput
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            id="nickname"
            placeholder="닉네임"
          />
          <EmailInputWithBtn
            value={email}
            onChange={e => setEmail(e.target.value)}
            id="email"
            placeholder="이메일"
            handleSendEmailCode={handleSendEmailCode}
            btnText={btnText}
          />
          {isSend && (
            <TextInputWithBtn
              value={emailCode}
              onChange={e => setEmailCode(e.target.value)}
              id="emailCode"
              placeholder="인증코드"
              handleVerifyEmailCode={handleVerifyEmailCode}
              codeText={codeText}
            />
          )}
          <u.InputContainer>
            <PasswordInput
              value={password}
              onChange={e => setPassword(e.target.value)}
              id="password"
              placeholder="비밀번호"
            />
            <u.InputMsg>영문, 숫자, 특수문자 포함 8~16자</u.InputMsg>
          </u.InputContainer>
          <RepeatPwInput
            password={password}
            isCollect={isCollect}
            setIsCollect={setIsCollect}
          />
          <u.Btn type="submit">Sign Up</u.Btn>
        </u.Form>
        <AskSection title="계정이 이미 있으신가요?" subtitle="Log In" />
      </u.LeftWrap>
      <u.RightWrap>
        <u.ImgDiv>
          <img src="/gifs/buildings.gif" alt="img" />
        </u.ImgDiv>
      </u.RightWrap>
    </u.Container>
  )
}

export default SignUpGeneralContainer
