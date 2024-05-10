import * as n from '@src/components/styles/community/NavbarStyle'
import { useEffect, useState } from 'react'
import useCommunityStore, { Category } from '@src/stores/communityStore'
import chatIcon from '@src/assets/chat_button.svg'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchMyRooms } from '@src/api/chattingApi'

export type NavBarPropsType = {
  setCategory: (category: Category) => void
  category: Category
}
const NavBar = (props: NavBarPropsType) => {
  const { setCategory, category } = props
  const navigate = useNavigate()
  // const location = useLocation()
  //
  // 채팅페이지인지 확인
  // const [isChatPage, setIsChatPage] = useState(false)
  //
  // useEffect(() => {
  //   setIsChatPage(String.prototype.startsWith('/community/chatting'))
  // }, [location.pathname])

  // store에 저장해둔 카테고리 받아오기
  const { categories, selectedCategory } = useCommunityStore(state => ({
    categories: state.categories,
    selectedCategory: state.selectedCategory,
  }))

  const [userId, setUserId] = useState(0)
  useEffect(() => {
    const userInfo = window.localStorage.getItem('memberInfo')
    if (userInfo) {
      const user = JSON.parse(userInfo)
      setUserId(user.id)
    }
  }, [])

  // 선택한 문자열 filter 해서 style prop 하기 위한 값
  const [isChoice, setIsChoice] = useState<string>(
    selectedCategory.name ? selectedCategory.name : '전체보기',
  )

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fetchMyRooms'],
    queryFn: () => fetchMyRooms(),
    enabled: !!userId,
  })

  useEffect(() => {
    if (userId) {
      refetch()
    }
  }, [refetch, userId, category])

  return (
    <n.Container>
      <n.Community>
        <n.Title>커뮤니티</n.Title>
        {categories.map(navCategory => (
          <n.Category
            key={navCategory.name}
            $isChoice={isChoice === navCategory.name}
            onClick={() => {
              setIsChoice(navCategory.name)
              setCategory(navCategory)
              navigate('/community/list')
            }}
          >
            <n.Icon
              src={
                isChoice === navCategory.name
                  ? navCategory.iconActive
                  : navCategory.iconInactive
              }
              alt=""
            />
            <n.Text>{navCategory.name}</n.Text>
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
                  setCategory({
                    name: chatCard.name,
                    value: '',
                    iconActive: '',
                    iconInactive: '',
                  })
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
