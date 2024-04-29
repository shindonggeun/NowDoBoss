import styled from 'styled-components'

export const FirstLowContainer = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  gap: 10px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`

export const TotalChart = styled.div`
  width: 55%;
  background-color: #cccccc;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const FirstRightWrap = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const FranchiseChart = styled.div`
  background-color: #cccccc;
  width: 100%;
`

export const StatusWrap = styled.div`
  display: flex;
  gap: 10px;
`

export const OpenChart = styled.div`
  width: 50%;
  background-color: #cccccc;
`

export const CloseChart = styled.div`
  width: 50%;
  background-color: #cccccc;
`
