import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  display: block;
  color: #626161;
  font-size: 12px;
  margin-bottom: 5px;
`

const IconDiv = styled.div`
  width: 35px;
  height: 35px;
  margin-bottom: 5px;

  img {
    width: 100%;
    height: 100%;
  }
`

const Text = styled.div`
  color: #5057ff;
  display: block;
  font-size: 14px;
  font-weight: 600;
`

interface SummaryIconCardPropsType {
  title: string
  icon: string
  text: string
}

const SummaryIconCard = (props: SummaryIconCardPropsType) => {
  const { title, icon, text } = props

  return (
    <Container>
      <Title>{title}</Title>
      <IconDiv>
        <img src={icon} alt={title} />
      </IconDiv>
      <Text>{text}</Text>
    </Container>
  )
}

export default SummaryIconCard
