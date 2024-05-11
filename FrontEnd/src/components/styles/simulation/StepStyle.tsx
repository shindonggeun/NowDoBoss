import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin: 3rem 3rem;
`

export const Title = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: #22222;
`

export const Emphasis = styled.span`
  color: #2e83f2;
`

interface ButtonProps {
  size: string
  selected: boolean
}

// 선택버튼 sm, m 사이즈
export const SelectButton = styled.button<ButtonProps>`
  border-radius: 8px;
  background-color: ${props => (props.selected ? '#2e83f2' : 'white')};
  border: 2px solid ${props => (props.selected ? '#2e83f2' : '#ccc')};
  color: ${props => (props.selected ? 'white' : '#222')};
  text-align: center;
  cursor: pointer;
  //overflow: hidden;
  //text-overflow: ellipsis;
  //white-space: nowrap;
  //margin: 0.5rem 0.3rem;

  transition:
    background-color 0.2s,
    color 0.3s,
    border 0.1s;

  &:hover,
  &:active {
    background-color: #2e83f2;
    border: 2px solid #2e83f2;
    color: white;
  }

  ${props =>
    props.size === 'sm' &&
    css`
      min-width: 8rem;
      width: auto;
      height: 3.5rem;
      font-size: 0.9rem;
      padding: 1rem 1rem;
    `}

  ${props =>
    props.size === 'm' &&
    css`
      width: 9rem;
      height: 4rem;
      padding: 8px 16px;
      font-size: 1rem;

      @media (max-width: 768px) {
        margin: 0 1rem;
    `}
`

// 선택버튼 lg 사이즈 -> 리팩필요
export const SelectButtonLarge = styled.button<ButtonProps>`
  border-radius: 8px;
  background-color: white;
  border: 2px solid ${props => (props.selected ? '#2e83f2' : '#ccc')};
  color: #222;
  text-align: center;
  cursor: pointer;
  width: 9rem;
  height: 10rem;
  padding: 10px 20px;
  font-size: 18px;

  transition:
    background-color 0.2s,
    color 0.3s,
    border 0.1s;

  &:hover,
  &:active {
    background-color: white;
    border: 2px solid #2e83f2;
    color: black;
  }
`

export const FranchiseContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 2rem 5rem;

  @media (max-width: 768px) {
    margin: 2rem 0;
  }
`

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
`

export const SubCategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  margin: 2rem;
`

export const BuildingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 2rem 1rem 3rem 1rem;
`

export const BuildingImg = styled.img`
  width: 3rem;
`

export const BuildingSize = styled.div`
  font-size: 0.8rem;
  margin-top: 0.2rem;
  color: #888888;
`

export const BuildingSizeTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 0.8rem;
`

export const FloorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 2rem 4rem;
`

export const GoReportContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12vh;
`

export const GoReportButton = styled.button`
  transition: background-color 0.2s;
  border-radius: 8px;
  background-color: #2e83f2;
  color: white;
  border: 2px solid #2e83f2;

  font-size: 14px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  width: 15rem;
  height: 3rem;

  &:hover,
  &:active {
    background-color: #2e83f2;
    color: white;
    border: 2px solid #2e83f2;
    transform: scale(1.09);
  }
`

export const DaumContainer = styled.div`
  margin-top: 2rem;
`

export const InfoText = styled.div`
  font-size: 0.9rem;
  margin-top: 5px;
  color: #7777777;
`

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`

export const SearchIcon = styled.img`
  position: absolute;
  left: 0;
  bottom: 5px;
  width: 1.8rem;
  cursor: pointer;
`

export const StyledInput = styled.input`
  width: 40rem;
  border: none;
  border-bottom: 1px solid #5b5b5b;
  color: #30353b;
  padding: 8px 2.5rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-bottom: 2px solid #2e83f2;
    background-color: #fff;
    color: #333;
  }

  &::placeholder {
    color: #4c545e;
    font-style: italic;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 55vh;
`

export const NextButton = styled.button`
  transition: background-color 0.2s;
  border-radius: 8px;
  background-color: #2e83f2;
  color: white;
  border: 2px solid #2e83f2;

  font-size: 14px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  width: 15rem;
  height: 3rem;
`

export const StyledButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  padding: 5px 2.5rem;
`

export const Step1ButtonContainer = styled.div`
  position: fixed;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
`
