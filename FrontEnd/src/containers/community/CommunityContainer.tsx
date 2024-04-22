import NavBar from '@src/components/community/NavBar'
import PopularChatList from '@src/components/community/PopularChatList'
import * as c from './CommunityContainerStyle'

const CommunityContainer = () => {
  return (
    <c.Container>
      <c.NabBar>
        <NavBar />
      </c.NabBar>
      <c.Context>
        <PopularChatList />
      </c.Context>
    </c.Container>
  )
}

export default CommunityContainer
