import * as h from '@src/common/style/HeaderStyle.tsx'
import { useState } from 'react'

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMenuOpen] = useState<boolean>(false)

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName)
  }

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen)
  // }

  return (
    <h.Container>
      <h.MenuListLeft isMenuOpen={isMenuOpen}>
        {['상권현황', '상권분석', '상권추천', '창업시뮬레이션', '커뮤니티'].map(
          menuName => (
            <h.Menu
              key={menuName}
              isActive={activeMenu === menuName}
              onClick={() => handleMenuClick(menuName)}
            >
              {menuName}
            </h.Menu>
          ),
        )}
      </h.MenuListLeft>
      <h.Logo src="src/assets/logo.png" alt="logo" />
      <h.MenuListRight isMenuOpen={isMenuOpen}>
        {['마이페이지', '로그인', '회원가입'].map(menuName => (
          <h.Menu
            key={menuName}
            isActive={activeMenu === menuName}
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
