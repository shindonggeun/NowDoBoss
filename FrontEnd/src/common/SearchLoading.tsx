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
  color: #525252;
  box-sizing: border-box;
  animation: ${Loadingani} 1s linear infinite;
`

const Searchani = keyframes`
    0% {
        transform: translate(-10px, -10px);
    }
    25% {
        transform: translate(-10px, 10px);
    }
    50% {
        transform: translate(10px, 10px);
    }
    75% {
        transform: translate(10px, -10px);
    }
    100% {
        transform: translate(-10px, -10px);
    }
`
const SearchIcon = styled.div`
  width: 48px;
  height: 48px;
  display: block;
  margin: 20px auto;
  position: relative;
  border: 3px solid #4b4b4b;
  border-radius: 50%;
  box-sizing: border-box;
  animation: ${Searchani} 2s linear infinite;

  &::after {
    content: '';
    box-sizing: border-box;
    width: 6px;
    height: 24px;
    background: #4b4b4b;
    transform: rotate(-45deg);
    position: absolute;
    bottom: -20px;
    left: 46px;
  }
`

const SearchLoading = () => {
  return (
    <div>
      <SearchIcon />
      <div>입력한 결과를 바탕으로 분석중이에요</div>
      <LoadingSpinner />
    </div>
  )
}

export default SearchLoading
