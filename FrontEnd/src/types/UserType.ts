// request, data type
export type SignUpDataType = {
  name: string
  nickname: string
  email: string
  password: string
  profileImage: string | null
}

export type LoginDataType = {
  email: string
  password: string
}

// params type
export type VerifyEmailVerificationCodeParamsType = {
  memberEmail: string
  emailCode: string
}

// store type
export type UserStoreType = {
  signUpData: SignUpDataType
  emailCode: string
  loginData: LoginDataType
  setSignUpData: (fieldName: keyof SignUpDataType, value: string) => void
  setEmailCode: (code: string) => void
  setLoginData: (fieldName: keyof LoginDataType, value: string) => void
}

// prop type
export type InfoSectionPropsType = {
  title: string
  subtitle: string
}

export type AskSectionPropsType = {
  title: string
  subtitle: string
}

export type EmailInputSectionPropsType = {
  handleSendEmailCode: () => void
  handleVerifyEmailCode: () => void
}
