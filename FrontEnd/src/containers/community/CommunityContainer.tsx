import NavBar from '@src/components/community/list/NavBar'
import PopularChatList from '@src/components/community/list/PopularChatList'
import ArticleList from '@src/components/community/list/ArticleList'
import { useQuery } from '@tanstack/react-query'
import { fetchCommunityList } from '@src/api/communityApi'
import { useEffect } from 'react'
import useCommunityStore from '@src/stores/communityStore'
import * as c from './CommunityContainerStyle'

const CommunityContainer = () => {
  const { category, setCategory } = useCommunityStore(state => ({
    category: state.selectedCategory,
    setCategory: state.setSelectedCategory,
  }))

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['CommunityList'],
    queryFn: () => fetchCommunityList(category.value),
  })
  useEffect(() => {
    refetch()
  }, [refetch, category])
  return (
    <div>
      {!isLoading && data ? (
        <c.Container>
          <c.NabBar>
            <NavBar setCategory={setCategory} />
          </c.NabBar>
          <c.MarginLeft>
            <c.Context>
              <PopularChatList />
              <ArticleList articleList={data.dataBody} />
            </c.Context>
          </c.MarginLeft>
        </c.Container>
      ) : (
        <div>데이터 호출 에러</div>
      )}
    </div>
  )
}

export default CommunityContainer
