import * as c from '@src/components/styles/chatting/ChattingNavbarStyle'
import * as n from '@src/components/styles/community/NavbarStyle'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CreateModal from '@src/components/chatting/CreateModal'
import ChatSearchBar from '@src/components/chatting/ChatSearchBar'
import penIcon from '@src/assets/pen.svg'
import arrowRight from '@src/assets/arrow_right.svg'

const ChattingNavbar = () => {
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <c.Container>
      <c.Chatting>
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
          <n.CreateButton onClick={() => setModalOpen(true)}>
            <c.Big>채팅방 생성하기</c.Big>
          </n.CreateButton>

          {/* 검색창 */}
          <n.Sub>나의 채팅방 목록</n.Sub>
          <ChatSearchBar />
          <c.CreateIcon src={penIcon} onClick={() => setModalOpen(true)} />
        </c.SmallRight>
      </c.Chatting>

      <c.Modal>
        <CreateModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </c.Modal>
    </c.Container>
  )
}

export default ChattingNavbar
