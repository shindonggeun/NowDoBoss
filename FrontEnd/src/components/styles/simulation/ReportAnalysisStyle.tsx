import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin: 2rem 4vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
`

export const SubTitle = styled.div`
  margin: 0.4rem 0;
  font-size: 0.9rem;
  color: #808080;
`

export const Emphasis = styled.span`
  color: #5057ff;
`

export const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 3rem 0;
`

export const AgeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const AgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

export const AgeDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface AgeBarType {
  rank: string
}
export const AgeBar = styled.div<AgeBarType>`
  margin: 1rem 1rem 0 1rem;
  //padding: 0 1rem;
  width: 3vw;
  ${({ rank }) => {
    switch (rank) {
      case 'first':
        return 'height: 12rem;'
      case 'second':
        return 'height: 10rem;'
      case 'third':
        return 'height: 8rem;'
      default:
        return 'height: 8rem;'
    }
  }}
  ${({ rank }) => {
    switch (rank) {
      case 'first':
        return 'background-color: #1C42C9;'
      case 'second':
        return 'background-color: #5472DD;'
      case 'third':
        return 'background-color: #A2ACCD;'
      default:
        return 'background-color: blue;'
    }
  }}
`

export const GenderContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const GenderDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

interface GendarImgType {
  size: number
}

export const GenderImg = styled.img<GendarImgType>`
  width: ${props => `${props.size}rem`};
`

export const GenderPercent = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  margin-left: 1vw;
`

export const GenderText = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0.8rem;
`

export const CircleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin: 3rem 3rem;
`

interface CircleProps {
  season: string | null
}

export const CircleMonth = styled.div<CircleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 50%;
  border: 1px solid #dadada;
  background-color: white;
  //color: #87898d  // 왜 color 적용하면 배경색이 사라질까??

  ${props =>
    props.season === 'peak' &&
    css`
      background-color: #236cff;
      color: white;
      border: 1px solid #236cff;
    `}
  ${props =>
    props.season === 'offpeak' &&
    css`
      background-color: #fa390e;
      //background-color: #f4b800;
      //background-color: #1ab66f;
      color: white;
      border: 1px solid #fa390e;
    `};
`

export const GrayBox = styled.div`
  width: 93%;
  min-height: 5rem;
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 1.5rem 1rem;
  margin-top: 0.5rem;
`

export const GrayBoxHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const GrayBoxHeaderTitle = styled.div`
  padding-left: 0.7rem;
  font-weight: 700;
`

export const ThumbUpIcon = styled.img`
  width: 1.8rem;
`

export const GrayBoxTitle = styled.div`
  padding: 1rem 0.7rem;
  font-size: 2rem;
  font-weight: 700;
  color: #d84a34;
`

export const GrayBoxSubTitle = styled.div`
  padding: 0 0.7rem;
  font-size: 0.9rem;
  color: #4c545e;
`

export const GrayBoxText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #343940;
  margin: 0.5rem 0;
`

export const GrayBoxTextEmphasis = styled.span`
  color: #236cfe;
`

export const CheckIcon = styled.img`
  width: 1.5rem;
  margin-right: 0.8rem;
`
