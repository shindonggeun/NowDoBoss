import { create } from 'zustand'
import {
  LoginDataType,
  MemberInfoType,
  SignUpDataType,
  SignUpErrorType,
  UserStoreType,
} from '@src/types/UserType'

// 초기 상태
const initialSignUpData: SignUpDataType = {
  name: '',
  nickname: '',
  email: '',
  password: '',
  profileImage: null,
}

const initialLoginData: LoginDataType = {
  email: '',
  password: '',
}

const initialSignUpError: SignUpErrorType = {
  nameErr: '',
  nicknameErr: '',
  emailErr: '',
  codeErr: '',
  passwordErr: '',
  repeatErr: '',
}

const initialMemberInfo: MemberInfoType = {
  id: null,
  name: '',
  nickname: '',
  email: '',
  profileImage: null,
  provider: null,
  role: '',
}

// store
const userStore = create<UserStoreType>(set => ({
  signUpData: initialSignUpData,
  emailCode: '',
  loginData: initialLoginData,
  signUpError: initialSignUpError,
  memberInfo: initialMemberInfo,
  setSignUpData: (fieldName: keyof SignUpDataType, value: string) => {
    set(state => ({
      signUpData: {
        ...state.signUpData,
        [fieldName]: value,
      },
    }))
  },
  setEmailCode: (code: string) => {
    set({ emailCode: code })
  },
  setLoginData: (fieldName: keyof LoginDataType, value: string) => {
    set(state => ({
      loginData: {
        ...state.loginData,
        [fieldName]: value,
      },
    }))
  },
  setSignUpError: (fieldName: keyof SignUpErrorType, value: string) => {
    set(state => ({
      signUpError: {
        ...state.signUpError,
        [fieldName]: value,
      },
    }))
  },
  setMemberInfo: (fieldName: keyof MemberInfoType, value: string) => {
    set(state => ({
      memberInfo: {
        ...state.memberInfo,
        [fieldName]: value,
      },
    }))
  },
}))

export default userStore
