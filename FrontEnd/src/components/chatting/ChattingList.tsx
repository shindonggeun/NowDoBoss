import * as a from '@src/components/styles/community/CommunityStyle'
import * as c from '@src/components/styles/chatting/ChattingListStyle'
import useCommunityStore from '@src/stores/communityStore'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchChattingList } from '@src/api/chattingApi'
import { ChatListType } from '@src/types/ChattingType'

const ChattingList = () => {
  const { categories } = useCommunityStore(state => ({
    categories: state.categories,
  }))
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['fetchChattingList'],
    queryFn: () => fetchChattingList(0),
  })

  return (
    <a.Container>
      {/*  게시글 목록 */}
      <a.ArticlesContainer>
        {data && !isLoading
          ? data.dataBody?.map((article: ChatListType) => {
              // 카테고리 이미지를 find 함수를 사용해 category name 과 일치하는 이미지 불러오기
              const matchedCategory = categories.find(
                category => category.value === article.category,
              )
              const iconSrc = matchedCategory
                ? matchedCategory.iconInactive
                : ''
              const categoryKorean = matchedCategory ? matchedCategory.name : ''
              return (
                <a.ArticleContainer
                  key={article.chatRoomId}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'instant' })
                    navigate(`/chatting/${article.chatRoomId}`)
                  }}
                >
                  <a.Header>
                    <a.Profile>
                      <c.Title>{article.name}</c.Title>
                    </a.Profile>
                    <c.Div>
                      <c.Content>
                        <a.Category>
                          <a.Icon src={iconSrc} />
                          {categoryKorean}
                        </a.Category>
                      </c.Content>
                      <c.Content>
                        멤버수 {article.memberCount} / {article.limit}
                      </c.Content>
                    </c.Div>
                  </a.Header>
                </a.ArticleContainer>
              )
            })
          : ''}
      </a.ArticlesContainer>
    </a.Container>
  )
}

export default ChattingList
