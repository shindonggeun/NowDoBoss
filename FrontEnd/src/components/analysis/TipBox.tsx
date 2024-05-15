import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 2% 6% 2% 12%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 5px;
  font-size: 15px;
  color: #333;
  background-color: #fff;

  img {
    position: absolute;
    top: 5%;
    left: 4%;
    width: 25px;
    height: 25px;
  }
`

const TipBox = () => {
  return (
    <Container>
      <div>
        <img src="/icons/check.png" alt="check" />
      </div>
      <div>
        유동인구는 30대가 많아 다양한 라이프스타일을 반영한 맞춤형 서비스나
        제품을 제공할 필요가 있어요.
      </div>
    </Container>
  )
}

export default TipBox
