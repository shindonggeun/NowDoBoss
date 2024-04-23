import create from 'zustand'

// 카테고리 타입 정의
interface Category {
  name: string
  iconActive: string
  iconInactive: string
}

// 스토어 타입 정의
interface CommunityStoreType {
  categories: Category[]
}

// 카테고리 데이터
const initialCategories: Category[] = [
  {
    name: '전체보기',
    iconActive: 'src/assets/three_line.svg',
    iconInactive: 'src/assets/three_line_gray.svg',
  },
  {
    name: '이모저모',
    iconActive: 'src/assets/fire.svg',
    iconInactive: 'src/assets/fire_gray.svg',
  },
  {
    name: '인테리어',
    iconActive: 'src/assets/shop.svg',
    iconInactive: 'src/assets/shop_gray.svg',
  },
  {
    name: '상권공유',
    iconActive: 'src/assets/map.svg',
    iconInactive: 'src/assets/map_gray.svg',
  },
  {
    name: '동업제안',
    iconActive: 'src/assets/user_add.svg',
    iconInactive: 'src/assets/user_add_gray.svg',
  },
  {
    name: '창업고민',
    iconActive: 'src/assets/chat.svg',
    iconInactive: 'src/assets/chat_gray.svg',
  },
]

// 스토어 생성
const communityStore = create<CommunityStoreType>(() => ({
  categories: initialCategories,
}))

export default communityStore
