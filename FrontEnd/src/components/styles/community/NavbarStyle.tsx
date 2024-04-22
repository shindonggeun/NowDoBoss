import styled from 'styled-components'

interface CategoryType {
  isChoice: boolean
}

export const Container = styled.div`
  background-color: #f1f1f1;
  width: 220px;
  height: 91vh;
`
export const Community = styled.div`
  margin: 0 0 10px 0;
`

export const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  padding: 10px 17px 5px;
`
export const Category = styled.div<CategoryType>`
  font-weight: 700;
  padding: 5px 15px;
  display: flex;
  font-size: ${({ isChoice }) => (isChoice ? '1.2rem' : '1.1rem')};
  color: ${({ isChoice }) => (isChoice ? 'black' : 'gray')};
  background-color: ${({ isChoice }) => (isChoice ? '#D9D9D9' : 'none')};
  border-radius: ${({ isChoice }) => (isChoice ? '5px' : 'none')};
`
export const Icon = styled.img``

export const Text = styled.text`
  margin: 0 0 0 5px;
`

export const Chatting = styled.div`
  margin: 0 0 10px 0;
  display: flex;
  justify-content: space-between;
`
