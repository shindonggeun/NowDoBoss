import { create } from 'zustand'
import {
  LoginDataType,
  SignUpDataType,
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

// store
const userStore = create<UserStoreType>(set => ({
  signUpData: initialSignUpData,
  emailCode: '',
  loginData: initialLoginData,
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
}))

export default userStore
