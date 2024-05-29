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
  min-width: 100px;
  margin: 0 auto;

  @media (max-width: 30rem) {
    flex: 1;
    width: 90vw;
  }
`

export const MixInnerConatiner2 = styled.div`
  flex: 1;
  width: 17rem;
  margin: 0 auto 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 30rem) {
    flex: 1;
    width: 90vw;
  }
`

export const AnalysisText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #5057ff;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-bottom: 3px solid #707070;
`

export const AnalysisTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: #222222;
  margin-top: 2rem;
  margin-bottom: 3px;
`

export const AnalysisSubTitle = styled.div`
  font-size: 0.9rem;
  margin-bottom: 2rem;
  color: #6a6a6a;
`

export const AnalysiEemphasis = styled.span`
  color: #5057ff;
  font-weight: 600;
`

export const AnalysisContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  margin: 0.3rem 0;
`

export const AnalysisRank = styled.div`
  width: 1.2rem;
  font-size: 14px;
`

export const AnalysisData = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 14px;
`

export const AnalysisDataLeft = styled.div`
  display: flex;
  flex-direction: row;
`

export const AnalysisDataRate = styled.div<{ $isup: boolean }>`
  color: ${({ $isup }) => ($isup ? '#FF0000' : '#0066FF')};
`

export const AnalysisDataIcon = styled.img`
  width: 1rem;
`

export const SummaryContainer = styled.div`
  margin: 1rem 0;
`

export const SummaryTitle = styled.div`
  font-size: 1.2rem;
  color: #6a6a6a;
  margin-bottom: 1.1rem;
`

export const SummaryTitleEmphasis = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: #5057ff;
`

export const SummaryEmphasis = styled.span`
  color: #5057ff;
  font-weight: 510;
`

export const SummaryTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`

export const SummaryList = styled.div`
  font-size: 1rem;
  color: #6a6a6a;
  margin: 5px 0;
`

export const DotIcon = styled.img`
  width: 1rem;
`

// 간단요약
export const SumContainer = styled.div`
  margin: 20px 0;
`
