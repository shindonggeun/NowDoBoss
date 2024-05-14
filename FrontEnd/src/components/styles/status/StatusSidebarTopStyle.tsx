import styled from 'styled-components'

export const Container = styled.div``

export const HeaderContainer = styled.div`
  background-color: #0066ff;
  display: flex;
  flex-direction: column;
  border-radius: 5px 5px 0 0;
  padding: 15px 30px 10px 30px;
  min-height: 8vh;
  color: white;
`

export const HeaderTitle = styled.div`
  text-align: start;
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 5px;
`

export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
`

export const TabLists = styled.div`
  margin-top: 5px;
`

export const TabList = styled.div<{ selected: boolean }>`
  cursor: pointer;
  // border-bottom: 3px solid
  //   ${({ selected }) => (selected ? '#0066FF' : '#DFDFDF')};
  border-bottom: 3px solid
    ${({ selected }) => (selected ? '#0066FF' : '#white')};
  padding: 5px 15px;

  &:hover {
    transform: translateY(-2px);
  }
`

export const TopListContainer = styled.div`
  margin: 2vh 40px 1vh 40px;
`

export const SeparateLine = styled.div`
  background-color: #f4f4f4;
  height: 7px;
`

interface ItemProps {
  $islast: boolean
  index: number
}

export const Item = styled.div<ItemProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 1vh 0;
  padding-bottom: 5px;
  border-bottom: ${props => (props.$islast ? 'none' : '1px solid #ABC4E9')};
  font-size: 0.9rem;
  animation: fadeInItem 0.2s ease-in-out ${props => props.index * 0.1}s forwards;

  @keyframes fadeInItem {
    0% {
      opacity: 0;
      transform: translateY(20px);
      &:hover {
        transform: translateY(-5px);
        transition: transform 0.3s ease-in-out;
      }
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const HoverItem = styled.div`
  &:hover {
    transform: translateY(-3px);
    transition: transform 0.3s ease-in-out;
  }
`

export const ItemLeft = styled.div`
  display: flex;
  flex-direction: row;
  width: 100px;
  cursor: pointer;
`

export const ItemRight = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  min-width: 150px;
  justify-content: flex-end;
`

export const Rank = styled.div`
  min-width: 22px;
  text-align: end;
  margin-right: 10px;
`

export const Name = styled.div`
  font-weight: 600;
  text-align: left;
`

export const Traffic = styled.div`
  text-align: right;
  min-width: 80px;
`

interface RateType {
  $isup: boolean
}

export const Percent = styled.div<RateType>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 80px;
  color: ${props => (props.$isup ? '#FF0000' : '#0066FF')};
`

export const UpIcon = styled.img`
  width: 1rem;
`

export const DownIcon = styled.img`
  width: 1rem;
`
