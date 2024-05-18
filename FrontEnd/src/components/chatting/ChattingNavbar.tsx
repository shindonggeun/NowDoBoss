import * as c from '@src/components/styles/chatting/ChattingNavbarStyle'
import * as n from '@src/components/styles/community/NavbarStyle'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CreateModal from '@src/components/chatting/CreateModal'
import ChatSearchBar from '@src/components/chatting/ChatSearchBar'
import penIcon from '@src/assets/pen.svg'
import arrowRight from '@src/assets/arrow_right.svg'
import NotLogin from '@src/common/swal/NotLogin'

const ChattingNavbar = () => {
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [modalOpen, setModalOpen] = useState(false)

  // 로그인 상태 확인 (localStorage 사용)
  const userLoggedIn = localStorage.getItem('isLogIn') === 'true'

  const handleCreateChatRoom = () => {
    if (userLoggedIn) {
      setModalOpen(true)
    } else {
      NotLogin(navigate)
    }
  }

  // 스크롤 내렸을 때 사라지게 하는 로직
  const [isTransparent, setIsTransparent] = useState<boolean>(true)
  const [lastScrollY, setLastScrollY] = useState<number>(0)

  // 현재 스크롤과 이전 스크롤 상태 비교해서 올림, 내림 스크롤 판단하는 로직
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    if (currentScrollY > lastScrollY) {
      setIsTransparent(false)
    } else {
      setIsTransparent(true)
    }
    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, lastScrollY])

  return (
    <c.Container>
      <c.Chatting $isTransparent={isTransparent}>
        <c.SmallLeft>
          <n.Title>채팅</n.Title>
          {/* <n.Sub>회원들과 대화를 나눠보세요.</n.Sub> */}
          <c.ChatCard
            $isChoice={!roomId}
            onClick={() => navigate('/chatting/list')}
          >
            <c.Big>
              &nbsp; 인기방 둘러보기
              <c.RightArrow src={arrowRight} />
            </c.Big>
            <c.Small>인기방🔥</c.Small>
          </c.ChatCard>
        </c.SmallLeft>
        <c.SmallRight>
          <n.CreateButton onClick={() => handleCreateChatRoom()}>
            <c.Big>채팅방 생성하기</c.Big>
          </n.CreateButton>

          {userLoggedIn && (
            <c.Col>
              <c.Sub>나의 채팅방 목록</c.Sub>

              <c.ChatList>
                <ChatSearchBar />
              </c.ChatList>
            </c.Col>
          )}
          <c.CreateIcon
            src={penIcon}
            onClick={() => handleCreateChatRoom()}
            $isTransparent={isTransparent}
          />
        </c.SmallRight>
      </c.Chatting>

      <c.Modal>
        <CreateModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </c.Modal>
    </c.Container>
  )
}

export default ChattingNavbar
