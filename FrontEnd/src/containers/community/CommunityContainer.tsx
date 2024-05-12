import NavBar from '@src/components/community/list/NavBar'
import useCommunityStore from '@src/stores/communityStore'
import { Outlet } from 'react-router-dom'
import * as c from './CommunityContainerStyle'

const CommunityContainer = () => {
  const { setCategory } = useCommunityStore(state => ({
    setCategory: state.setSelectedCategory,
  }))
  return (
    <c.Container>
      <c.NabBar>
        <NavBar setCategory={setCategory} />
      </c.NabBar>
      <c.MarginLeft>
        <c.Context>
          {/* 하위 페이지 위치 */}
          <Outlet />
        </c.Context>
      </c.MarginLeft>
    </c.Container>
  )
}

export default CommunityContainer
