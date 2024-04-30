import districtData from '@src/datas/District.json'
import { create } from 'zustand'

// 행정구 코드, 이름 데이터 json 파일에서 불러오기
const data = districtData

export type DistrictType = { name: string; code: number }

export type SelectedPlaceStoreType = {
  districtData: { districtCode: number; districtName: string }[]
  selectedDistrict: DistrictType
  setSelectedDistrict: (place: DistrictType) => void
  selectedAdministration: DistrictType
  setSelectedAdministration: (place: DistrictType) => void
  selectedCommercial: DistrictType
  setSelectedCommercial: (place: DistrictType) => void
}

export const selectPlaceStore = create<SelectedPlaceStoreType>(set => ({
  districtData: data,
  // 선택한 행정구
  selectedDistrict: { name: '', code: 0 },
  setSelectedDistrict: place => set({ selectedDistrict: place }),
  // 선택한 행정동
  selectedAdministration: { name: '', code: 0 },
  setSelectedAdministration: place => set({ selectedAdministration: place }),
  // 선택한 상권
  selectedCommercial: { name: '', code: 0 },
  setSelectedCommercial: place => set({ selectedCommercial: place }),
}))

export default selectPlaceStore
