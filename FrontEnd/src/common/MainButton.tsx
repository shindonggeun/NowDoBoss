import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: auto;
`
const Content = styled.div`
  padding: 8px;
  color: white;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 10px;
  margin: 20px;
  background-color: #236cff;

  &:active {
    background-color: #0051ff;
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
