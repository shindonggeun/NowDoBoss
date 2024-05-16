import { create } from 'zustand'

import buildingSmall from '@src/assets/building_small.svg'
import buildingMedium from '@src/assets/building_medium.svg'
import buildingLarge from '@src/assets/building_large.svg'
// import { SimulationReportType } from '@src/types/SimulationType'

export interface SubCategoryItem {
  name: string
  code: string
}

type SubCategoryType = {
  [category: string]: SubCategoryItem[]
}

export const subCategories: SubCategoryType = {
  음식점: [
    { name: '한식음식점', code: 'CS100001' },
    { name: '중식음식점', code: 'CS100002' },
    { name: '일식음식점', code: 'CS100003' },
    { name: '양식음식점', code: 'CS100004' },
    { name: '제과점', code: 'CS100005' },
    { name: '패스트푸드점', code: 'CS100006' },
    { name: '치킨전문점', code: 'CS100007' },
    { name: '분식전문점', code: 'CS100008' },
    { name: '호프-간이주점', code: 'CS100009' },
    { name: '커피-음료', code: 'CS100010' },
  ],
  학원: [
    { name: '일반교습학원', code: 'CS200001' },
    { name: '외국어학원', code: 'CS200002' },
    { name: '예술학원', code: 'CS200003' },
    { name: '스포츠 강습', code: 'CS200005' },
  ],
  '레저/오락': [
    { name: 'PC방', code: 'CS200019' },
    { name: '노래방', code: 'CS200037' },
    // { name: '당구장', code: 'CS200016' },
    // { name: '골프연습장', code: 'CS200017' },
    // { name: '스포츠클럽', code: 'CS200024' },
  ],
  서비스: [
    { name: '세탁소', code: 'CS200031' },
    { name: '부동산중개업', code: 'CS200033' },
    { name: '일반의원', code: 'CS200006' },
    { name: '여관', code: 'CS200034' },
    { name: '자동차수리', code: 'CS200025' },
    { name: '미용실', code: 'CS200028' },
    // { name: '치과의원', code: 'CS200007' },
    // { name: '한의원', code: 'CS200008' },
    // { name: '가전제품수리', code: 'CS200032' },
    // { name: '고시원', code: 'CS200036' },
    // { name: '자동차미용', code: 'CS200026' },
    // { name: '네일숍', code: 'CS200029' },
    // { name: '피부관리실', code: 'CS200030' },
  ],
  도소매: [
    { name: '슈퍼마켓', code: 'CS300001' },
    { name: '편의점', code: 'CS300002' },
    { name: '수산물판매', code: 'CS300007' },
    { name: '일반의류', code: 'CS300010' },
    { name: '안경', code: 'CS300016' },
    { name: '의약품', code: 'CS300018' },
    // { name: '핸드폰', code: 'CS300004' },
    // { name: '미곡판매', code: 'CS300005' },
    // { name: '육류판매', code: 'CS300006' },
    // { name: '청과상', code: 'CS300008' },
    // { name: '반찬가게', code: 'CS300009' },
    // { name: '신발', code: 'CS300014' },
    // { name: '가방', code: 'CS300015' },
    // { name: '시계및귀금속', code: 'CS300017' },
    // { name: '의료기기', code: 'CS300019' },
    // { name: '컴퓨터및주변장치판매', code: 'CS300003' },
  ],
  생활용품: [
    { name: '화장품', code: 'CS300022' },
    { name: '자전거 및 기타운송장비', code: 'CS300025' },
    { name: '애완동물', code: 'CS300029' },
    // { name: '서적', code: 'CS300020' },
    // { name: '문구', code: 'CS300021' },
    // { name: '운동/경기용품', code: 'CS300024' },
    // { name: '완구', code: 'CS300026' },
    // { name: '섬유제품', code: 'CS300027' },
    // { name: '화초', code: 'CS300028' },
    // { name: '가구', code: 'CS300031' },
    // { name: '철물점', code: 'CS300033' },
    // { name: '인테리어', code: 'CS300035' },
    // { name: '조명용품', code: 'CS300036' },
    // { name: '전자상거래업', code: 'CS300043' },
    // { name: '가전제품', code: 'CS300032' },
  ],
}

interface BuildingType {
  [key: string]: {
    name: string
    img: string
  }
}

export const BuildingData: BuildingType = {
  small: {
    name: '소형',
    img: buildingSmall,
  },
  medium: {
    name: '중형',
    img: buildingMedium,
  },
  large: {
    name: '대형',
    img: buildingLarge,
  },
}

interface StoreSizeState {
  small: {
    squareMeter: number
    pyeong: number
  }
  medium: {
    squareMeter: number
    pyeong: number
  }
  large: {
    squareMeter: number
    pyeong: number
  }
}

interface SimulationState {
  step: number
  isFranchise: boolean | null
  brandName: string | null
  category: string
  subCategoryName: string
  subCategoryCode: string
  bulidingSize: number
  floor: string
  setStep: (step: number) => void
  setIsFranchise: (isFranchise: boolean | null) => void
  setBrandName: (brandName: string | null) => void
  setCategory: (category: string) => void
  setSubCategoryName: (subCategoryName: string) => void
  setSubCategoryCode: (subCategoryCode: string) => void
  setBulidingSize: (bulidingSize: number) => void
  setFloor: (floor: string) => void
  updateStoreSize: StoreSizeState
  setUpdateStoreSize: (updateStoreSize: StoreSizeState) => void
  resetSimulButton: () => void
}

// 가게 정보 입력 저장
const useSimulationStore = create<SimulationState>(set => ({
  step: 1,
  setStep: step => set({ step }),
  isFranchise: null,
  setIsFranchise: isFranchise => set({ isFranchise }),
  brandName: null,
  setBrandName: (brandName: string | null) => set({ brandName }),
  category: '',
  setCategory: category => set({ category }),
  subCategoryName: '',
  setSubCategoryName: subCategoryName => set({ subCategoryName }),
  subCategoryCode: '',
  setSubCategoryCode: subCategoryCode => set({ subCategoryCode }),
  bulidingSize: 0,
  setBulidingSize: bulidingSize => set({ bulidingSize }),
  floor: '',
  setFloor: floor => set({ floor }),

  // 가게 사이즈 저장
  updateStoreSize: {
    small: {
      squareMeter: 0,
      pyeong: 0,
    },
    medium: {
      squareMeter: 0,
      pyeong: 0,
    },
    large: {
      squareMeter: 0,
      pyeong: 0,
    },
  },
  setUpdateStoreSize: data => set({ updateStoreSize: data }),

  resetSimulButton: () => {
    set({ isFranchise: null })
    set({ brandName: null })
    set({ category: '' })
    set({ subCategoryName: '' })
    set({ subCategoryCode: '' })
    set({ bulidingSize: 0 })
    set({ floor: '' })
  },
}))

export default useSimulationStore
