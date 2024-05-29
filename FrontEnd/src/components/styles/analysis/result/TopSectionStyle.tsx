import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 76px;
  padding: 20px 24px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 576px) {
    padding: 2%;
  }
`

export const TitleDiv = styled.div`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  align-items: center;
`

export const Title = styled.div`
  color: #191f28;
  font-size: 22px;
  font-weight: 700;
  line-height: 36px;
  margin-right: 12px;
`

export const Divider = styled.span`
  font-size: 22px;
  font-weight: 200;
  color: #4e5867;
  margin-right: 12px;
`

export const CloseButton = styled.div`
  color: #333;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:active {
    background-color: #ff4d4f;
  }
`
