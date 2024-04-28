import styled from 'styled-components'

export const Container = styled.div`
  width: 500px;
  height: auto;
  border: 2px solid #d9d9d9;
  background-color: white;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 15px;
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

export const FixedHeader = styled.div`
  position: fixed;
  width: 99.3%;
  top: 2px;
  z-index: 1;
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
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  border-bottom: 2px solid
    ${props => (props.$selectedTab ? '#236cff' : '#999999')};
  color: ${props => (props.$selectedTab ? '#236cff' : '#999999')};

  &:hover {
    border-bottom: 2px solid #236cff;
    color: #236cff;
    cursor: pointer;
  }
`
export const Notice = styled.div`
  margin-top: 115px;
  background-color: #fdffc7;
  padding: 10px 40px;
  font-weight: 500;
`
export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
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
  height: 15vh;
  background-color: #d9d9d9;
  margin: 20px;
`
