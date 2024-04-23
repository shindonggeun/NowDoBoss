import NavBar from '@src/components/community/NavBar'
import PopularChatList from '@src/components/community/PopularChatList'
import ArticleList from '@src/components/community/ArticleList'
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
