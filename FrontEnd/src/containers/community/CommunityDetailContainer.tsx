import MainContent from '@src/components/community/detail/MainContent'
import SubContent from '@src/components/community/detail/SubContent'
import CommentList from '@src/components/community/detail/CommentList'
import * as c from '@src/containers/community/CommunityContainerStyle'
import Divider from '@src/common/Divider'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import {
  fetchCommunityDetail,
  fetchCommunityList,
  fetchPopularArticle,
} from '@src/api/communityApi'
import { useEffect, useState } from 'react'

const CommunityDetailContainer = () => {
  const { communityId } = useParams<{ communityId: string }>()
  const [category, setCategory] = useState<string>('')

  const [userId, setUserId] = useState<number>(0)

  // 로그인 된 사용자 id 값 받기
  useEffect(() => {
    const userInfo = window.localStorage.getItem('memberInfo')
    if (userInfo) {
      const user = JSON.parse(userInfo)
      setUserId(user.id)
    }
  }, [])

  const { data: DetailData, isLoading: DetailIsLoading } = useQuery({
    queryKey: ['CommunityDetail'],
    queryFn: () => fetchCommunityDetail(Number(communityId)),
  })

  useEffect(() => {
    if (DetailData) {
      setCategory(DetailData.dataBody.category)
    }
  }, [DetailData, setCategory])

  const { data: SameCategoryListData, isLoading: SameCategoryListIsLoading } =
    useQuery({
      queryKey: ['CommunityDetail', category],
      queryFn: () => fetchCommunityList(category, 0),
    })

  const { data: PopularData, isLoading: PopularIsLoading } = useQuery({
    queryKey: ['fetchPopularArticle'],
    queryFn: () => fetchPopularArticle(),
  })

  return (
    <c.Div>
      {!DetailIsLoading && DetailData ? (
        <c.MainContentDiv>
          <MainContent detailData={DetailData.dataBody} userId={userId} />
          <CommentList communityId={communityId} userId={userId} />
          <Divider />

          {!SameCategoryListIsLoading && SameCategoryListData && (
            <SubContent
              title="비슷한 게시글"
              data={SameCategoryListData.dataBody}
            />
          )}

          {!PopularIsLoading && PopularData && (
            <SubContent title="인기 많은 게시글" data={PopularData.dataBody} />
          )}
        </c.MainContentDiv>
      ) : (
        <div>데이터 호출 에러</div>
      )}
    </c.Div>
  )
}
export default CommunityDetailContainer
