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
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
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
