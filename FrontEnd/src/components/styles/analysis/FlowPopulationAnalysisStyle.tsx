import styled from 'styled-components'

export const FirstLowContainer = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`

export const TodayChart = styled.div`
  width: 55%;
  background-color: #cccccc;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const WeekChart = styled.div`
  width: 45%;
  background-color: #cccccc;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const SecondLowContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  display: flex;
  gap: 10px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`

export const AgeChart = styled.div`
  width: 35%;
  background-color: #cccccc;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const TimeChart = styled.div`
  width: 65%;
  background-color: #cccccc;

  @media (max-width: 576px) {
    width: 100%;
  }
`
