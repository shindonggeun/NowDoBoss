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
  width: 50%;
  background-color: #cccccc;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const CategoryChart = styled.div`
  width: 50%;
  background-color: #cccccc;

  @media (max-width: 576px) {
    width: 100%;
  }
`
