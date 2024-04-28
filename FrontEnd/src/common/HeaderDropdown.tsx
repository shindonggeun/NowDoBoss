import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const DropdownBox = styled.div`
  position: absolute;
  right: 0;
  width: 100%;
  border: 0.15rem solid #d9d9d9;
  border-radius: 5px;
`
const DropdownContent = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #5f5f5f;
  cursor: pointer;

  &:hover {
    background-color: #d9d9d9;
    border-radius: 3px;
  }
`

type HeaderDropdownPropsType = {
  menuData: { name: string; location: string }[]
  isMenuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderDropdown = (props: HeaderDropdownPropsType) => {
  const { menuData, isMenuOpen, setMenuOpen } = props
  const navigate = useNavigate()

  // 드롭다운 열었을 때 다른 곳 눌러도 드롭다운 닫히게 하는 ref
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // 드롭다운 열었을 때 외부 클릭 시 드롭다운 닫히게 하는 로직
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    // 드롭다운이 열려있을 때만 이벤트 리스너 추가
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    // 컴포넌트 언마운트 혹은 드롭다운이 닫힐 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, setMenuOpen]) // 드롭다운 상태 변경 시 useEffect 재실행

  return (
    <DropdownBox ref={dropdownRef}>
      {menuData.map(locate => (
        <DropdownContent
          key={locate.name}
          onClick={() => {
            navigate(locate.location)
            setMenuOpen(false)
          }}
        >
          {locate.name}
        </DropdownContent>
      ))}
    </DropdownBox>
  )
}

export default HeaderDropdown
