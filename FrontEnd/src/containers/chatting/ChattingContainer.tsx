import ChattingBody from '@src/components/chatting/ChattingBody'
import * as c from '@src/containers/chatting/ChattingContainerStyle'
import NavBar from '@src/components/community/list/NavBar'
import useCommunityStore from '@src/stores/communityStore'

const ChattingContainer = () => {
  const { setCategory } = useCommunityStore(state => ({
    setCategory: state.setSelectedCategory,
  }))
  return (
    <c.Container>
      <c.NabBar>
        <NavBar setCategory={setCategory} />
      </c.NabBar>
      <c.MainContent>
        <ChattingBody />
      </c.MainContent>
    </c.Container>
  )
}

export default ChattingContainer
