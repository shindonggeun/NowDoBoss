import * as n from '@src/components/styles/community/NavbarStyle'
import { useState } from 'react'
import useCommunityStore from '@src/stores/communityStore'

const NavBar = () => {
  const [isChoice, setIsChoice] = useState<string>('전체보기')

  const categories = useCommunityStore(state => state.categories)

  const chatCards = [
    {
      id: 1,
      name: '나도광연',
      img: '',
    },
    {
      id: 2,
      name: '나도정인',
      img: '',
    },
    {
      id: 3,
      name: '나도동근',
      img: '',
    },
    {
      id: 4,
      name: '나도성호',
      img: '',
    },
  ]

  return (
    <n.Container>
      <n.Community>
        <n.Title>커뮤니티</n.Title>
        {categories.map(category => (
          <n.Category
            key={category.name}
            $isChoice={isChoice === category.name}
            onClick={() => setIsChoice(category.name)}
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
      <n.Chatting>
        <n.Title>채팅</n.Title>
        {chatCards.map(chatCard => (
          <n.Category
            key={chatCard.id}
            $isChoice={isChoice === chatCard.name}
            onClick={() => setIsChoice(chatCard.name)}
          >
            <n.ProfileImg>{chatCard.img}</n.ProfileImg>
            <n.Text>{chatCard.name}</n.Text>
          </n.Category>
        ))}
      </n.Chatting>
      <n.ChatButton src="src/assets/chat_button.svg" />
    </n.Container>
  )
}

export default NavBar
