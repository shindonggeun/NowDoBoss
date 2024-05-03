import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavigateType } from '@src/types/GlobalType'
// import LogoImg from '@src/assets/logo.svg'
import SlimLogoImg from '@src/assets/logo_slim.svg'
// import BlueLogoImg from '@src/assets/logo_blue.svg'
import styled from 'styled-components'
import HeaderDropdown from '@src/common/HeaderDropdown'

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

  useEffect(() => {
    // 경로에 따라 activeMenu 설정
    switch (location.pathname) {
      case LocationData[0].location:
        setActiveMenu(LocationData[0].name)
        break
      case LocationData[1].location:
        setActiveMenu(LocationData[1].name)
        break
      case LocationData[2].location:
        setActiveMenu(LocationData[2].name)
        break
      case LocationData[3].location:
        setActiveMenu(LocationData[3].name)
        break
      case LocationData[4].location:
        setActiveMenu(LocationData[4].name)
        break
      case LocationData[5].location:
        setActiveMenu(LocationData[5].name)
        break
      case LocationData[6].location:
        setActiveMenu(LocationData[6].name)
        break
      case LocationData[7].location:
        setActiveMenu(LocationData[7].name)
        break
      default:
        setActiveMenu(null)
    }
  }, [LocationData, location.pathname])

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName)
    if (menuName === LocationData[0].name) {
      navigate(LocationData[0].location)
    } else if (menuName === LocationData[1].name) {
      navigate(LocationData[1].location)
    } else if (menuName === LocationData[2].name) {
      navigate(LocationData[2].location)
    } else if (menuName === LocationData[3].name) {
      navigate(LocationData[3].location)
    } else if (menuName === LocationData[4].name) {
      navigate(LocationData[4].location)
    } else if (menuName === LocationData[5].name) {
      navigate(LocationData[5].location)
    } else if (menuName === LocationData[6].name) {
      navigate(LocationData[6].location)
    } else if (menuName === LocationData[7].name) {
      navigate(LocationData[7].location)
    }
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
        {['마이페이지', '로그인', '회원가입'].map(menuName => (
          <Menu
            key={menuName}
            $isActive={activeMenu === menuName}
            onClick={() => handleMenuClick(menuName)}
          >
            {menuName}
          </Menu>
        ))}
      </MenuListRight>
      <HamburgerMenu onClick={() => setMenuOpen(!menuOpen)}>≡</HamburgerMenu>
      {menuOpen && (
        <DropdownMenu>
          <HeaderDropdown
            menuData={LocationData}
            isMenuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </DropdownMenu>
      )}
    </Container>
  )
}
export default Header
