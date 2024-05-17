import * as c from '@src/containers/main/MainStausContainerStyle'
import MainBarChart from '@src/common/MainBarChart'
import ContainerBox from '@src/common/ContainerBox'
import Thunder from '@src/assets/ThunderIcon.svg'

const MainCard1 = () => {
  return (
    <div>
      <c.SlideList>
        <c.Card>
          <c.HeaderText>점포당 매출규모</c.HeaderText>
          <c.TitleText>월평균 2,123만원</c.TitleText>
          <c.AlignCenter>
            <c.Icon src={Thunder} $width={15} />
            <c.SubTitleText>204만원 감소</c.SubTitleText>
          </c.AlignCenter>
          <ContainerBox height={100} />
          <MainBarChart
            labels={['', '', '', '', '', '', '']}
            values={[10, 20, 30, 45, 60, 45, 20]}
          />
        </c.Card>
      </c.SlideList>
    </div>
  )
}

export default MainCard1
