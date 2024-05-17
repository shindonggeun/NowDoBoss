import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export const Main = styled.div`
  height: calc(100vh);
  position: relative;
  display: flex;
  padding: 5% 0 5% 2%;
  background-color: #fcfdff;
`

export const InnerBox = styled.div`
  margin: 0 auto;
  width: 1200px;
  height: 600px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`

export const TextDiv = styled.div`
  box-sizing: border-box;
  width: 50%;
  display: flex;
  flex-direction: column;
`

export const TextWrap = styled.div`
  width: 100%;
  box-sizing: border-box;
`

export const BlueText = styled.div`
  color: #336dd3;
  margin-bottom: 12px;
  font-size: 1.25rem;
`

export const MainText = styled.div`
  color: #191f28;
  margin-bottom: 16px;
  font-size: 2.5rem;
  font-weight: 700;
  word-break: keep-all;
  line-height: 140%;
`

export const SubText = styled.p`
  color: #606d85;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 160%;
  margin-bottom: 40px;
`

export const TextStopBtn = styled.div`
  width: 17px;
  height: 17px;
  box-sizing: border-box;
  background: url('/icons/pause.png') no-repeat center center / 17px 17px;
`

export const ImgBox = styled.div`
  width: 50%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-direction: row;
`
export const Fix = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`

export const Rel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`

export const BoxWrap = styled.div`
  position: absolute;
  width: 1200px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
`

// 슬라이더
export const CardWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 100%;
  overflow-y: hidden;
  /* position: absolute; */
  cursor: default;
  box-shadow: 0 0 42px rgb(134 171 224 / 10%);

  @keyframes infiniteAnimation1 {
    0% {
      transform: translateY(0%);
    }
    50% {
      transform: translateY(-100%);
    }
    50.1% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  @keyframes infiniteAnimation2 {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-200%);
    }
  }

  @keyframes infiniteAnimation3 {
    0% {
      transform: translateY(0%);
    }
    50% {
      transform: translateY(100%);
    }
    50.1% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0%);
    }
  }

  @keyframes infiniteAnimation4 {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(200%);
    }
  }
`

export const OriginalCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  animation: 25s linear infinite normal none running infiniteAnimation1;
`

export const CloneCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  animation: 25s linear infinite normal none running infiniteAnimation2;
`

export const DescOriginalCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  animation: 25s linear infinite normal none running infiniteAnimation3;
`

export const DescCloneCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  animation: 25s linear infinite normal none running infiniteAnimation4;
`

export const Card = styled.div`
  width: 100%;
  height: 400px !important;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 14px;
  box-shadow: 0 0 42px rgb(134 171 224 / 10%);
`

export const CardTextDiv = styled.div`
  padding: 32px 28px;
  box-sizing: border-box;
  border: 0;

  p {
    color: #1f65fd;
    font-weight: 400;
    font-size: 1.125rem;
    margin-bottom: 8px;
    word-break: keep-all;
  }

  h4 {
    color: #404040;
    font-weight: 700;
    font-size: 1.4rem;
    word-break: keep-all;
  }
`

export const CardImgDiv = styled.div`
  box-sizing: border-box;
  border: 0;
`

export const CardImg = styled.div`
  background: url('/images/loctation.png') no-repeat 50% 50% / contain;
  height: 200px;
  box-sizing: border-box;
`

export const Sub = styled.div`
  height: calc(100vh);
  position: relative;
  display: flex;
  padding: 5% 1%;
  background-color: #fcfdff;
`

export const SubSub = styled.div`
  height: calc(100vh);
  position: relative;
  display: flex;
  padding: 5% 1%;
  background-color: #f0f5ff;
`

export const SubInnerBox = styled.div`
  margin: 0 11%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

export const ContentDiv = styled.div`
  flex: 3;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  transition:
    transform 0.4s ease 0s,
    opacity 0.5s ease 0s;

  h2 {
    font-weight: 700;
    font-size: 3.1rem;
    line-height: 4.1rem;
    margin-bottom: 40px;
  }

  p {
    font-weight: 400;
    font-size: 1.3rem;
    line-height: 2.15rem;
    margin-bottom: 12px;
  }
`

export const ImgDiv = styled.div`
  flex: 2;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
`

export const ChartImgDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`

export const MapImgDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`
