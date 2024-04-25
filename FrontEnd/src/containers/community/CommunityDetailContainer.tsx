import MainContent from '@src/components/community/detail/MainContent'
import SubContent from '@src/components/community/detail/SubContent'
import CommentList from '@src/components/community/detail/CommentList'
import * as c from '@src/containers/community/CommunityContainerStyle'
import NavBar from '@src/components/community/list/NavBar'
import Divider from '@src/common/Divider'
import useCommunityStore from '@src/stores/communityStore'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchCommunityDetail } from '@src/api/communityApi'

const CommunityDetailContainer = () => {
  const { communityId } = useParams<{ communityId: string }>()
  const { setCategory } = useCommunityStore(state => ({
    // category: state.selectedCategory,
    setCategory: state.setSelectedCategory,
  }))

  const { data, isLoading } = useQuery({
    queryKey: ['CommunityList'],
    queryFn: () => fetchCommunityDetail(Number(communityId)),
  })

  return (
    <div>
      {!isLoading && data ? (
        <c.Container>
          <c.NabBar>
            <NavBar setCategory={setCategory} />
          </c.NabBar>
          <c.MarginLeft>
            <c.Context>
              <c.MainContentDiv>
                <MainContent detailData={data.dataBody} />
                <CommentList />
                <Divider />
                <SubContent />
              </c.MainContentDiv>
            </c.Context>
          </c.MarginLeft>
        </c.Container>
      ) : (
        <div>데이터 호출 에러</div>
      )}
    </div>
  )
}
export default CommunityDetailContainer
