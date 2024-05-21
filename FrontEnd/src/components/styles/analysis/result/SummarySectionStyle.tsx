import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 2vh;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 3%;
  }
`

export const SummaryWrap = styled.div`
  display: flex;
  box-sizing: border-box;
  gap: 1%;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`

export const FlowWrap = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const FlowCard = styled.div`
  display: flex;

  @media (max-width: 768px) {
    margin-bottom: 3%;
  }
`

export const TipTitle = styled.div`
  color: #333;
  font-size: 17px;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding-left: 10px;

  span {
    position: relative;
    color: #ed1c24;
  }
`

export const TipBox = styled.div`
  display: flex;

  @media (max-width: 768px) {
    margin-bottom: 3%;
  }
`

export const SalesCard = styled.div`
  display: flex;
  flex: 4;
`
