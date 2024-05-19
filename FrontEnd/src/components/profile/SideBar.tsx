import { useLocation, useNavigate } from 'react-router-dom'
import * as s from '@src/components/styles/profile/SideBarStyle'
import LogoutContainer from '@src/containers/User/LogoutContainer'

const SideBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 현재 경로와 메뉴 아이템의 경로를 비교하여 스타일을 결정하는 함수
  const isActive = (path: string) => {
    return location.pathname.includes(path)
  }

  return (
    <s.Container>
      <s.MenuItem
        onClick={() => navigate('/profile/bookmarks')}
        style={{
          fontWeight: isActive('/profile/bookmarks') ? '600' : '400',
        }}
      >
        북마크
      </s.MenuItem>
      <s.Divider />
      <s.MenuItem
        onClick={() => navigate('/profile/settings/edit')}
        style={{
          fontWeight: isActive('/profile/settings') ? '600' : '400',
        }}
      >
        개인 정보 설정
      </s.MenuItem>
      <s.MenuItem>
        <LogoutContainer />
      </s.MenuItem>
    </s.Container>
  )
}

export default SideBar
