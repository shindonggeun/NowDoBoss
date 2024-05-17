import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavigateType } from '@src/types/GlobalType'
// import LogoImg from '@src/assets/logo.svg'
import SlimLogoImg from '@src/assets/logo_slim.svg'
// import BlueLogoImg from '@src/assets/logo_blue.svg'
import styled from 'styled-components'
import HeaderDropdown from '@src/common/HeaderDropdown'
import LogoutContainer from '@src/containers/User/LogoutContainer'
import useCommunityStore from '@src/stores/communityStore'
import useSelectPlaceStore from '@src/stores/selectPlaceStore'

import three_line from '@src/assets/three_line.svg'
import three_line_gray from '@src/assets/three_line_gray.svg'
import analysisStore from '@src/stores/analysisStore'

const Container = styled.header<{ $isTransparent: boolean; $isMain: boolean }>`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => (props.$isMain ? '' : '#c4c4c4 1px solid')};
  // 상단 고정하기 위한 코드
  background-color: ${props => (props.$isMain ? 'transparent' : '#fff')};
  //background-color: #ffffff;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-inline: 3vw;
  opacity: ${props => (props.$isTransparent ? 1 : 0)};
  pointer-events: ${props => (props.$isTransparent ? 'auto' : 'none')};
  transition:
    opacity 0.3s,
    background-color 0.3s;
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

const Menu = styled.div<{
  $isActive?: boolean
  $isMain?: boolean
  $atTop?: boolean
}>`
  height: 66px;
  padding: 0 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;

  ${props => {
    const isWhite = props.$isMain && props.$atTop ? 'white' : '#236cff'
    const borderBottomColor = props.$isActive ? isWhite : 'none'
    const textColor = props.$isActive
      ? isWhite
      : props.$isMain && props.$atTop
        ? 'white'
        : 'black'

    return `
      border-bottom: 2px solid ${borderBottomColor};
      color: ${textColor};
    `
  }}

  &:hover {
    color: ${props => (props.$isMain && props.$atTop ? 'white' : '#236cff')};
    border-bottom: 2px solid
      ${props => (props.$isMain && props.$atTop ? 'white' : '#236cff')};
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

  // 스크롤 내렸을 때 사라지게 하는 로직
  const [isTransparent, setIsTransparent] = useState<boolean>(true)
  const [isMain, setIsMain] = useState<boolean>(false)
  const [atTop, setAtTop] = useState<boolean>(true)
  const [lastScrollY, setLastScrollY] = useState<number>(0)

  // 현재 스크롤과 이전 스크롤 상태 비교해서 올림, 내림 스크롤 판단하는 로직
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    // 맨 위인지?
    setAtTop(currentScrollY === 0)
    if (currentScrollY > lastScrollY) {
      setIsTransparent(false)
    } else {
      setIsTransparent(true)
    }
    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll, lastScrollY])

  // 상권 분석이나 상권 추천 페이지 이동 시 드롭다운 데이터 초기화 하기 위한 store
  const { setSelectedGoo, setSelectedDong, setSelectedCommercial } =
    useSelectPlaceStore(state => ({
      setSelectedGoo: state.setSelectedGoo,
      setSelectedDong: state.setSelectedDong,
      setSelectedCommercial: state.setSelectedCommercial,
    }))

  // 상권 분석 페이지 이동 시 드롭다운 데이터 초기화 하기 위한 store
  const { setSelectedServiceType } = analysisStore(state => ({
    setSelectedServiceType: state.setSelectedServiceType,
  }))

  // 메인 페이지에서만 투명한 배경 설정
  useEffect(() => {
    if (location.pathname === '/') {
      setIsMain(true)
    } else if (
      location.pathname === '/analysis' ||
      location.pathname === '/recommend'
    ) {
      setSelectedGoo({ name: '행정구', code: 0 })
      setSelectedDong({ name: '행정동', code: 0 })
      setSelectedCommercial({ name: '상권', code: 0 })
      setSelectedServiceType('')
      setIsMain(false)
    } else {
      setIsMain(false)
    }
  }, [
    location.pathname,
    setSelectedCommercial,
    setSelectedDong,
    setSelectedGoo,
    setSelectedServiceType,
  ])

  // 로그인 상태 확인 (localStorage 사용)
  const userLoggedIn = localStorage.getItem('isLogIn') === 'true'

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
    // {
    //   name: '창업시뮬레이션',
    //   location: '/simulation',
    // },
    {
      name: '커뮤니티',
      location: '/community/list',
    },
    {
      name: '채팅',
      location: '/chatting/list',
    },
    {
      name: '프로필',
      location: '/profile/bookmarks',
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

  const { setSelectedCategory } = useCommunityStore(state => ({
    setSelectedCategory: state.setSelectedCategory,
  }))

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
      // 커뮤니티를 클릭했을 때 selectedCategory 설정
      if (menuName === '커뮤니티') {
        setSelectedCategory({
          name: '전체보기',
          value: '',
          iconActive: three_line,
          iconInactive: three_line_gray,
        })
      }
    }
    setActiveMenu(menuName)
  }

  const goNavigate = ({ url }: NavigateType) => {
    navigate(url)
  }

  return (
    <Container $isTransparent={isTransparent} $isMain={isMain}>
      <LogoDiv onClick={() => goNavigate({ url: '/' })}>
        <Logo src={SlimLogoImg} alt="logo" />
      </LogoDiv>

      <MenuListLeft>
        {['상권현황', '상권분석', '상권추천', '커뮤니티'].map(menuName => (
          <Menu
            key={menuName}
            $isActive={activeMenu === menuName}
            $isMain={isMain}
            $atTop={atTop}
            onClick={() => handleMenuClick(menuName)}
          >
            {menuName}
          </Menu>
        ))}
      </MenuListLeft>

      <BlankDiv />
      <BlankDiv />

      <MenuListRight>
        {userLoggedIn ? (
          <>
            <Menu
              $isActive={activeMenu === '채팅'}
              $isMain={isMain}
              $atTop={atTop}
              onClick={() => handleMenuClick('채팅')}
            >
              채팅
            </Menu>
            <Menu
              $isActive={activeMenu === '프로필'}
              $isMain={isMain}
              $atTop={atTop}
              onClick={() => handleMenuClick('프로필')}
            >
              프로필
            </Menu>
            <Menu $isMain={isMain} $atTop={atTop}>
              <LogoutContainer />
            </Menu>
          </>
        ) : (
          ['로그인', '회원가입'].map(menuName => (
            <Menu
              key={menuName}
              $isActive={activeMenu === menuName}
              $isMain={isMain}
              $atTop={atTop}
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
                : item.name !== '프로필',
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
