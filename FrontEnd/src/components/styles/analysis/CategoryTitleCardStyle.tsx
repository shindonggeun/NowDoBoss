import styled from 'styled-components'

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
export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 20px;
  background: #ffffff;
  //border: 1px solid #d8d8d8;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  border: 2px solid #2a65f0; /* 파란색 테두리 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 파란색 계열의 그림자 */
  border-radius: 8px;
`
export const IconImg = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  ${media('tablet')(`width: 16px; height:16px; margin-right:5px;`)}
  ${media('mobileM')(`width: 14px; height:14px; margin-right:4px;`)}
`

export const Title = styled.div`
  font-size: 1rem;
  font-weight: 500;

  ${media('tablet')(`font-size: 1rem `)}
  ${media('mobileM')(`font-size: 0.9rem `)}
`
