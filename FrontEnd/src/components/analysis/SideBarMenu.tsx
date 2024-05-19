import * as s from '@src/components/styles/analysis/SideBarMenuStyle'

interface PropsType {
  moveTo: (index: number) => void
}

const SideBarMenu = (props: PropsType) => {
  const { moveTo } = props

  return (
    <s.Container>
      <s.Top>
        <s.MenuItem onClick={() => moveTo(0)}>유동인구</s.MenuItem>
        <s.MenuItem onClick={() => moveTo(1)}>점포분석</s.MenuItem>
        <s.MenuItem onClick={() => moveTo(2)}>매출분석</s.MenuItem>
        <s.MenuItem onClick={() => moveTo(3)}>상주인구</s.MenuItem>
        <s.MenuItem onClick={() => moveTo(4)}>지출분석</s.MenuItem>
      </s.Top>
    </s.Container>
  )
}

export default SideBarMenu
