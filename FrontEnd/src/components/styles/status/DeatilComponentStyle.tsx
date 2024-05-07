import styled from 'styled-components'

export const MixConatiner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 30rem) {
    flex-direction: column;
  }
`

export const MixInnerConatiner = styled.div`
  flex: 1;
  width: 17rem;
  margin: 0 auto;

  @media (max-width: 30rem) {
    flex: 1;
    width: 90vw;
  }
`

export const AnalysisTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #222222;
  margin-top: 2rem;
  margin-bottom: 3px;
`

export const AnalysisSubTitle = styled.div`
  font-size: 15px;
  margin-bottom: 2rem;
  color: #6a6a6a;
`

export const AnalysiEemphasis = styled.span`
  color: blue;
`
