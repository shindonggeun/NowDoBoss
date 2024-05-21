import * as a from '@src/containers/main/MainAnalysisContainerStyle'
import MainCard1 from '@src/components/main/analysis/MainCard1'
import MainCard2 from '@src/components/main/analysis/MainCard2'
import MainCard3 from '@src/components/main/analysis/MainCard3'
import MainCard4 from '@src/components/main/analysis/MainCard4'

const MainAnalysisContainer = () => {
  return (
    <a.Container>
      <a.Main>
        <a.TextDiv>
          <a.TextWrap>
            <a.BlueText>Market Analysis Report</a.BlueText>
            <a.MainText>상권분석 리포트</a.MainText>
            <a.SubText>
              인구분석부터 매출정보까지, 핵심 정보를 한눈에!
              <br />
              지금 바로 당신의 비즈니스를 위한
              <br />
              최적의 상권을 발견하세요.
              <br />
            </a.SubText>
          </a.TextWrap>
        </a.TextDiv>
        <a.ImgBox>
          <a.CardWrap>
            <a.OriginalCardDiv>
              <MainCard1 />
              <MainCard2 />
              <MainCard4 />
              <MainCard3 />
            </a.OriginalCardDiv>
            <a.CloneCardDiv>
              <MainCard1 />
              <MainCard2 />
              <MainCard4 />
              <MainCard3 />
            </a.CloneCardDiv>
          </a.CardWrap>

          <a.CardWrap>
            <a.DescOriginalCardDiv>
              <MainCard1 />
              <MainCard2 />
              <MainCard4 />
              <MainCard3 />
            </a.DescOriginalCardDiv>
            <a.DescCloneCardDiv>
              <MainCard1 />
              <MainCard2 />
              <MainCard4 />
              <MainCard3 />
            </a.DescCloneCardDiv>
          </a.CardWrap>
        </a.ImgBox>
      </a.Main>
      {/* <a.Sub> */}
      {/*  <a.SubInnerBox> */}
      {/*    <a.ContentDiv> */}
      {/*      <div> */}
      {/*        <h2> */}
      {/*          상권의 동향을 <br /> */}
      {/*          한눈에 파악하세요. <br /> */}
      {/*        </h2> */}
      {/*        <p> */}
      {/*          차트 분석을 통해 시장 트렌드를 정확히 이해하고, <br /> */}
      {/*          경쟁 우위에 있는 위치를 발견해보세요. */}
      {/*        </p> */}
      {/*      </div> */}
      {/*    </a.ContentDiv> */}
      {/*    <a.ImgDiv> */}
      {/*      <a.ChartImgDiv> */}
      {/*        <img src="/gifs/charts.gif" alt="charts" /> */}
      {/*      </a.ChartImgDiv> */}
      {/*    </a.ImgDiv> */}
      {/*  </a.SubInnerBox> */}
      {/* </a.Sub> */}
    </a.Container>
  )
}
export default MainAnalysisContainer
