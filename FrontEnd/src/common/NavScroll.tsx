// import { useEffect, useRef, useState, MutableRefObject } from 'react'
//
// const NavList: string[] = [
//   '유동인구',
//   '점포수',
//   '개업률',
//   '폐업률',
//   '매출분석',
//   '상권변화',
// ]
//
// const NavBtn = styled.button`
//   &.active {
//     border-color: ${theme.black};
//     color: ${theme.black};
//     font-weight: bold;
//   }
// `
// interface NavScrollProps {
//   scrollRef: MutableRefObject<HTMLElement[]>
// }
//
// const NavScroll = ({ scrollRef }: NavScrollProps) => {
//   const [activeMenu, setActiveMenu] = useState<boolean>(false)
//   const [navIndex, setNavIndex] = useState(null)
//   const navRef = useRef([]) // 이동할 각각의 컴포넌트에 대응하는 목차 버튼을 저장할 ref 배열
//
//   useEffect(() => {
//     if (navIndex !== null) {
//       scrollRef.current[navIndex]?.scrollIntoView({ behavior: 'smooth' })
//       setNavIndex(null)
//     }
//   }, [scrollRef, navIndex])
//
//   // 현재 스크롤 위치에 따라 NavBar 버튼 스타일이 바뀌도록 클래스명을 지정한다.
//   useEffect(() => {
//     const changeNavBtnStyle = () => {
//       scrollRef.current.forEach((ref, idx) => {
//         if (ref.offsetTop - 180 < window.scrollY) {
//           navRef.current.forEach(btnRef => {
//             btnRef.className = btnRef.className.replace(' active', '')
//           })
//
//           navRef.current[idx].className += ' active'
//         }
//       })
//     }
//
//     window.addEventListener('scroll', changeNavBtnStyle)
//
//     return () => {
//       window.removeEventListener('scroll', changeNavBtnStyle)
//     }
//   }, [scrollRef])
//
//   return (
//     <nav>
//       {NavList.map((name, i) => (
//         <NavBtn
//           key={i}
//           ref={ref => (navRef.current[i] = ref)}
//           onClick={() => {
//             setNavIndex(i)
//           }}
//         >
//           {name}
//         </NavBtn>
//       ))}
//     </nav>
//   )
// }
//
// export default NavScroll
