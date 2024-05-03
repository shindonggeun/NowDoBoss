import ContentRegister from '@src/components/community/register/ContentRegister'
import * as c from '@src/containers/community/CommunityContainerStyle'
import useCommunityStore from '@src/stores/communityStore'

const CommunityRegisterContainer = () => {
  const { modifyCommunityId } = useCommunityStore(state => ({
    modifyCommunityId: state.modifyCommunityId,
  }))

  return (
    <c.Mid>
      <ContentRegister modifyCommunityId={modifyCommunityId} />
    </c.Mid>
  )
}

export default CommunityRegisterContainer
