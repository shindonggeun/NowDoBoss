import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  width: 100%;
`

export const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  margin: 8px 0;
  display: inline-block; // 인라인 블록 디스플레이
  border: 1px solid #ccc; // 테두리 설정
  border-radius: 5px;
  box-sizing: border-box;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border: none #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`

export const CheckIconWrap = styled.div`
  position: absolute;
  top: 50%; // 부모 컨테이너 대비 상단에서 50% 위치
  right: 10px;
  transform: translateY(-40%); // 본인 높이의 50%만큼 위로 이동
  cursor: pointer;
`

export const BtnIconWrap = styled.div`
  position: absolute;
  top: 50%; // 부모 컨테이너 대비 상단에서 50% 위치
  right: 10px;
  transform: translateY(-50%); // 본인 높이의 50%만큼 위로 이동
  cursor: pointer;
`

export const CheckBtn = styled.div`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 3px 10px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`
