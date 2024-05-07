import styled from 'styled-components'

export const ServiceDetailContainer = styled.div`
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`

export const ServiceDetailItem = styled.div<{ $isSelected: boolean }>`
  flex-basis: calc(25% - 5px);
  padding: 5px;
  box-sizing: border-box;
  border: ${props =>
    props.$isSelected ? ' 2px solid #415FEB' : '1px solid #b9b9b9'};
  box-shadow: ${props =>
    props.$isSelected ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'};
  border-radius: 8px;

  text-align: center;
  font-weight: 500;
  font-size: 0.8rem;

  color: ${props => (props.$isSelected ? ' white' : '#000000')};
  background-color: ${props =>
    props.$isSelected ? '#236CFF' : ' rgba(110, 110, 110, 0.1)'};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }
`

export const NoneMsg = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: #000000;
`
