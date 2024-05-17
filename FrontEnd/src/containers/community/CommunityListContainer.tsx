import ArticleList from '@src/components/community/list/ArticleList'
import { useQuery } from '@tanstack/react-query'
import { fetchCommunityList, fetchPopularArticle } from '@src/api/communityApi'
import { useEffect, useState } from 'react'
import useCommunityStore from '@src/stores/communityStore'
import * as c from '@src/containers/community/CommunityContainerStyle'
import PopularList from '@src/components/community/list/PopularList'
import { useLocation } from 'react-router-dom'
import three_line from '@src/assets/three_line.svg'
import three_line_gray from '@src/assets/three_line_gray.svg'

const CommunityListContainer = () => {
  const { category, setSelectedCategory } = useCommunityStore(state => ({
    category: state.selectedCategory,
    setSelectedCategory: state.setSelectedCategory,
  }))

  const location = useLocation()
  const [hasMoreData, setHasMoreData] = useState(true)

  // 커뮤니티 목록에 들어오면 스크롤 top으로 올리기
  useEffect(() => {
    if (location.pathname === '/community/list') {
      setSelectedCategory({
        name: '전체보기',
        value: '',
        iconActive: three_line,
        iconInactive: three_line_gray,
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location, setSelectedCategory])

  // 커뮤니티 목록 호출 query
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['CommunityList', category],
    queryFn: () => fetchCommunityList(category.value, 0),
    enabled: hasMoreData,
  })

  // 카테고리 바뀌면 목록 refetch
  useEffect(() => {
    refetch()
    setHasMoreData(true)
  }, [refetch, category])

  // 인기 게시글 불러오는 useQuery
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
              <ArticleList
                initialArticleList={data.dataBody}
                hasMoreData={hasMoreData}
                setHasMoreData={setHasMoreData}
              />
            </c.List>
          ) : (
            <c.Mid>
              <ArticleList
                initialArticleList={data.dataBody}
                hasMoreData={hasMoreData}
                setHasMoreData={setHasMoreData}
              />
            </c.Mid>
          )}
        </c.Div>
      ) : (
        <c.Div>데이터가 없습니다 ㅠㅠ</c.Div>
      )}
    </c.Div>
  )
}

export default CommunityListContainer
