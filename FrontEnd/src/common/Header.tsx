import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavigateType } from '@src/types/GlobalType'
// import LogoImg from '@src/assets/logo.svg'
import SlimLogoImg from '@src/assets/logo_slim.svg'
// import BlueLogoImg from '@src/assets/logo_blue.svg'
import styled from 'styled-components'
import HeaderDropdown from '@src/common/HeaderDropdown'
import LogoutContainer from '@src/containers/User/LogoutContainer'

const Container = styled.header`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: #c4c4c4 2px solid;
  // 상단 고정하기 위한 코드
  background-color: #fff;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

const MenuListLeft = styled.div<{ isMenuOpen?: boolean }>`
  display: flex;

  @media (max-width: 992px) {
    flex-direction: column;
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
  }
`

const MenuListRight = styled.div<{ isMenuOpen?: boolean }>`
  width: auto;
  display: flex;
  justify-content: right;
  margin: 0 0.5rem;

  @media (max-width: 992px) {
    flex-direction: column;
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
  }
`
const Menu = styled.div<{ $isActive?: boolean }>`
  height: 66px;
  padding: 0 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  border-bottom: 3px solid ${props => (props.$isActive ? '#236cff' : 'white')};
  color: ${props => (props.$isActive ? '#236cff' : 'black')};

  &:hover {
    color: #236cff;
    border-bottom: 3px solid #236cff;
  }

  @media (max-width: 1200px) {
    font-size: 14px;
    padding: 0 10px;
  }
`

const LogoDiv = styled.div``

const Logo = styled.img`
  scale: 0.7;
  margin: 7px 0 0 0;
  cursor: pointer;
`

const HamburgerMenu = styled.div`
  font-size: 60px;
  display: none;
  position: absolute;
  right: 0;

  @media (max-width: 992px) {
    display: block; // 화면 너비가 1200px 이하일 경우 햄버거 메뉴 표시
    justify-content: right;
    cursor: pointer;
    margin-right: 2vw;
  }
`
const DropdownMenu = styled.div`
  position: relative;
  top: 0;
  right: 0;

  margin-top: 176px;
  border-radius: 5px;
  width: 200px;
  height: 100px;
`

const BlankDiv = styled.div`
  flex-grow: 1;
`

const Header = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  // 로그인 상태 확인 (localStorage 사용)
  const userLoggedIn = localStorage.getItem('isLogIn') === 'true'

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const LocationData = [
    {
      name: '상권현황',
      location: '/status',
    },
    {
      name: '상권분석',
      location: '/analysis',
    },
    {
      name: '상권추천',
      location: '/recommend',
    },
    {
      name: '창업시뮬레이션',
      location: '/simulation',
    },
    {
      name: '커뮤니티',
      location: '/community/list',
    },
    {
      name: '마이페이지',
      location: '/mypage',
    },
    {
      name: '로그인',
      location: '/login',
    },
    {
      name: '회원가입',
      location: '/register',
    },
  ]

  // 경로에 따라 activeMenu 설정
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const activeItem = LocationData.find(
      item => item.location === location.pathname,
    )
    setActiveMenu(activeItem ? activeItem.name : null)
  }, [location.pathname])

  const handleMenuClick = (menuName: string) => {
    const menuItem = LocationData.find(item => item.name === menuName)
    if (menuItem) {
      navigate(menuItem.location)
    }
    setActiveMenu(menuName)
  }

  const goNavigate = ({ url }: NavigateType) => {
    navigate(url)
  }

  return (
    <Container>
      <LogoDiv onClick={() => goNavigate({ url: '/' })}>
        <Logo src={SlimLogoImg} alt="logo" />
      </LogoDiv>

      <BlankDiv />

      <MenuListLeft>
        {['상권현황', '상권분석', '상권추천', '창업시뮬레이션', '커뮤니티'].map(
          menuName => (
            <Menu
              key={menuName}
              $isActive={activeMenu === menuName}
              onClick={() => handleMenuClick(menuName)}
            >
              {menuName}
            </Menu>
          ),
        )}
      </MenuListLeft>

      <BlankDiv />

      <MenuListRight>
        {userLoggedIn ? (
          <>
            <Menu
              $isActive={activeMenu === '마이페이지'}
              onClick={() => handleMenuClick('마이페이지')}
            >
              마이페이지
            </Menu>
            <Menu>
              <LogoutContainer />
            </Menu>
          </>
        ) : (
          ['로그인', '회원가입'].map(menuName => (
            <Menu
              key={menuName}
              $isActive={activeMenu === menuName}
              onClick={() => handleMenuClick(menuName)}
            >
              {menuName}
            </Menu>
          ))
        )}
      </MenuListRight>

      <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>≡</HamburgerMenu>
      {menuOpen && (
        <DropdownMenu>
          <HeaderDropdown
            menuData={LocationData.filter(item =>
              userLoggedIn
                ? item.name !== '로그인' && item.name !== '회원가입'
                : item.name !== '마이페이지',
            )}
            isMenuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </DropdownMenu>
      )}
    </Container>
  )
}
export default Header
