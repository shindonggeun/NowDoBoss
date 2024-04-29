import styled from 'styled-components'
import RefreshIcon from '@mui/icons-material/Refresh'

// sizes 객체의 키들에 대한 인터페이스 정의
interface ISizes {
  mobileS: string
  mobileM: string
  mobileL: string
  tablet: string
  desktop: string
}

const sizes: ISizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  desktop: '1024px',
}

// 미디어 쿼리를 위한 도우미 함수의 타입 정의 개선
const media = (key: keyof ISizes) => {
  return (style: TemplateStringsArray | string) =>
    `@media (max-width: ${sizes[key]}) { ${style} }`
}

export const IntroContainer = styled.div`
  width: 100%;
  min-height: 5vh;
  border-radius: 15px;
  background-color: #2a65f0;
  display: flex;
  padding: 25px;
  box-sizing: border-box;
  flex-direction: column;

  ${media('tablet')(`padding: 15px;`)}
  ${media('mobileL')`padding: 15px;`}
    ${media('mobileM')`padding: 10px;`}
    ${media('mobileS')`padding: 10px;`}
`

export const IntroTitle = styled.div`
  font-size: 1.4rem;
  color: #ffffff;
  font-weight: 700;
  margin-right: auto;

  ${media('tablet')`font-size: 1.15rem;`}
  ${media('mobileL')`font-size: 1.1rem;`}
    ${media('mobileM')`font-size: 1.05rem;`}
    ${media('mobileS')`font-size: 1rem;`}
`

export const IntroDetails = styled.div`
  display: flex;
  gap: 1%;
  ${media('mobileM')`flex-direction: column; margin-top:5px; `}
`

export const DetailItem = styled.div`
  display: flex;
  font-size: 1rem;
  color: #f0f0f0;
  align-items: center;

  ${media('tablet')(`font-size: 0.85rem;`)}
  ${media('mobileL')`font-size: 0.75rem;`}
    ${media('mobileM')`font-size: 0.7rem;`}
    ${media('mobileS')`font-size: 0.6rem;`}
`

export const DetailItemTitle = styled.span`
  font-weight: 600;
  color: #ffffff;
  margin-right: 5px;
`

export const AnimatedIcon = styled(RefreshIcon)`
  color: #ffffff;
  cursor: pointer;

  &:hover {
    animation: transform 0.3s forwards;
    color: #ffd700;
  }
`
