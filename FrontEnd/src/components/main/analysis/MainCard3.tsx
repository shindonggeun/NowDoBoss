import * as a from '@src/containers/main/MainAnalysisContainerStyle'

const MainCard3 = () => {
  return (
    <a.BlueCard>
      <a.BlueCardTextDiv>
        <p>카테고리별 차트 분석</p>
        <h4>
          다양한 지표를 차트로 <br />
          시각화하여 <br />
          쉽게 이해할 수 있어요!
        </h4>
      </a.BlueCardTextDiv>
      <a.CardImgDiv>
        <a.ChartCardImg />
      </a.CardImgDiv>
    </a.BlueCard>
  )
}

export default MainCard3
