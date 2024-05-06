import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: auto;
`
const Content = styled.div`
  padding: 8px;
  color: #ffffff;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 5px;
  margin: 10px;
  background-color: #2a65f0;

  &:active {
    background-color: #2a65f0;
  }

  &:hover {
    cursor: pointer;
  }
`
type MainButtonPropsType = {
  buttonContent: string
}

const MainButton = (props: MainButtonPropsType) => {
  const { buttonContent } = props

  return (
    <Container>
      <Content>{buttonContent}</Content>
    </Container>
  )
}

export default MainButton
