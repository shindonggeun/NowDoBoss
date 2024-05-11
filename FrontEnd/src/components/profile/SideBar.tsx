import { useNavigate, useLocation } from 'react-router-dom'
import * as s from '@src/components/styles/profile/SideBarStyle'

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
          fontWeight: isActive('/profile/bookmarks') ? '600' : 'normal',
        }}
      >
        북마크
      </s.MenuItem>
      <s.Divider />
      <s.MenuItem
        onClick={() => navigate('/profile/edit')}
        style={{
          fontWeight: isActive('/profile/edit') ? '600' : 'normal',
        }}
      >
        개인 정보 설정
      </s.MenuItem>
      <s.MenuItem
        onClick={() => navigate('/profile/change-password')}
        style={{
          fontWeight: isActive('/profile/change-password') ? '600' : 'normal',
        }}
      >
        비밀번호 변경
      </s.MenuItem>
      <s.MenuItem>로그아웃</s.MenuItem>
      <s.MenuItem
        onClick={() => navigate('/profile/withdraw')}
        style={{
          fontWeight: isActive('/profile/withdraw') ? '600' : 'normal',
        }}
      >
        회원탈퇴
      </s.MenuItem>
    </s.Container>
  )
}

export default SideBar
