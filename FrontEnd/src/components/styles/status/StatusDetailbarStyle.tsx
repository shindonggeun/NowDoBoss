import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 69px;
  left: 0;
  background-color: white;
  width: 600px;
  height: calc(100vh - 68px);
  border: 2px solid white;
  border-left: none;
  z-index: 10;

  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  box-shadow: 10px 0 15px -5px rgba(0, 0, 0, 0.2);

  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 1080px) {
    width: 500px;
  }
  @media only screen and (max-width: 800px) {
    width: 100vw;
  }
  @media only screen and (max-width: 550px) {
    top: auto;
    bottom: 0;
    width: 100vw;
    height: 60vh;
  }
`

export const FixedCategoryBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
`

export const BarTopHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 10px 20px 5px 10px;
  background-color: #236cff;
  color: white;
  white-space: nowrap;
`

export const BarTopTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  padding-left: 10px;
`

export const BarTopSubtitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding-left: 15px;
`

export const BarTopSeason = styled.div`
  font-size: 12px;
  padding-left: 15px;
  @media (max-width: 768px) {
    display: none;
  }
`

export const BookMarkIcon = styled.img`
  width: 3rem;
  margin: auto 0;
`

export const CloseIcon = styled.img`
  width: 1rem;
  margin: 5px 0 auto auto;
`

export const BarInnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: white;
  width: 100%;
`

interface BarInnerTextProps {
  $isActive: boolean
}

export const BarInnerText = styled.div<BarInnerTextProps>`
  display: inline-block;
  padding: 10px 15px;
  cursor: pointer;
  color: ${props => (props.$isActive ? '#154daf' : 'black')};
  border-bottom: ${props => (props.$isActive ? '2px solid #7DB6EB' : 'none')};

  @media (max-width: 768px) {
    padding: 10px 7px;
  }
`

export const TabBarContainer = styled.div`
  margin: 0 20px;
`

export const SeparateLine = styled.div`
  width: 100%;
  height: 0.8rem;
  background-color: #f7f7f7;
  scroll-margin-top: 100px;
`

export const LoadingContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`
