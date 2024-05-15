import styled from 'styled-components'

export const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  text-align: end;
  gap: 20px;
`

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const BodyContainerLeft = styled.div`
  min-width: 50px;
`

export const BodyContainerRight = styled.div`
  flex: 1;
`

export const BodyContainerText = styled.div`
  padding-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`

export const TextCenter = styled.div`
  text-align: center;
  margin: 0 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
