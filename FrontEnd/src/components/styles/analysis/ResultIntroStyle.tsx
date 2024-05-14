import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin-top: 3vh;
  gap: 2%;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`
export const InfoDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 20px;
  background: linear-gradient(to right, #71b6ff 0%, #99c5fd 100%);
  border-radius: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const ServiceText = styled.div`
  display: flex;
  color: rgba(255, 255, 255, 0.75); // 텍스트 색상
  font-size: 0.9rem; // 폰트 크기
  margin-bottom: 1px; // 텍스트 사이의 거리
`

export const CommercialText = styled.div`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1px;
`

export const GuText = styled.div`
  display: flex;
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 8px;
`

export const ShareBox = styled.div`
  padding: 10px 0;
  background-color: rgba(102, 102, 102, 0.4);
  border-radius: 7px;
  box-sizing: border-box;
`

export const ShareBoxText = styled.div`
  display: block;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
`

export const WarningDiv = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px; /
  background-color: #f8f9fa; 
  border: 1px solid #ced4da; 
  border-radius: 5px; 
  color: #495057; 
  font-size: 0.9rem;
  font-weight: 400;
`

export const WarnTitle = styled.div`
  color: #333; // 텍스트 색상
  font-size: 1.2rem; // 폰트 크기
  font-weight: 500;
  margin-bottom: 1px;
`

export const Text = styled.div`
  display: flex;
  color: #333;
  font-size: 0.9rem;
`

// export const WarningDiv = styled.div`
//   display: flex;
//   flex: 3;
//   flex-direction: column;
//   box-sizing: border-box;
//   padding: 20px; // 내부 padding 추가
//   background-color: #fff3cd; // 경고색 배경
//   border: 1px solid #ffeeba; // 테두리 색상 조정
//   border-radius: 5px; // 모서리 둥글게 처리
//   color: #856404; // 경고 텍스트 색상 조정
//   font-size: 0.9rem;
//   font-weight: 400;
// `
