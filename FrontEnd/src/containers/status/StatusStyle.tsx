import styled from 'styled-components'

export const AnalysisLayout = styled.div`
  display: flex;
  flex-direction: row;
  height: 91vh;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Sidebar = styled.div`
  width: 18rem;
  border-right: 1px solid #dce5f2;

  @media (max-width: 768px) {
    display: none;
  }
`

export const Content = styled.div`
  @media (max-width: 768px) {
    //width: 100%;
    flex: 1;
  }
`

export const SeparateLine = styled.div`
  background-color: #dce5f2;
  height: 0.2rem;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Container = styled.div`
  margin: 1rem 10%;
`

export const Title = styled.div`
  font-size: large;
  font-weight: bold;
  text-align: left;
`

export const Subtitle = styled.div`
  font-size: small;
  text-align: left;
  margin-bottom: 1rem;
`

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`

export const Option = styled.div<{ selected: boolean }>`
  text-align: center;
  width: calc(50% - 50px);
  padding: 10px;
  border: 1px solid ${({ selected }) => (selected ? '#0066FF' : '#DFDFDF')};
  border-radius: 0.5rem;
  background-color: ${({ selected }) => (selected ? '#0066FF' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  cursor: pointer;
`
