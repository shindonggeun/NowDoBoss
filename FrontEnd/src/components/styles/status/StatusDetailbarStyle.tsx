import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 61px;
  left: 0;
  width: 30rem;
  height: 92%;
  z-index: 1000;
  //background-color: yellowgreen;
  background-color: white;
  : 50px 100px;

  border: 10px solid white;
  border-left: none;

  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  box-shadow: 10px 0 15px -5px rgba(0, 0, 0, 0.2);

  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const FixedCategoryBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 1010;
  width: 100%;
`

export const BarTopHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 15px 20px 10px 20px;
  background-color: #236cff;
  color: white;
`

export const BarTopTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
`

export const BarTopSubtitle = styled.div`
  font-size: 18px;
  padding-left: 15px;
`

export const BarTopSeason = styled.div`
  font-size: 14px;
  padding-left: 15px;
`
export const BarInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: white;
`
interface BarInnerTextProps {
  isActive: boolean
}

export const BarInnerText = styled.div<BarInnerTextProps>`
  display: inline-block;
  margin: 10px 10px;
  cursor: pointer;
  color: ${props => (props.isActive ? 'blue' : 'black')};
  border-bottom: ${props => (props.isActive ? '2px solid blue' : 'none')};
`

export const TabBarContainer = styled.div`
  scroll-margin-top: 120px;
  margin: 0 20px;
`

export const SeparateLine = styled.div`
  width: 100%;
  height: 0.8rem;
  background-color: #f7f7f7;
`
