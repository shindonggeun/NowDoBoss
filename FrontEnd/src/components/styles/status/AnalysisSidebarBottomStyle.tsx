import styled from 'styled-components'

export const Container = styled.div`
  margin: 1rem 10%;
`

export const Title = styled.div`
  font-size: large;
  font-weight: bold;
  text-align: left;
`

export const Subtitle = styled.div`
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
  border: 2px solid ${({ selected }) => (selected ? 'blue' : 'gray')};
  border-radius: 0.5rem;
  background-color: ${({ selected }) => (selected ? 'blue' : 'white')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  cursor: pointer;
`
