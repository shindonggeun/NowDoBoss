import * as a from '@src/containers/main/MainAnalysisContainerStyle'

const MainCard4 = () => {
  return (
    <a.Card>
      <a.CardTextDiv>
        <p>상권 및 업종 종합 리포트</p>{' '}
        <h4>
          선택한 상권과 업종에 대한 <br />
          종합 리포트를 통해 <br />
          인사이트를 확보하세요!
        </h4>
      </a.CardTextDiv>
      <a.CardImgDiv>
        <a.Card4Img />
      </a.CardImgDiv>
    </a.Card>
  )
}

export default MainCard4
