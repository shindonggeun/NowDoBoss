import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 70vh;
`

export const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Title = styled.div`
  text-align: center;
  margin: 15px 0;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
`

export const HighlightText = styled.span`
  letter-spacing: -0.05em; /* 글자 간격을 조금 좁게 */
  transform: scale(0.95); /* 약간 눌린 듯한 효과 */
  display: inline-block; /* transform 적용을 위해 필요 */
`

export const Text = styled.div`
  text-align: center;
  margin-bottom: 2px;
  color: #333;
  font-size: 16px;
  font-weight: 400;
`

export const Button = styled.button`
  padding: 10px 50px;
  background-color: #d4e5f9;
  color: #2a7de1;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #6797da;
    color: white;
  }
`
