import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 68px);
`

export const HeaderContainer = styled.div`
  background-color: #0066ff;
  display: flex;
  flex-direction: column;
  border-radius: 5px 5px 0 0;
  padding: 10px 10px 5px 20px;
  height: 75px;
  color: white;

  @media only screen and (max-width: 550px) {
    height: 55px;
  }
`

export const HeaderTitle = styled.div`
  text-align: start;
  font-weight: 500;
  font-size: 1.4rem;

  @media only screen and (max-width: 992px) {
    font-size: 1.3rem;
  }
  @media only screen and (max-width: 550px) {
    font-size: 1rem;
  }
`

export const HeaderSubTitle = styled.div`
  font-size: 0.9rem;
  padding-bottom: 3px;

  @media only screen and (max-width: 992px) {
    font-size: 0.8rem;
  }
  @media only screen and (max-width: 820px) {
    font-size: 0.7rem;
  }
`

export const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
`

export const TabLists = styled.div`
  margin-top: 3px;
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

  @media only screen and (max-width: 992px) {
    font-size: 0.9rem;
  }
  @media only screen and (max-width: 945px) {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
  @media only screen and (max-width: 760px) {
    font-size: 0.7rem;
    padding: 5px 8px;
  }
  @media only screen and (max-width: 700px) {
    font-size: 0.6rem;
    padding: 5px 8px;
  }
  @media only screen and (max-width: 600px) {
    padding: 5px 5px;
  }
  @media only screen and (width < 550px) {
    font-size: 0.7rem;
    padding: 5px 20px;
  }
  //@media only screen and (max-width: 992px) {
  //  font-size: 0.9rem;
  //}
`

export const TopListContainer = styled.div`
  margin: 2% 4%;
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (width < 550px) {
    margin: 2% 4% 2% 4%;
    padding-right: 8%;
    width: 96%;
    overflow-y: scroll;
    height: 25%;
  }
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
  margin: 3px 0;
  width: 100%;
  padding-bottom: 6px;
  font-weight: 500;
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

  @media only screen and (max-width: 1130px) {
    font-size: 0.9rem;
  }

  @media only screen and (max-width: 946px) {
    font-size: 0.8rem;
  }
  @media only screen and (max-width: 820px) {
    font-size: 0.7rem;
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
  width: 40%;
  cursor: pointer;
`

export const ItemRight = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: flex-end;
`

export const Rank = styled.div`
  min-width: 22px;
  text-align: end;
  margin-right: 10px;
`

export const Name = styled.div`
  font-weight: 700;
  text-align: left;
  @media only screen and (max-width: 760px) {
    margin-right: -5px;
  }
  @media only screen and (max-width: 600px) {
    margin-right: -10px;
  }
  @media only screen and (width < 550px) {
    margin-right: 0;
  }
`

export const Traffic = styled.div`
  text-align: right;
  min-width: 80px;

  @media only screen and (max-width: 760px) {
    display: none;
  }
  @media only screen and (width < 550px) {
    display: flex;
    min-width: auto;
  }
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
