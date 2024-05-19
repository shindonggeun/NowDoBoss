import { create } from 'zustand'
import { UserStoreType } from '@src/types/UserType'

// 쿠키 값을 가져오는 함수
export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

const userStore = create<UserStoreType>(set => ({
  isLogin: getCookie('accessToken') !== null,
  setIsLogin: (isLogin: boolean) => set(() => ({ isLogin })),
}))

export default userStore
