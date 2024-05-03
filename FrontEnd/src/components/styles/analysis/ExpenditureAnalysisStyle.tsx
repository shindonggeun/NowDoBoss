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

export const TotalCard = styled.div`
  width: 50%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const CategoryCard = styled.div`
  width: 50%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;

  @media (max-width: 576px) {
    width: 100%;
  }
`

export const ChartTitle = styled.div`
  font-size: 0.8rem;
`

export const ChartSubTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 10px;
`
