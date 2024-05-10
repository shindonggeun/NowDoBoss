import styled from 'styled-components'
import up_arrow from '@src/assets/arrow_up.svg'
import down_arrow from '@src/assets/arrow_down.svg'

const Container = styled.div`
  background-color: #f2f2f2;
  border: 2px solid #d9d9d9;
  margin: 10px 0;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 10px 10px 15px -5px rgba(0, 0, 0, 0.2);
`
const Image = styled.img`
  scale: 1.3;
`

type ReduceButtonPropsType = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ReduceButton = (props: ReduceButtonPropsType) => {
  const { isOpen, setIsOpen } = props

  return (
    <Container onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <Image src={up_arrow} /> : <Image src={down_arrow} />}
    </Container>
  )
}
export default ReduceButton
