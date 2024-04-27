import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavigateType } from '@src/types/GlobalType'
import LogoImg from '@src/assets/logo.svg'
import styled from 'styled-components'

const Container = styled.header`
  height: 61px;
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
  margin: 0 1rem;

  @media (max-width: 992px) {
    flex-direction: column;
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
  }
`

const MenuListRight = styled.div<{ isMenuOpen?: boolean }>`
  width: 420px;
  display: flex;
  justify-content: right;
  margin: 0 1rem;

  @media (max-width: 992px) {
    flex-direction: column;
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
  }
`
const Menu = styled.div<{ $isActive?: boolean }>`
  height: 57px;
  padding: 0 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  border-bottom: 4px solid ${props => (props.$isActive ? 'blue' : 'white')};
  color: ${props => (props.$isActive ? 'blue' : 'black')};
  &:hover {
    color: blue;
    border-bottom: 4px solid blue;
  }

  @media (max-width: 1200px) {
    font-size: 14px;
    padding: 0 10px;
  }
`

const LogoDiv = styled.div``

const Logo = styled.img`
  width: 110px;
  height: 55px;
  margin: 7px 0 0 0;
  cursor: pointer;
  @media (max-width: 1200px) {
    scale: 0.9;
  }
`

const HamburgerMenu = styled.div`
  font-size: 60px;
  display: none;

  @media (max-width: 992px) {
    display: block; // 화면 너비가 1200px 이하일 경우 햄버거 메뉴 표시
    justify-content: right;
    cursor: pointer;
    margin-right: 2vw;
  }
`

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
      navigate('/recommend')
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
    <Container>
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
      <LogoDiv onClick={() => goNavigate({ url: '/' })}>
        <Logo src={LogoImg} alt="logo" />
      </LogoDiv>
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
      <HamburgerMenu>≡</HamburgerMenu>
    </Container>
  )
}
export default Header
