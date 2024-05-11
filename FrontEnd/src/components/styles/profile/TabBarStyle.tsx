import styled from 'styled-components'

interface TabItemPropsStyleType {
  $isActive: boolean
}

export const Container = styled.div`
  display: flex;
  margin: 8px 0 24px;
  box-sizing: border-box;
`

export const TabItem = styled.div<TabItemPropsStyleType>`
  padding: 10px 10px;
  border-bottom: 3px solid
    ${props => (props.$isActive ? 'black' : 'transparent')};
  align-items: center;
  color: ${props => (props.$isActive ? '#040505' : '#adb3b8')};
  font-weight: ${props => (props.$isActive ? '500' : '400')};
  font-size: 14px;

  cursor: pointer;
  &:hover {
    background-color: #eaecee;
    border-radius: 5px;
  }

  @media (max-width: 800px) {
    padding: 10px 5px;
  }

  @media (max-width: 768px) {
    padding: 10px 10px;
  }

  @media (max-width: 576px) {
    padding: 10px 5px;
  }

  @media (max-width: 405px) {
    font-size: 12px;
    padding: 10px 3px;
  }
`
