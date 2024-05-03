import * as s from '@src/components/styles/analysis/SideBarMenuStyle'

interface PropsType {
  moveTo: (index: number) => void
}

const SideBarMenu = (props: PropsType) => {
  const { moveTo } = props
  // const [barPosition, setBarPosition] = useState(600)
  //
  // const handleScroll = () => {
  //   const position = 600 + window.scrollY > 956 ? 956 : 600 + window.scrollY
  //   setBarPosition(position)
  // }
  //
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)
  //
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])

  return (
    <s.SidebarContainer>
      <s.MenuItem onClick={() => moveTo(0)}>유동인구</s.MenuItem>
      <s.MenuItem onClick={() => moveTo(1)}>집객시설</s.MenuItem>
      <s.MenuItem onClick={() => moveTo(2)}>점포 수</s.MenuItem>
      <s.MenuItem onClick={() => moveTo(3)}>매출분석</s.MenuItem>
      <s.MenuItem onClick={() => moveTo(4)}>임대료</s.MenuItem>
      <s.MenuItem onClick={() => moveTo(5)}>상주인구</s.MenuItem>
      <s.MenuItem onClick={() => moveTo(6)}>지출내역</s.MenuItem>
    </s.SidebarContainer>
  )
}

export default SideBarMenu
