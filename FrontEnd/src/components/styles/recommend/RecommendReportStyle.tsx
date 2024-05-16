import styled from 'styled-components'

export const Container = styled.div`
  width: 500px;
  height: auto;
  border: 2px solid #d9d9d9;
  background-color: white;
  border-radius: 0 5px 5px 0;
  box-shadow: 10px 15px 15px -5px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  max-height: calc(100vh - 75px);

  @media only screen and (max-width: 680px) {
    font-size: 0.9rem;
    top: auto;
    bottom: 0;
    width: 100%;
    max-height: 60vh;
    border-bottom-right-radius: 0;
    border-top-left-radius: 20px;
    box-shadow: none;
  }
`
export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 10px 5px 5px;
  border-radius: 0 5px 0 0;

  border-bottom: 2px solid #236cff;
  background-color: #236cff;
  color: #ffffff;

  @media only screen and (max-width: 400px) {
  }
`

export const Icon = styled.img`
  scale: 0.8;
  margin: -3px;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`
export const Content = styled.div``

export const HeaderTitle = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
`
export const SubTitle = styled.div`
  font-size: 0.9rem;
  padding: 0 0 5px;
`
export const CloseButton = styled.div`
  background-color: #e2ebf7;
  border-radius: 100%;

  color: #236cff;
  font-weight: 600;
  width: 2.2rem;
  height: 2.2rem;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  &:hover {
    background-color: #cfdcff;
    color: #236cff;
  }

  &:active {
    background-color: #78a1ff;
    color: #e2ebf7;
    //box-shadow: 0 0 0 2px #e2ebf7;
  }
`

export const FixedHeader = styled.div`
  position: fixed;
  width: 99.3%;
  top: 2px;
  z-index: 2;
  background-color: white;
  border-top-right-radius: 20px;
`
export const TabBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  //border-bottom: 2px solid #999999;
`
export const Tab = styled.div<{ $selectedTab: boolean }>`
  padding: 10px 20px;
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  border-bottom: 3px solid
    ${props => (props.$selectedTab ? '#236cff' : '#d9d9d9')};
  color: ${props => (props.$selectedTab ? '#236cff' : '#999999')};

  &:hover {
    border-bottom: 3px solid #236cff;
    color: #236cff;
    cursor: pointer;
  }
`
export const Notice = styled.div`
  margin-top: 108px;
  background-color: #fdffc7;
  padding: 10px 40px;
  font-weight: 500;
`
export const Summary = styled.div``
export const SummaryHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.5rem;
  position: relative;
`

export const HighLight = styled.div`
  display: flex;
  align-items: center;
  width: 10rem;
  background-color: #fdffc7;
  font-size: 1.1rem;
  font-weight: 700;
  margin-top: 5px;
  padding: 5px 25px;
  position: absolute;
  left: 25px;
  z-index: 0;
`

export const LightIcon = styled.img`
  width: 2.5rem;
  position: relative;
  z-index: 1;
`

export const SummaryContent = styled.div`
  padding: 5px 20px 10px;
  line-height: 2;

  b {
    font-weight: 700;
    color: #333333;
  }
`
export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 15px;
`
export const Title = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 15px 0 0 15px;
  width: auto;
  @media only screen and (max-width: 680px) {
    font-size: 1.3rem;
  }
`
export const BlueOceanTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  margin: 15px 0 0 15px;
  width: auto;
  @media only screen and (max-width: 680px) {
    font-size: 1.3rem;
    width: 75px;
  }
`
export const BlueOcean = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
`

export const SubContent = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  margin: 0 20px 0 0;
`

export const Chart = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;

  margin: 20px;
`

export const CountDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: -25px 18px 20px;
`
export const Blue = styled.div`
  font-weight: 600;
  color: #444444;
`
export const Div = styled.div``

export const BannerArrow = styled.img`
  margin-right: 10px;
`

export const GoAnalysis = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f2f7ff;
  font-weight: 400;
  padding: 15px;

  &:hover {
    cursor: pointer;
    // BannerArrow에만 호버 효과 적용
    ${BannerArrow} {
      transform: translateX(10px);
      transition: transform 0.3s ease;
    }
  }
`
export const BannerContent = styled.div`
  b {
    color: #0066ff;
  }
`
