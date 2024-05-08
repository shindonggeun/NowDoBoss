import * as n from '@src/components/styles/community/NavbarStyle'
import { useState } from 'react'
import useCommunityStore, { Category } from '@src/stores/communityStore'
import chatIcon from '@src/assets/chat_button.svg'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchMyRooms } from '@src/api/chattingApi'

export type NavBarPropsType = {
  setCategory: (category: Category) => void
}
const NavBar = (props: NavBarPropsType) => {
  const { setCategory } = props
  const navigate = useNavigate()

  // store에 저장해둔 카테고리 받아오기
  const { categories, selectedCategory } = useCommunityStore(state => ({
    categories: state.categories,
    selectedCategory: state.selectedCategory,
  }))

  // 선택한 문자열 filter 해서 style prop 하기 위한 값
  const [isChoice, setIsChoice] = useState<string>(
    selectedCategory.name ? selectedCategory.name : '전체보기',
  )

  const { data, isLoading } = useQuery({
    queryKey: ['fetchMyRooms'],
    queryFn: () => fetchMyRooms(),
  })

  return (
    <n.Container>
      <n.Community>
        <n.Title>커뮤니티</n.Title>
        {categories.map(category => (
          <n.Category
            key={category.name}
            $isChoice={isChoice === category.name}
            onClick={() => {
              setIsChoice(category.name)
              setCategory(category)
              navigate('/community/list')
            }}
          >
            <n.Icon
              src={
                isChoice === category.name
                  ? category.iconActive
                  : category.iconInactive
              }
              alt=""
            />
            <n.Text>{category.name}</n.Text>
          </n.Category>
        ))}
      </n.Community>
      {data && !isLoading && (
        <n.Div>
          <n.Chatting>
            <n.Title>채팅</n.Title>
            {data.dataBody.map((chatCard: { id: number; name: string }) => (
              <n.Category
                key={chatCard.id}
                $isChoice={isChoice === chatCard.name}
                onClick={() => {
                  setIsChoice(chatCard.name)
                  navigate(`/community/chatting/${chatCard.id}`)
                }}
              >
                <n.ProfileImg />
                <n.Text>{chatCard.name}</n.Text>
              </n.Category>
            ))}
          </n.Chatting>
          <n.ChatButton
            src={chatIcon}
            onClick={() => navigate(`/community/chatting/1`)}
          />
        </n.Div>
      )}
    </n.Container>
  )
}

export default NavBar
