import * as h from '@src/common/style/HeaderStyle'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavigateType } from '@src/types/GlobalType'

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // 경로에 따라 activeMenu 설정
    switch (location.pathname) {
      case '/community':
        setActiveMenu('커뮤니티')
        break
      case '/register':
        setActiveMenu('회원가입')
        break
      case '/login':
        setActiveMenu('로그인')
        break
      case '/mypage':
        setActiveMenu('마이페이지')
        break
      default:
        setActiveMenu(null)
    }
  }, [location.pathname])

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName)
    if (menuName === '커뮤니티') {
      navigate('/community')
    } else if (menuName === '상권현황') {
      navigate('/status')
    } else if (menuName === '상권분석') {
      navigate('/')
    } else if (menuName === '상권추천') {
      navigate('/')
    } else if (menuName === '창업시뮬레이션') {
      navigate('/')
    } else if (menuName === '회원가입') {
      navigate('/register')
    } else if (menuName === '로그인') {
      navigate('/login')
    } else if (menuName === '마이페이지') {
      navigate('/mypage')
    }
  }

  const goNavigate = ({ url }: NavigateType) => {
    navigate(url)
  }

  return (
    <h.Container>
      <h.MenuListLeft>
        {['상권현황', '상권분석', '상권추천', '창업시뮬레이션', '커뮤니티'].map(
          menuName => (
            <h.Menu
              key={menuName}
              $isActive={activeMenu === menuName}
              onClick={() => handleMenuClick(menuName)}
            >
              {menuName}
            </h.Menu>
          ),
        )}
      </h.MenuListLeft>
      <h.LogoDiv onClick={() => goNavigate({ url: '/' })}>
        <h.Logo src="src/assets/logo.png" alt="logo" />
      </h.LogoDiv>
      <h.MenuListRight>
        {['마이페이지', '로그인', '회원가입'].map(menuName => (
          <h.Menu
            key={menuName}
            $isActive={activeMenu === menuName}
            onClick={() => handleMenuClick(menuName)}
          >
            {menuName}
          </h.Menu>
        ))}
      </h.MenuListRight>
      <h.HamburgerMenu>≡</h.HamburgerMenu>
    </h.Container>
  )
}
export default Header
