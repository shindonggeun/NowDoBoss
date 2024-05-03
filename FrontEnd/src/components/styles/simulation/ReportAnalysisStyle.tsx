import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin: 2rem 5rem;
`

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
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
  margin: 3rem 2rem;
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
