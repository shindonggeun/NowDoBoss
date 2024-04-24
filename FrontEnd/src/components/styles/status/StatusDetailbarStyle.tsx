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
  background-color: blue;
  z-index: 1010;
  padding: 10px 0;
  width: 100%;
`

export const BarInnerText = styled.div`
  display: inline-block;
  margin-left: 10px;
`

export const TabBarContainer = styled.div`
  scroll-margin-top: 40px;
  margin: 0 20px;
`

export const SeparateLine = styled.div`
  width: 100%;
  height: 0.8rem;
  background-color: #f7f7f7;
`
