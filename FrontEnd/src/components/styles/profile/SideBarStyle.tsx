import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  padding: 10px;
  height: auto;

  @media (max-width: 768px) {
    margin-top: 50px;
    flex-direction: row; // 가로 방향으로 아이템 배치
    //flex-wrap: wrap; // 필요한 경우 다음 줄로 아이템 이동
    align-items: center; // 아이템을 세로 중앙에 배치
  }
`

export const MenuItem = styled.div`
  padding: 10px 4px;
  font-size: 16px;
  color: #333;
  cursor: pointer;

  &:hover {
    border-radius: 5px;
    background-color: #f3f4f5; // 호버 시 배경색 변경
  }

  &:not(:first-child) {
    margin-top: 5px; // 첫 번째 항목을 제외하고 상단 마진 추가
  }

  @media (max-width: 768px) {
    &:not(:first-child) {
      margin-top: 0;
      margin-left: 10px; // 가로 배치시 좌측 마진 추가
    }
  }
`

export const Divider = styled.div`
  height: 1px;
  background-color: #c2c2c2;
  margin: 10px 0;

  @media (max-width: 768px) {
    width: 1px;
    height: 20px; // 수직 구분선의 높이 조정
    margin: 0 10px; // 수직 구분선 주위의 마진 조정
  }
`
