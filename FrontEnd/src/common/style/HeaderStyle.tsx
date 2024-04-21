import styled from 'styled-components'

export const Container = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: #c4c4c4 2px solid;
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
export const Menu = styled.div<{ isActive?: boolean }>`
  height: 57px;
  padding: 0 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 4px solid ${({ isActive }) => (isActive ? 'blue' : 'white')};
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? 'blue' : 'black')};
`

export const Logo = styled.img`
  width: 120px;
  height: 55px;
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
