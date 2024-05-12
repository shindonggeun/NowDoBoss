import * as c from '@src/containers/chatting/ChattingContainerStyle'
import useCommunityStore from '@src/stores/communityStore'
import { useQuery } from '@tanstack/react-query'
import { fetchPopularRoom } from '@src/api/chattingApi'
import PopularChatList from '@src/components/chatting/PopularChatList'
import ChattingList from '@src/components/chatting/ChattingList'

const ChattingListContainer = () => {
  const { category } = useCommunityStore(state => ({
    category: state.selectedCategory,
  }))

  // 인기 채팅방 불러오는 useQuery
  const { data, isLoading } = useQuery({
    queryKey: ['fetchPopularRoom', category],
    queryFn: () => fetchPopularRoom(category.value),
  })

  return (
    <c.Div>
      {data && !isLoading && (
        <c.MainContentDiv>
          <PopularChatList data={data.dataBody} />
          <ChattingList />
        </c.MainContentDiv>
      )}
    </c.Div>
  )
}

export default ChattingListContainer
