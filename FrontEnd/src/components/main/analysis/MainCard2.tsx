import * as a from '@src/containers/main/MainAnalysisContainerStyle'

const MainCard2 = () => {
  return (
    <a.BlueCard>
      <a.BlueCardTextDiv>
        <p>간편한 요약 정보</p>
        <h4>
          복잡한 데이터를 <br />
          한눈에 이해할 수 있는 <br />
          요약 정보를 제공해요.
        </h4>
      </a.BlueCardTextDiv>
      <a.CardImgDiv>
        <a.SpeakerCardImg />
      </a.CardImgDiv>
    </a.BlueCard>
  )
}

export default MainCard2
