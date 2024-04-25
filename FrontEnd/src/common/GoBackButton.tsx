import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import arrow_left from '@src/assets/arrow_left.svg'

const BackButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  &:hover {
    img {
      scale: 1;
    }
    div {
      font-weight: 600;
      font-size: 18px;
    }
  }
`
const BackIcon = styled.img`
  scale: 0.8;
  color: red;
`

const GoBack = styled.div`
  font-weight: 500;
`
const GoBackButton = () => {
  const navigate = useNavigate()

  return (
    <BackButton>
      <BackIcon src={arrow_left} />
      <GoBack
        onClick={() => {
          navigate(-1)
        }}
      >
        목록으로 돌아가기
      </GoBack>
    </BackButton>
  )
}

export default GoBackButton
