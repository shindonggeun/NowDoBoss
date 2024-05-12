import * as c from '@src/components/styles/chatting/ChattingNavbarStyle'
import * as n from '@src/components/styles/community/NavbarStyle'
import { useQuery } from '@tanstack/react-query'
import { fetchMyRooms } from '@src/api/chattingApi'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateModal from '@src/components/chatting/CreateModal'

const ChattingNavbar = () => {
  const navigate = useNavigate()
  const [userId, setUserId] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  // const [isChoice, setIsChoice] = useState(false)

  useEffect(() => {
    const userInfo = window.localStorage.getItem('memberInfo')
    if (userInfo) {
      const user = JSON.parse(userInfo)
      setUserId(user.id)
    }
  }, [])

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['fetchMyRooms'],
    queryFn: () => fetchMyRooms(),
    enabled: !!userId,
  })

  useEffect(() => {
    if (userId) {
      refetch()
    }
  }, [refetch, userId])

  return (
    <c.Container>
      {' '}
      {data && !isLoading && (
        <c.Div>
          <c.Chatting>
            <n.Title>채팅</n.Title>
            <n.Sub>회원들과 대화를 나눠보세요.</n.Sub>
            <c.ChatCard
              $isChoice={false}
              onClick={() => navigate('/chatting/list')}
            >
              둘러보기 &nbsp;&nbsp; →
            </c.ChatCard>
            <n.CreateButton onClick={() => setModalOpen(true)}>
              채팅방 생성하기
            </n.CreateButton>
            {/* 검색창 */}
            <c.Group>
              <c.InputIcon viewBox="0 0 24 24">
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
              </c.InputIcon>
              <c.Input placeholder="사용자 검색하기" type="search" />
            </c.Group>
            {data.dataBody.map((chatCard: { id: number; name: string }) => (
              <c.ChatCard
                key={chatCard.id}
                // $isChoice={isChoice === chatCard.name}
                $isChoice={false}
                onClick={() => {
                  navigate(`/chatting/${chatCard.id}`)
                }}
              >
                {/* <c.ProfileImg /> */}
                <c.Text>{chatCard.name}</c.Text>
              </c.ChatCard>
            ))}
          </c.Chatting>

          <c.Modal>
            <CreateModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
          </c.Modal>
        </c.Div>
      )}
    </c.Container>
  )
}

export default ChattingNavbar
