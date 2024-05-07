import styled from 'styled-components'

export const ServiceTypeContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
`

export const ServiceType = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;
  height: auto;
  text-align: center;

  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: center;

  &:hover {
    transform: translateY(-5px);
  }

  &:active {
    transform: translateY(1px);
  }
`

export const ServiceImgBox = styled.div<{ $isSelected?: boolean }>`
  position: relative;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  border: ${props =>
    props.$isSelected ? ' 2px solid #415FEB' : '1px dashed #b9b9b9'};
  box-shadow: ${props =>
    props.$isSelected ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none'};
  border-radius: 10px;
`

export const ServiceImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 25px;
  height: 25px;
`

export const ServiceTitle = styled.div`
  margin-top: 3px;
  font-size: 0.8rem;
`
