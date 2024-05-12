import ArticleList from '@src/components/community/list/ArticleList'
import { useQuery } from '@tanstack/react-query'
import { fetchCommunityList, fetchPopularArticle } from '@src/api/communityApi'
import { useEffect } from 'react'
import useCommunityStore from '@src/stores/communityStore'
import * as c from '@src/containers/community/CommunityContainerStyle'
import PopularList from '@src/components/community/list/PopularList'
import { useLocation } from 'react-router-dom'

const CommunityListContainer = () => {
  const { category } = useCommunityStore(state => ({
    category: state.selectedCategory,
  }))

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/community/list') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location])

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['CommunityList'],
    queryFn: () => fetchCommunityList(category.value),
  })
  useEffect(() => {
    refetch()
  }, [refetch, category])

  // 인기 채팅방 불러오는 useQuery
  const { data: popularData, isLoading: popularIsLoading } = useQuery({
    queryKey: ['fetchPopularArticle'],
    queryFn: () => fetchPopularArticle(),
  })

  return (
    <c.Div>
      {!isLoading && data && !popularIsLoading && popularData ? (
        <c.Div>
          {!category.value ? (
            <c.List>
              <PopularList data={popularData.dataBody} />
              <ArticleList articleList={data.dataBody} />
            </c.List>
          ) : (
            <c.Mid>
              <ArticleList articleList={data.dataBody} />
            </c.Mid>
          )}
        </c.Div>
      ) : (
        <c.Div>데이터 호출 에러</c.Div>
      )}
    </c.Div>
  )
}

export default CommunityListContainer
