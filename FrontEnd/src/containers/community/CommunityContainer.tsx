import NavBar from '@src/components/community/list/NavBar'
import useCommunityStore from '@src/stores/communityStore'
import { Outlet } from 'react-router-dom'
import * as c from './CommunityContainerStyle'

const CommunityContainer = () => {
  const { setCategory } = useCommunityStore(state => ({
    category: state.selectedCategory,
    setCategory: state.setSelectedCategory,
  }))
  return (
    <div>
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
    </div>
  )
}

export default CommunityContainer
