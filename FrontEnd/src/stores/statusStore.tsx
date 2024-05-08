import { create } from 'zustand'

export type WeekDays = {
  [key: string]: string
}

export const WeekData: WeekDays = {
  monday: ' 월요일',
  tuesday: ' 화요일',
  wednesday: ' 수요일',
  thursday: ' 목요일',
  friday: ' 금요일',
  saturday: ' 토요일',
  sunday: ' 일요일',
}

interface StatusState {
  selectedRegion: string | null
  setSelectedRegion: (selectedRegion: string | null) => void
}

// 가게 정보 입력 저장
const useStateStore = create<StatusState>(set => ({
  selectedRegion: null,
  setSelectedRegion: selectedRegion => set({ selectedRegion }),
}))

export default useStateStore
