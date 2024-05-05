import dongsData from '@src/datas/District.json'
import { create } from 'zustand'
import { CommercialBody, DongBody } from '@src/types/MapType'

// 행정구 코드, 이름 데이터 json 파일에서 불러오기
const data = dongsData

export type DistrictType = { name: string; code: number }

export type SelectedPlaceStoreType = {
  goosData: {
    gooCode: number
    gooName: string
    gooCenter: number[]
  }[]
  selectedGoo: DistrictType
  setSelectedGoo: (place: DistrictType) => void
  selectedDong: DistrictType
  setSelectedDong: (place: DistrictType) => void
  selectedCommercial: DistrictType
  setSelectedCommercial: (place: DistrictType) => void
  // 동 목록 저장
  saveDongList: DongBody
  setSaveDongList: (list: DongBody) => void
  // 상권 목록 저장
  saveCommercialList: CommercialBody
  setSaveCommercialList: (list: CommercialBody) => void
}

export const selectPlaceStore = create<SelectedPlaceStoreType>(set => ({
  // 선택한 행정구
  selectedGoo: { name: '행정구', code: 0 },
  setSelectedGoo: place => set({ selectedGoo: place }),
  // 선택한 행정동
  selectedDong: { name: '행정동', code: 0 },
  setSelectedDong: place => set({ selectedDong: place }),
  // 선택한 상권
  selectedCommercial: { name: '상권', code: 0 },
  // selectedCommercial: { name: '배화여자대학교(박노수미술관)', code: 3110008 },
  setSelectedCommercial: place => set({ selectedCommercial: place }),
  // 행정구 데이터 목록
  goosData: data,
  // 선택한 행정구에 속해있는 행정동 목록
  saveDongList: [
    {
      administrationCodeName: '',
      administrationCode: 0,
      centerLat: 0,
      centerLng: 0,
    },
  ],
  setSaveDongList: list => set({ saveDongList: list }),
  // 선택한 행정동에 속해있는 상권 목록
  saveCommercialList: [
    {
      commercialCode: 0,
      commercialCodeName: '',
      commercialClassificationCode: '',
      commercialClassificationCodeName: '',
      centerLat: 0,
      centerLng: 0,
    },
  ],
  setSaveCommercialList: list => set({ saveCommercialList: list }),
}))

export default selectPlaceStore
