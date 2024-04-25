import { customAxios } from '@src/util/auth/customAxios'
import {
  LoginDataType,
  SignUpDataType,
  VerifyEmailVerificationCodePathsType,
} from '@src/types/UserType'

// 이메일 인증코드 발송
export const sendEmailVerificationCode = async (memberEmail: string) => {
  return customAxios.post(`/email/send/${memberEmail}`).then(res => res.data)
}

// 이메일 인증코드 검증
export const verifyEmailVerificationCode = async (
  paths: VerifyEmailVerificationCodePathsType,
) => {
  return customAxios
    .post(`/email/verify/${paths.memberEmail}/${paths.emailCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 회원가입
export const registerUser = async (data: SignUpDataType) => {
  return customAxios
    .post(`/member/signup`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 일반 로그인
export const loginUser = async (data: LoginDataType) => {
  return customAxios
    .post(`/member/login`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}

// 로그아웃
export const logoutUser = async () => {
  return customAxios
    .post(`/member/logout`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
