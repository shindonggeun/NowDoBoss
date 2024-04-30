import * as s from '@src/components/styles/analysis/SideBarMenuStyle'

const SideBarMenu = () => {
  return (
    <s.SidebarContainer>
      <s.MenuItem>유동인구</s.MenuItem>
      <s.MenuItem>집객시설</s.MenuItem>
      <s.MenuItem>점포 수</s.MenuItem>
      <s.MenuItem>매출분석</s.MenuItem>
      <s.MenuItem>임대료</s.MenuItem>
      <s.MenuItem>상주인구</s.MenuItem>
      <s.MenuItem>지출내역</s.MenuItem>
    </s.SidebarContainer>
  )
}

export default SideBarMenu
