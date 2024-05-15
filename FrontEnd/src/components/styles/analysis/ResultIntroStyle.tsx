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

export const LeftWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const InfoDiv = styled.div`
  display: flex;
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
  display: block;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`
export const GuText = styled.div`
  display: flex;
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 8px;
`

export const BookmarksDiv = styled.div`
  padding: 10px 0;
  background-color: rgba(102, 102, 102, 0.4);
  border-radius: 7px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(102, 102, 102, 0.6); /* 호버 시 배경색 변경 */
  }
`

export const BookmarkText = styled.div`
  display: block;
  color: #ffffff;
  font-size: 1rem;
  text-align: center;

  &:hover {
    color: #cccccc; /* 호버 시 텍스트 색상 변경 */
  }
`
export const BookmarksSmallText = styled.div`
  display: block;
  color: #ffffff;
  font-size: 0.7rem;
  text-align: center;
`

export const ShareBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  background-color: #fdbd5b; // 카카오톡의 대표적인 노란색
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e5d85c; // 조금 더 어두운 노란색
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const ShareBoxText = styled.div`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
`

export const RightWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 3%;
  }
`

export const SummaryWrap = styled.div`
  display: flex;
  box-sizing: border-box;
  gap: 1%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`

export const FlowWrap = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const FlowCard = styled.div`
  display: flex;

  @media (max-width: 768px) {
    margin-bottom: 3%;
  }
`

export const TipTitle = styled.div`
  color: #333;
  font-size: 17px;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding-left: 10px;

  span {
    position: relative;
    color: #ed1c24;
  }
`

export const TipBox = styled.div`
  display: flex;

  @media (max-width: 768px) {
    margin-bottom: 3%;
  }
`

export const SalesCard = styled.div`
  display: flex;
  flex: 4;
`

export const WarningDiv = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 5px;
`

export const WarnTitle = styled.div`
  color: #333;
  font-size: 1.2rem;
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
