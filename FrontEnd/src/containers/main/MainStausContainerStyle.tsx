import styled, { keyframes } from 'styled-components'

export const CardList = styled.div`
  width: 60%;
  padding: 8% 0;
  margin-right: 40px;

  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`

export const SlideWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  padding: 30px 0;
`

export const SlideList = styled.div`
  width: 350px;
  height: 400px;
  cursor: pointer;
  z-index: 2;
  transition: 0.3s;
  transform: scale(1);
  background-color: white;
  border-radius: 20px;
  color: #f0f5ff;
  box-shadow: 0 0 30px 20px;
  margin: 20px 20px;

  &:hover {
    transform: scale(1.1);
  }
`

const infiniteAnimation1 = keyframes`
    0% {
        transform: translateX(0%);
    }
    50% {
        transform: translateX(-100%);
    }
    50.1% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0%);
    }
`

export const SlideOriginal = styled.div<{ $animate: boolean }>`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
  animation: 50s linear infinite normal none running ${infiniteAnimation1};
  animation-play-state: ${props => (props.$animate ? 'running' : 'paused')};
`

const infiniteAnimation2 = keyframes`
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-200%);
    }
`

export const SlideClone = styled.div<{ $animate: boolean }>`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
  animation: 50s linear infinite normal none running ${infiniteAnimation2};
  animation-play-state: ${props => (props.$animate ? 'running' : 'paused')};
`

export const Card = styled.div`
  color: #222;
  padding: 40px 30px;
`

export const HeaderText = styled.div`
  color: #1f67fd;
  font-size: 15px;
`

export const TitleText = styled.div`
  color: #404040;
  font-weight: 600;
  font-size: 18px;
  padding: 4px 0;
`

export const SubTitleText = styled.div`
  color: #606d85;
  font-size: 15px;
`

// Main Card2
export const TopTenContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px 0;
`

export const TopTenRank = styled.div`
  width: 10px;
  color: #606d85;
`

export const TopTenInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 15px;
  font-weight: 600;
`

export const TopTenInfoName = styled.div`
  color: #404040;
`

export const TopTenInfoRate = styled.div<{ $isUp: boolean }>`
  color: ${props => (props.$isUp ? '#FF0000' : '#0066FF')};
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Icon = styled.img<{ $width: number }>`
  width: ${props => `${props.$width}px`};
`

export const AlignCenter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
