import styled from 'styled-components'

export const Container = styled.div`
  width: 500px;
  height: auto;
  border: 2px solid #d9d9d9;
  background-color: white;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 10px 15px 15px -5px rgba(0, 0, 0, 0.2);
`

export const TabBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`
export const Tab = styled.div<{ $selectedTab: boolean }>`
  padding: 10px 20px;
  width: 5rem;
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
`
export const ComparisonContainer = styled.div``
export const ComparisonBox = styled.div`
  background-color: #d9d9d9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  margin: 5px 0;
  font-size: 0.8rem;
  font-weight: 600;
  width: 125px;
`
export const ComparisonData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const ComparisonTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
`
export const Content = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  padding-right: 2px;
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
  margin-right: 20px;
`

export const Chart = styled.div`
  width: auto;
  height: 15vh;
  background-color: #d9d9d9;
  margin: 20px;
`
