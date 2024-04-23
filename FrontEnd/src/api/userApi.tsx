import { customAxios } from '@src/util/auth/customAxios'
import queryString from 'query-string'
import {
  LoginDataType,
  SignUpDataType,
  VerifyEmailVerificationCodeParamsType,
} from '@src/types/UserType'

// 이메일 인증코드 발송
export const sendEmailVerificationCode = async (memberEmail: string) => {
  return customAxios
    .post(`/email/send?email=${memberEmail}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

// 이메일 인증코드 검증
export const verifyEmailVerificationCode = async (
  params: VerifyEmailVerificationCodeParamsType,
) => {
  return customAxios
    .post(`/email/send?${queryString.stringify(params)}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

// 회원가입
export const registerUser = async (data: SignUpDataType) => {
  return customAxios
    .post(`/member/signup`, data)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

// 일반 로그인
export const loginUser = async (data: LoginDataType) => {
  return customAxios
    .post(`/member/login`, data)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
