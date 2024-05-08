import * as c from '@src/components/styles/chatting/ChattingHeaderStyle'

const ChattingHeader = () => {
  return (
    <c.Container>
      <c.Header>
        <c.ChatInfo>
          <c.ChatImg />
          <c.ChatDiv>
            <c.ChatTitle>제목</c.ChatTitle>
            <c.ChatMembers>3 members</c.ChatMembers>
          </c.ChatDiv>
        </c.ChatInfo>
        <c.More>⋯</c.More>
      </c.Header>
    </c.Container>
  )
}

export default ChattingHeader
