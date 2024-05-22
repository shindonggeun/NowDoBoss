import * as s from '@src/components/styles/analysis/result/SideBarMenuStyle'

interface PropsType {
  moveTo: (index: number) => void
}

const SideBarMenu = (props: PropsType) => {
  const { moveTo } = props

  return (
    <s.Container>
      <s.MenuItem onClick={() => moveTo(0)}>종합요약</s.MenuItem>
      <s.MenuItem onClick={() => moveTo(1)}>유동인구</s.MenuItem>
      <s.MenuItem onClick={() => moveTo(2)}>점포분석</s.MenuItem>
      <s.MenuItem onClick={() => moveTo(3)}>매출분석</s.MenuItem>
      <s.MenuItem onClick={() => moveTo(4)}>상주인구</s.MenuItem>
      <s.MenuItem onClick={() => moveTo(5)}>지출분석</s.MenuItem>
    </s.Container>
  )
}

export default SideBarMenu
