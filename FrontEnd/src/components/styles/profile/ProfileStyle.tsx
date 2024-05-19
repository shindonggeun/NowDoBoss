import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`

export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding-left: 10px;

  @media (max-width: 768px) {
    padding-left: 0;
    padding-top: 20px;
  }
`

export const EmailDiv = styled.div`
  display: flex;
  align-items: center;
`

export const Name = styled.div`
  font-size: 1rem;
  font-weight: 500;
`

export const Email = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
`

export const Provider = styled.img`
  margin-left: 5px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
`

// 북마크 카드

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`

export const Card = styled.div<{ $width: number }>`
  width: ${props => `${props.$width}px`};
  padding: 1rem;
  cursor: pointer;
  border-radius: 0.75rem;
  background-color: white;
  border: 1px solid #e2ebfd;
  position: relative;
  //background: #f1f1f3;
  //background-color: #f0f5ff;
  //box-shadow: 0 0 5px 2px rgba(240, 245, 255, 1);
`

export const CardTitle = styled.div`
  padding: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #3c3852;
  margin: 5px 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  //&:hover {
  //  color: #236cff;
  //  text-decoration: underline;
  //}
`

export const CardTitleEmphasis = styled.span`
  padding: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #236cff;
`

export const CardContent = styled.p<{ $marginTop: number }>`
  color: #3c3852;
  font-size: 0.86rem;
  margin-top: ${props => `${props.$marginTop}px`};
`

export const CardDate = styled.div<{ $marginTop: number }>`
  color: #6e6b80;
  font-size: 0.8rem;
  margin-top: ${props => `${props.$marginTop}px`};
`

export const CardArrow = styled.div`
  position: absolute;
  background: #5d93fb;
  padding: 0.4rem;
  border-top-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
  bottom: 0;
  right: 0;
  transition: 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #236cff;

    svg {
      transform: translateX(3px);
    }
  }
`

export const ArrowSVG = styled.svg`
  fill: none;
  height: 20px;
  width: 23px;
  path {
    fill: #fff;
  }
`
