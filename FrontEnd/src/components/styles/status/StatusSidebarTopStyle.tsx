import styled from 'styled-components'

export const Container = styled.div`
  background-color: #0066ff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8vh;
  color: white;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
`

export const TopListContainer = styled.div`
  margin: 3vh 5vw 1vh 5vw;
`

interface ItemProps {
  isLast: boolean
}

export const Item = styled.div<ItemProps>`
  display: flex;
  flex-direction: row;
  text-align: center;
  margin: 1vh 0;
  padding-bottom: 5px;
  border-bottom: ${props => (props.isLast ? 'none' : '1px solid #ABC4E9')};
  font-size: 0.9rem;
`

export const ItemLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`

export const ItemRight = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const NarrowIcon = styled.img`
  width: 1rem;
  margin: 5px 10px;
  cursor: 'pointer';
`

export const Rank = styled.div`
  flex: 3;
`

export const Name = styled.div`
  flex: 5;
  font-weight: 600;
  text-align: left;
`

export const Traffic = styled.div`
  text-align: right;
`

interface RateType {
  isUp: boolean
}

export const Percent = styled.div<RateType>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 6vw;
  color: ${props => (props.isUp ? '#FF0000' : '#0066FF')};
`

export const UpIcon = styled.img`
  width: 1rem;
`

export const DownIcon = styled.img`
  width: 1rem;
`
