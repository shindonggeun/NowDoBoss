import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  overflow: auto;
  height: 100vh;
  width: 100%;
`

export const MapDiv = styled.div`
  width: 100%;
`

export const SearchDiv = styled.div`
  display: flex;
  flex-direction: row;
`

export const Search = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  width: 400px;
  height: auto;

  @media only screen and (max-width: 400px) {
    font-size: 0.9rem;
    top: auto;
    bottom: 0;
    width: 100%;
    height: auto;
  }
`

export const ReduceBtnWrap = styled.div`
  position: absolute;
  z-index: 1;
  left: 400px;
  top: 0;
  height: auto;

  @media only screen and (max-width: 400px) {
    display: none;
  }
`

export const ReduceBtn = styled.div`
  background-color: #f2f2f2;
  border: 2px solid #d9d9d9;
  margin: 10px 0;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.2);
`

export const BtnImg = styled.img`
  scale: 1.3;
`
