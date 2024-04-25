import NavBar from '@src/components/community/list/NavBar'
import PopularChatList from '@src/components/community/list/PopularChatList'
import ArticleList from '@src/components/community/list/ArticleList'
import * as c from './CommunityContainerStyle'

const CommunityContainer = () => {
  return (
    <c.Container>
      <c.NabBar>
        <NavBar />
      </c.NabBar>
      <c.MarginLeft>
        <c.Context>
          <PopularChatList />
          <ArticleList />
        </c.Context>
      </c.MarginLeft>
    </c.Container>
  )
}

export default CommunityContainer
