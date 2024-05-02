import districtData from '@src/datas/District.json'
import { create } from 'zustand'
import { AdministrationBody, CommercialBody } from '@src/types/MapType'

// 행정구 코드, 이름 데이터 json 파일에서 불러오기
const data = districtData

export type DistrictType = { name: string; code: number }

export type SelectedPlaceStoreType = {
  districtData: {
    districtCode: number
    districtName: string
    districtCenter: number[]
  }[]
  selectedDistrict: DistrictType
  setSelectedDistrict: (place: DistrictType) => void
  selectedAdministration: DistrictType
  setSelectedAdministration: (place: DistrictType) => void
  selectedCommercial: DistrictType
  setSelectedCommercial: (place: DistrictType) => void
  // 동 목록 저장
  loadSelectedAdministration: AdministrationBody
  setLoadSelectedAdministration: (list: AdministrationBody) => void
  // 상권 목록 저장
  loadSelectedCommercial: CommercialBody
  setLoadSelectedCommercial: (list: CommercialBody) => void
}

export const selectPlaceStore = create<SelectedPlaceStoreType>(set => ({
  districtData: data,
  // 선택한 행정구
  selectedDistrict: { name: '행정구', code: 0 },
  setSelectedDistrict: place => set({ selectedDistrict: place }),
  // 선택한 행정동
  selectedAdministration: { name: '행정동', code: 0 },
  setSelectedAdministration: place => set({ selectedAdministration: place }),
  // 선택한 행정구에 속해있는 행정동 목록
  loadSelectedAdministration: [
    {
      administrationCodeName: '',
      administrationCode: 0,
    },
  ],
  setLoadSelectedAdministration: list =>
    set({ loadSelectedAdministration: list }),
  // 선택한 상권
  selectedCommercial: { name: '상권', code: 0 },
  setSelectedCommercial: place => set({ selectedCommercial: place }),
  // 선택한 행정동에 속해있는 상권 목록
  loadSelectedCommercial: [
    {
      commercialCode: 0,
      commercialCodeName: '',
      commercialClassificationCode: '',
      commercialClassificationCodeName: '',
    },
  ],
  setLoadSelectedCommercial: list => set({ loadSelectedCommercial: list }),
}))

export default selectPlaceStore
