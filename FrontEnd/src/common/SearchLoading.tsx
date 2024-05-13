import styled, { keyframes } from 'styled-components'

const Loadingani = keyframes`
    0% {
        box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
    }
    25% {
        box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 2px;
    }
    50% {
        box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 2px,  -38px 0 0 -2px;
    }
    75% {
        box-shadow: 14px 0 0 2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
    }
    100% {
        box-shadow: 14px 0 0 -2px,  38px 0 0 2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
    }
`

const LoadingSpinner = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
  margin: 15px auto;
  position: relative;
  color: #236cff;
  box-sizing: border-box;
  animation: ${Loadingani} 1s linear infinite;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
`

const ContainerText = styled.div`
  margin-bottom: 10px;
  color: #2c3e50;
`

const SearchLoading = () => {
  return (
    <Container>
      <ContainerText>입력한 결과를 바탕으로 분석중이에요</ContainerText>
      <LoadingSpinner />
    </Container>
  )
}

export default SearchLoading
