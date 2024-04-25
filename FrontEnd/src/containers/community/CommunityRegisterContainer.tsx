import ContentRegister from '@src/components/community/register/ContentRegister'
import * as c from '@src/containers/community/CommunityContainerStyle'
import NavBar from '@src/components/community/list/NavBar'
import useCommunityStore from '@src/stores/communityStore'

const CommunityRegisterContainer = () => {
  const { setCategory } = useCommunityStore(state => ({
    // category: state.selectedCategory,
    setCategory: state.setSelectedCategory,
  }))
  return (
    <c.Container>
      <c.NabBar>
        <NavBar setCategory={setCategory} />
      </c.NabBar>
      <c.MarginLeft>
        <ContentRegister />
      </c.MarginLeft>
    </c.Container>
  )
}

export default CommunityRegisterContainer
