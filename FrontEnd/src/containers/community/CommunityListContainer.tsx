import PopularChatList from '@src/components/community/list/PopularChatList'
import ArticleList from '@src/components/community/list/ArticleList'
import { useQuery } from '@tanstack/react-query'
import { fetchCommunityList } from '@src/api/communityApi'
import { useEffect } from 'react'
import useCommunityStore from '@src/stores/communityStore'
import * as c from '@src/containers/community/CommunityContainerStyle'

const CommunityListContainer = () => {
  const { category } = useCommunityStore(state => ({
    category: state.selectedCategory,
  }))

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['CommunityList'],
    queryFn: () => fetchCommunityList(category.value),
  })
  useEffect(() => {
    refetch()
  }, [refetch, category])
  return (
    <c.Mid>
      {!isLoading && data ? (
        <c.Div>
          <PopularChatList category={category.name} />
          <ArticleList articleList={data.dataBody} />
        </c.Div>
      ) : (
        <c.Div>데이터 호출 에러</c.Div>
      )}
    </c.Mid>
  )
}

export default CommunityListContainer
