import * as r from '@src/components/styles/analysis/ResultIntroStyle'

const ResultIntro = () => {
  return (
    <r.IntroContainer>
      <r.IntroTitle>상권분석 결과입니다.</r.IntroTitle>
      <r.IntroDetails>
        <r.DetailItem>
          <r.DetailItemTitle>위치 :</r.DetailItemTitle>
          강남구 논현1동 학동근린공원
        </r.DetailItem>
        <r.DetailItem>
          <r.DetailItemTitle>업종 :</r.DetailItemTitle>
          음식점 - 한식음식점
        </r.DetailItem>
      </r.IntroDetails>
    </r.IntroContainer>
  )
}

export default ResultIntro
