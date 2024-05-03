import MainContent from '@src/components/community/detail/MainContent'
import SubContent from '@src/components/community/detail/SubContent'
import CommentList from '@src/components/community/detail/CommentList'
import * as c from '@src/containers/community/CommunityContainerStyle'
import Divider from '@src/common/Divider'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchCommunityDetail } from '@src/api/communityApi'

const CommunityDetailContainer = () => {
  const { communityId } = useParams<{ communityId: string }>()

  const { data, isLoading } = useQuery({
    queryKey: ['CommunityList'],
    queryFn: () => fetchCommunityDetail(Number(communityId)),
  })

  return (
    <c.Mid>
      {!isLoading && data ? (
        <c.MainContentDiv>
          <MainContent detailData={data.dataBody} />
          <CommentList communityId={communityId} />
          <Divider />
          <SubContent />
        </c.MainContentDiv>
      ) : (
        <div>데이터 호출 에러</div>
      )}
    </c.Mid>
  )
}
export default CommunityDetailContainer
