import * as a from '@src/components/styles/community/CommunityStyle'
import useCommunityStore from '@src/stores/communityStore'
import { useNavigate } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'
// import { fetchChattingList } from '@src/api/chattingApi'

const ChattingList = () => {
  const { categories } = useCommunityStore(state => ({
    categories: state.categories,
  }))
  const navigate = useNavigate()

  // const { data } = useQuery({
  //   queryKey: ['fetchChattingList'],
  //   queryFn: () => fetchChattingList(0),
  // })

  const data = [
    {
      chatRoomId: 4,
      category: 'ETC',
      name: '종로 사장',
      memberCount: 2,
      limit: 10,
    },
    {
      chatRoomId: 3,
      category: 'ETC',
      name: '종로 사장',
      memberCount: 1,
      limit: 2,
    },
    {
      chatRoomId: 2,
      category: 'ETC',
      name: '종로 사장',
      memberCount: 1,
      limit: 2,
    },
    {
      chatRoomId: 1,
      category: 'ETC',
      name: '종로 사장',
      memberCount: 1,
      limit: 2,
    },
  ]

  console.log(data)

  return (
    <a.Container>
      {/*  게시글 목록 */}
      <a.ArticlesContainer>
        {Array.isArray(data)
          ? data.map(article => {
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
                    navigate(`/community/${article.chatRoomId}`)
                  }}
                >
                  <a.Header>
                    <a.Profile>
                      <a.ProfileContent>
                        <a.Category>
                          <a.Icon src={iconSrc} />
                          {categoryKorean}
                        </a.Category>
                      </a.ProfileContent>
                    </a.Profile>

                    <a.CardSubContent>
                      멤버수 {article.memberCount} / {article.limit}
                    </a.CardSubContent>
                  </a.Header>
                  <a.Body>
                    <a.BodyContent>
                      <a.CardTitle>{article.name}</a.CardTitle>
                    </a.BodyContent>
                  </a.Body>
                </a.ArticleContainer>
              )
            })
          : []}
      </a.ArticlesContainer>
    </a.Container>
  )
}

export default ChattingList
