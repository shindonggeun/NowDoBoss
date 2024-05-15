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

export const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: auto;

  select {
    margin: 0 5px; // select 요소의 마진
    padding: 5px 10px; // select 요소의 패딩
    border: 1px solid #ccc; // select 요소의 경계선 색상
    border-radius: 5px; // select 요소의 경계선 둥글기
    background-color: white; // 배경색
    cursor: pointer; // 마우스 커서 모양을 손가락 모양으로
  }

  select:focus {
    outline: none; // 포커스 시 외곽선 제거
    border-color: #007bff; // 포커스 시 경계선 색상 변경
  }
`

export const Dropdown = styled.select`
  padding: 5px 10px;
  margin-left: auto;
  border-radius: 5px;
  border: 1px solid #ccc;
`

export const Button = styled.div`
  padding: 5px 10px;
  color: #333;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: 1px solid #ccc;
`
