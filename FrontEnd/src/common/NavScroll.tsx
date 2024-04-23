import { useEffect, useRef, useState } from 'react'

const DETAIL_NAV = [
  { idx: 0, name: '후기' },
  { idx: 1, name: '클래스 소개' },
  { idx: 2, name: '커리큘럼' },
  { idx: 3, name: '크리에이터' },
  { idx: 4, name: '커뮤니티' },
  { idx: 5, name: '환불 정책' },
  { idx: 6, name: '추천' },
]

const NavBtn = styled.button`
  &.active {
    border-color: ${theme.black};
    color: ${theme.black};
    font-weight: bold;
  }
`

const NavScroll = ({ scrollRef }: any) => {
  const [navIndex, setNavIndex] = useState(null)
  const navRef = useRef([]) // 이동할 각각의 컴포넌트에 대응하는 목차 버튼을 저장할 ref 배열

  useEffect(() => {
    // { behavior: 'smooth' }속성을 주면 스크롤이 스르륵~ 올라가거나 내려가면서 이동하고, 없으면 아무 애니메이션 없이 바로 목적지를 보여준다.
    scrollRef.current[navIndex]?.scrollIntoView({ behavior: 'smooth' })
    setNavIndex(null)
  }, [scrollRef, navIndex])

  // 현재 스크롤 위치에 따라 NavBar 버튼 스타일이 바뀌도록 클래스명을 지정한다.
  useEffect(() => {
    const changeNavBtnStyle = () => {
      scrollRef.current.forEach((ref, idx) => {
        if (ref.offsetTop - 180 < window.scrollY) {
          navRef.current.forEach(ref => {
            ref.className = ref.className.replace(' active', '')
          })

          navRef.current[idx].className += ' active'
        }
      })
    }

    window.addEventListener('scroll', changeNavBtnStyle)

    return () => {
      window.removeEventListener('scroll', changeNavBtnStyle)
    }
  }, [scrollRef])

  return (
    <nav>
      {DETAIL_NAV.map(({ idx, name }) => (
        <NavBtn
          key={idx}
          ref={ref => (navRef.current[idx] = ref)}
          onClick={() => {
            setNavIndex(idx)
          }}
        >
          {name}
        </NavBtn>
      ))}
    </nav>
  )
}

export default NavScroll
