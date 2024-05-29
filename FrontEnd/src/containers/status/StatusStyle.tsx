import styled from 'styled-components'

export const StatusContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: calc(100vh - 68px);
  overflow: hidden;
  //background-color: #ededef;

  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media only screen and (max-width: 550px) {
    flex-direction: column;
  }
`

export const LeftDiv = styled.div`
  width: 40vw;
  height: calc(100vh - 68px);
  position: absolute;
  z-index: 1;

  @media only screen and (max-width: 920px) {
    width: 35vw;
  }
  @media only screen and (max-width: 550px) {
    font-size: 0.9rem;
    top: auto;
    bottom: 0;
    width: 105%;
    height: 45%;
  }
`

export const Sidebar = styled.div`
  width: 380px;
  //min-width: 320px;
  height: 475px;
  margin: 10px 10px;
  box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.2);
  border: 1px solid #dce5f2;
  border-radius: 5px;
  background-color: white;

  @media only screen and (max-width: 1035px) {
    //display: none;
    width: 80%;
  }
  @media only screen and (max-width: 945px) {
    //display: none;
    width: 75%;
    height: 445px;
  }
  @media only screen and (max-width: 920px) {
    //display: none;
    width: 90%;
    height: 445px;
  }
  @media only screen and (max-width: 820px) {
    //display: none;
    width: 90%;
    height: 420px;
  }
  @media only screen and (width < 550px) {
    box-shadow: none;
  }
`

export const PoligonMap = styled.div`
  margin-left: 30vw;
  width: 70vw;

  @media only screen and (max-width: 1130px) {
    margin-left: 35vw;
    width: 65vw;
  }
  @media only screen and (max-width: 980px) {
    margin-left: calc(100vw * 80%);
    width: calc(100vw - (100vw * 80%));
  }
  @media only screen and (max-width: 945px) {
    margin-left: calc(100vw * 75%);
    width: calc(100vw - (100vw * 75%));
  }
  @media only screen and (max-width: 900px) {
    margin-left: calc(100vw * 75%);
    width: calc(100vw - (100vw * 75%));
  }
  @media only screen and (max-width: 550px) {
    top: 0;
    margin-left: 0;
    width: 100vw;
    height: 50vh;
  }
  @media only screen and (max-width: 460px) {
    left: -10px;
  }
`

export const Banner = styled.div`
  margin: 5px 0;

  @media only screen and (max-width: 1035px) {
    display: none;
  }
`

export const Div = styled.div``

export const Report = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;

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
