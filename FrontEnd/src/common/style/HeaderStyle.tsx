import styled from 'styled-components'

export const Container = styled.header`
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

export const MenuListLeft = styled.div<{ isMenuOpen?: boolean }>`
  display: flex;
  margin: 0 1rem;

  @media (max-width: 1050px) {
    flex-direction: column;
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
  }
`

export const MenuListRight = styled.div<{ isMenuOpen?: boolean }>`
  width: 420px;
  display: flex;
  justify-content: right;
  margin: 0 1rem;

  @media (max-width: 1050px) {
    flex-direction: column;
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
  }
`
export const Menu = styled.div<{ $isActive?: boolean }>`
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
`

export const LogoDiv = styled.div``

export const Logo = styled.img`
  width: 110px;
  height: 55px;
  margin: 7px 0 0 0;
  cursor: pointer;
`

export const HamburgerMenu = styled.div`
  font-size: 60px;
  display: none;

  @media (max-width: 1050px) {
    display: block; // 화면 너비가 1200px 이하일 경우 햄버거 메뉴 표시
    justify-content: right;
    cursor: pointer;
  }
`
