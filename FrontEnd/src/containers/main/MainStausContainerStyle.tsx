import styled from 'styled-components'

export const CardList = styled.div`
  width: 90%;
  margin: 8% 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`

export const Card = styled.div`
  display: inline-block;
  width: 350px;
  height: 400px;
  border-radius: 20px;
  color: #ecf0f5;
  box-shadow: 0 0 40px 5px;
  padding: 10px;
  margin: 20px 20px;
`

export const CardContainer = styled.div`
  color: #222;
`
