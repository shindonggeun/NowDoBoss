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
`

export const Icon = styled.div`
  position: absolute;
  top: 50%; // 부모 컨테이너 대비 상단에서 50% 위치
  right: 10px;
  transform: translateY(-40%); // 본인 높이의 50%만큼 위로 이동
  cursor: pointer;
`
