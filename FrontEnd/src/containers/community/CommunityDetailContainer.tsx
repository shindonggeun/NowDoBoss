import MainContent from '@src/components/community/detail/MainContent'
import SubContent from '@src/components/community/detail/SubContent'
import * as c from '@src/containers/community/CommunityContainerStyle'

const CommunityDetailContainer = () => {
  return (
    <c.DetailContainer>
      <c.MainContentDiv>
        <MainContent />
      </c.MainContentDiv>
      <c.SubContentDiv>
        <SubContent />
      </c.SubContentDiv>
    </c.DetailContainer>
  )
}
export default CommunityDetailContainer
