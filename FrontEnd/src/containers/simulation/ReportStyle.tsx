import styled from 'styled-components'

export const Container = styled.div`
  width: 100.3%;
  //min-height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #236cff 10%, #92b1ff 90%);
`

export const SummaryContainer = styled.div`
  width: 100%;
  margin: 0 2vw 1rem 2vw;
  min-height: 16rem;
  border-radius: 5px;
  background: white;

  @media (max-width: 768px) {
    margin: 0 15px 1rem 15px;
  }
`

export const SaveIcon = styled.img`
  width: 1.2rem;
  margin-right: 0.4rem;
  margin-left: 10px;
  @media (max-width: 768px) {
    width: 1rem;
  }
`

export const CompareIcon = styled.img`
  width: 1.8rem;
  margin-left: 10px;
  @media (max-width: 768px) {
    width: 1.5rem;
    margin-left: 7px;
  }
`

export const LightIcon = styled.img`
  width: 3rem;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    width: 2rem;
  }
`

export const HeaderIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
`

export const KakaoIcon = styled.img`
  width: 1.5rem;
  margin-right: 0.4rem;

  @media (max-width: 768px) {
    width: 1.2rem;
  }
`

export const SummaryHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1.5rem 1rem 1rem 1rem;
  position: relative;

  @media (max-width: 768px) {
    margin: 25px 20px 10px 20px;
  }
`

export const HighLight = styled.div`
  display: flex;
  align-items: center;
  min-width: 10rem;
  background-color: #fdffc7;
  font-size: 1.4rem;
  font-weight: 700;
  padding: 0.3rem 3rem;
  position: absolute;
  left: 1rem;
  z-index: 0;

  @media (max-width: 768px) {
    width: 7rem;
    padding: 0.3rem 2rem;
    font-size: 1rem;
    left: 10px;
  }
`

export const SummaryBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const BodyTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 4rem;

  @media (max-width: 768px) {
    padding-left: 20px;
  }
`

export const BodyTopTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1b3fff;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`

export const BodyTopSubTitle = styled.div`
  margin-right: 5vw;
  font-size: 0.8rem;
  color: #808080;
  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`

export const SplitLine = styled.div`
  width: 90%;
  height: 1px;
  margin-top: 1rem;
  background-color: #e0e0e0;
`

export const BodyBottom = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`

export const BodyBottomLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0 15px 0;
`

export const BodyBottomRight = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-left: 1px solid #e0e0e0;
  padding: 10px 2rem 15px 2rem;
`

export const BottomText = styled.div`
  margin: 0.3rem 0;
`
