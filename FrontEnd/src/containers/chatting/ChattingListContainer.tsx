import * as c from '@src/containers/chatting/ChattingContainerStyle'
import PopularChatList from '@src/components/community/list/PopularChatList'
import useCommunityStore from '@src/stores/communityStore'

const ChattingListContainer = () => {
  const { category } = useCommunityStore(state => ({
    category: state.selectedCategory,
  }))

  return (
    <c.MainContentDiv>
      <PopularChatList category={category.value} />
    </c.MainContentDiv>
  )
}

export default ChattingListContainer
