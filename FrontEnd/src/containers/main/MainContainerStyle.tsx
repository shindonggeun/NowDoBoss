import styled from 'styled-components'

export const MainContainer = styled.div`
  @media only screen and (max-width: 992px) {
    //
  }
`

export const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 70px);

  margin: auto;
  @media only screen and (max-width: 992px) {
    //
  }
`

export const Content = styled.div`
  height: 100%;
  margin: 0 10%;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Text = styled.div`
  width: 50%;
  background-color: #ff7070;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
`

export const BlueText = styled.div`
  font-weight: 400;
  font-size: 1.5rem;
  color: #336cd1;
`

export const Title = styled.div`
  font-weight: 700;
  font-size: 3.2rem;
  margin: 10px 0 15px 0;
`

export const TextContent = styled.div`
  font-weight: 600;
  font-size: 2rem;
  color: #5f6c84;
`

export const CardList = styled.div`
  width: 50%;
  background-color: #96ff89;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const CardScroll = styled.div`
  max-height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /*IE, Edge*/
  scrollbar-width: none; /*Firefox*/
  ::-webkit-scrollbar {
    display: none; /*Chrome, Safari, Opera*/
    width: 0;
  }
`

export const Card = styled.div`
  width: 400px;
  height: calc(100vh - 70px);
  border: 2px solid #d9d9d9;
  background-color: #d9d9d9;
  border-radius: 5px;
`

export const Active = styled.div`
  transform: translateY(0);
  opacity: 1;
  background-color: yellow;
`
