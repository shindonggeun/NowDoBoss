// data type
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

export type SignUpErrorType = {
  nameErr: string
  nicknameErr: string
  emailErr: string
  codeErr: string
  passwordErr: string
  repeatErr: string
}

export type MemberInfoType = {
  id: number | null
  name: string
  nickname: string
  email: string
  profileImage: string | null
  provider: string | null
  role: string
}

// paths type
export type VerifyEmailVerificationCodePathsType = {
  memberEmail: string
  emailCode: string
}

// params type

// store type
export type UserStoreType = {
  signUpData: SignUpDataType
  emailCode: string
  loginData: LoginDataType
  signUpError: SignUpErrorType
  memberInfo: MemberInfoType
  setSignUpData: (fieldName: keyof SignUpDataType, value: string) => void
  setEmailCode: (code: string) => void
  setLoginData: (fieldName: keyof LoginDataType, value: string) => void
  setSignUpError: (fieldName: keyof SignUpErrorType, value: string) => void
  setMemberInfo: (fieldName: keyof MemberInfoType, value: string) => void
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
}

export type CodeInputSectionPropsType = {
  handleVerifyEmailCode: () => void
}
