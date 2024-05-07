import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #236cff 10%, #92b1ff 90%);
`

export const SummaryContainer = styled.div`
  width: 36rem;
  min-height: 23rem;
  border-radius: 10px;
  background: white;
  @media (max-width: 768px) {
    width: 90vw;
    height: 40vh;
  }
`

export const SaveIcon = styled.img`
  width: 1.2rem;
  margin-right: 0.4rem;
`

export const CompareIcon = styled.img`
  width: 1.8rem;
`

export const LightIcon = styled.img`
  width: 3rem;
  position: relative;
  z-index: 1;
`

export const HeaderIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  margin-right: 1rem;
  cursor: pointer;
`

export const SummaryHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1.7rem 1rem;
  position: relative;
`

export const HighLight = styled.div`
  display: flex;
  align-items: center;
  width: 9rem;
  background-color: #fdffc7;
  font-size: 1.4rem;
  font-weight: 700;
  padding: 0.3rem 3rem;
  position: absolute;
  left: 1rem;
  z-index: 0;
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
  padding-left: 10vw;
`

export const BodyTopTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1b3fff;
`

export const BodyTopSubTitle = styled.div`
  font-size: 0.8rem;
  color: #808080;
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
`

export const BodyBottomLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const BodyBottomRight = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-left: 1px solid #e0e0e0;
  padding: 1rem 2rem;
`

export const BottomText = styled.div`
  margin: 0.3rem 0;
`
