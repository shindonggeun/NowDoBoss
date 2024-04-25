import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import userStore from '@src/stores/userStore'
import {
  registerUser,
  sendEmailVerificationCode,
  verifyEmailVerificationCode,
} from '@src/api/userApi'
import InfoSection from '@src/components/User/InfoSection'
import NameInputSection from '@src/components/User/SignUp/NameInputSection'
import NicknameInputSection from '@src/components/User/SignUp/NicknameInputSection'
import EmailInputSection from '@src/components/User/SignUp/EmailInputSection'
import CodeInputSection from '@src/components/User/SignUp/CodeInputSection'
import PwInputSection from '@src/components/User/SignUp/PwInputSection'
import RepeatPwInputSection from '@src/components/User/SignUp/RepeatPwInputSection'
import AskSection from '@src/components/User/AskSection'
import SocialBtnSection from '@src/components/User/SocialBtnSection'
import * as u from '@src/containers/User/UserContainerStyle'
import Swal from 'sweetalert2'

const SignUpContainer = () => {
  const { signUpData, emailCode, setEmailError, signUpError, setSignUpError } =
    userStore()
  const navigate = useNavigate()
  const [emailSuccessCode, setEmailSuccessCode] = useState(1)
  const [codeSuccessCode, setCodeSuccessCode] = useState(1)

  // 이메일 인증코드 발송
  const { mutate: SendEmailVerificationCode } = useMutation({
    mutationKey: ['sendEmailVerificationCode'],
    mutationFn: sendEmailVerificationCode,
    onSuccess: res => {
      if (res.dataHeader.successCode === 0) {
        setEmailSuccessCode(0)
      } else {
        setEmailError('emailErr', res.dataHeader.resultMessage)
      }
    },
  })
  const handleSendEmailCode = () => {
    SendEmailVerificationCode(signUpData.email)
  }

  // 이메일 인증코드 검증
  const { mutate: VerifyEmailVerificationCode } = useMutation({
    mutationKey: ['verifyEmailVerificationCode'],
    mutationFn: verifyEmailVerificationCode,
    onSuccess: res => {
      if (res.dataHeader.successCode === 0) {
        setCodeSuccessCode(0)
      } else {
        setEmailError('codeErr', res.dataHeader.resultMessage)
      }
    },
  })

  const handleVerifyEmailCode = () => {
    const paths = {
      memberEmail: signUpData.email,
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
        navigate('/login')
      }
      // 실패 - 1. 중복된 이메일
      else if (
        res.dataHeader.successCode === 1 &&
        res.dataHeader.resultCode === null
      ) {
        Swal.fire({
          title: '이미 가입되어 있는 이메일입니다.',
          text: '로그인하여 서비스를 이용하세요.',
          icon: 'warning',
          confirmButtonText: '확인',
        }).then(() => {
          navigate('/login')
        })
      }
      // 실패 - 2. 유효성 검사 관련 오류
      else if (
        res.dataHeader.successCode === 1 &&
        res.dataHeader.resultCode === 'validError'
      ) {
        console.log('회원가입 실패 : 유효성 검사 오류')
        if (res.dataHeader.resultMessage.emailError) {
          setSignUpError('emailError', res.dataHeader.resultMessage.emailError)
        } else {
          setSignUpError('emailError', '')
        }

        if (res.dataHeader.resultMessage.passwordError) {
          setSignUpError(
            'passwordError',
            res.dataHeader.resultMessage.passwordError,
          )
        } else {
          setSignUpError('passwordError', '')
        }

        if (res.dataHeader.resultMessage.nameError) {
          setSignUpError('nameError', res.dataHeader.resultMessage.nameError)
        } else {
          setSignUpError('nameError', '')
        }

        if (res.dataHeader.resultMessage.nicknameError) {
          setSignUpError(
            'nicknameError',
            res.dataHeader.resultMessage.nicknameError,
          )
        } else {
          setSignUpError('nicknameError', '')
        }
      }
    },
  })
  console.log(signUpError)
  const handleRegisterUser = () => {
    if (codeSuccessCode === 0) {
      RegisterUser(signUpData)
    }
  }

  return (
    <u.Container>
      <u.LeftWrap>
        <InfoSection
          title="Welecome!"
          subtitle="환영합니다! 회원가입 후 다양한 기능을 이용하세요."
        />
        <NameInputSection />
        <NicknameInputSection />
        <EmailInputSection
          handleSendEmailCode={handleSendEmailCode}
          codeSuccessCode={codeSuccessCode}
        />
        {emailSuccessCode === 0 && codeSuccessCode === 1 && (
          <CodeInputSection handleVerifyEmailCode={handleVerifyEmailCode} />
        )}
        <PwInputSection />
        <RepeatPwInputSection />
        <u.Btn
          marginTop="7%"
          onClick={handleRegisterUser}
          disabled={codeSuccessCode !== 0}
        >
          Sign Up
        </u.Btn>
        <AskSection title="계정이 이미 있으신가요?" subtitle="Log In" />
        <SocialBtnSection />
      </u.LeftWrap>
      <u.RightWrap />
    </u.Container>
  )
}

export default SignUpContainer
