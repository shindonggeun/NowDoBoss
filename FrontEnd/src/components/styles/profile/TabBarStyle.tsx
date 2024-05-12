import styled from 'styled-components'

interface TabItemPropsStyleType {
  $isActive: boolean
}

export const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  margin: 8px 0 50px;

  @media (max-width: 768px) {
    margin: 8px 0 30px;
  }
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
  }

  @media (max-width: 800px) {
    padding: 10px 5px;
  }

  @media (max-width: 768px) {
    padding: 10px 10px;
  }

  @media (max-width: 576px) {
    padding: 10px 5px;
    &:not(:first-child) {
      margin-left: 5px;
    }
  }
`
