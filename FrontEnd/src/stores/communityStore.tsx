import { create } from 'zustand'
import three_line from 'src/assets/three_line.svg'
import three_line_gray from 'src/assets/three_line_gray.svg'
import fire from 'src/assets/fire.svg'
import fire_gray from 'src/assets/fire_gray.svg'
import shop from 'src/assets/shop.svg'
import shop_gray from 'src/assets/shop_gray.svg'
import map from 'src/assets/map.svg'
import map_gray from 'src/assets/map_gray.svg'
import user_add from 'src/assets/user_add.svg'
import user_add_gray from 'src/assets/user_add_gray.svg'
import chat from 'src/assets/chat.svg'
import chat_gray from 'src/assets/chat_gray.svg'

// 카테고리 타입 정의
export type Category = {
  name: string
  value: string
  iconActive: string
  iconInactive: string
}

// 스토어 타입 정의
type CommunityStoreType = {
  categories: Category[]
  selectedCategory: Category
  setSelectedCategory: (category: Category) => void
  modifyCommunityId: number
  setModifyCommunityId: (id: number) => void
}

// 카테고리 데이터
const initialCategories: Category[] = [
  {
    name: '전체보기',
    value: '',
    iconActive: three_line,
    iconInactive: three_line_gray,
  },
  {
    name: '이모저모',
    value: 'ETC',
    iconActive: fire,
    iconInactive: fire_gray,
  },
  {
    name: '인테리어',
    value: 'INTERIOR',
    iconActive: shop,
    iconInactive: shop_gray,
  },
  {
    name: '상권공유',
    value: 'COMMERCIAL_AREA',
    iconActive: map,
    iconInactive: map_gray,
  },
  {
    name: '동업제안',
    value: 'PARTNERSHIP',
    iconActive: user_add,
    iconInactive: user_add_gray,
  },
  {
    name: '창업고민',
    value: 'START_UP',
    iconActive: chat,
    iconInactive: chat_gray,
  },
]

const initialSelectedCategory: Category = {
  name: '',
  value: '',
  iconActive: '',
  iconInactive: '',
}

// 스토어 생성
const communityStore = create<CommunityStoreType>(set => ({
  categories: initialCategories,
  selectedCategory: initialSelectedCategory,
  setSelectedCategory: category => set({ selectedCategory: category }),
  modifyCommunityId: 0,
  setModifyCommunityId: id => set({ modifyCommunityId: id }),
}))

export default communityStore
