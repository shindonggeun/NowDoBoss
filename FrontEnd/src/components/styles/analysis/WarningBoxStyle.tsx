import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 10vh;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 5px;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`

export const InfoImage = styled.img`
  width: 18px;
  height: 18px;
`

export const Title = styled.div`
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  margin-left: 5px;
`

export const Text = styled.div`
  display: flex;
  color: #333;
  font-size: 0.9rem;
`
