import styled, { keyframes } from 'styled-components'

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  width: 300px;
  height: 240px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 13px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s linear;
  position: relative;
  overflow: hidden;
`

const Svg = styled.div`
  width: 50px;
  height: 50px;
  margin-top: 5px;

  img {
    width: 100%;
    height: 100%;
  }
`

const CookieHeading = styled.p`
  font-size: 1.2rem;
  font-weight: 800;
  color: rgb(26, 26, 26);
`

const CookieDescription = styled.p`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgb(99, 99, 99);
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
`

const AcceptButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: #7b57ff;
  transition-duration: 0.2s;
  border: none;
  color: rgb(241, 241, 241);
  cursor: pointer;
  font-weight: 600;
  border-radius: 20px;
  box-shadow:
    0 4px 6px -1px #977ef3,
    0 2px 4px -1px #977ef3;
  transition: all 0.6s ease;

  &:hover {
    background-color: #9173ff;
    box-shadow:
      0 10px 15px -3px #977ef3,
      0 4px 6px -2px #977ef3;
    transition-duration: 0.2s;
  }
`

const DeclineButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: #dadada;
  transition-duration: 0.2s;
  color: rgb(46, 46, 46);
  border: none;
  cursor: not-allowed;
  font-weight: 600;
  border-radius: 20px;
  box-shadow:
    0 4px 6px -1px #bebdbd,
    0 2px 4px -1px #bebdbd;
  transition: all 0.6s ease;

  &:hover {
    background-color: #ebebeb;
    box-shadow:
      0 10px 15px -3px #bebdbd,
      0 4px 6px -2px #bebdbd;
    transition-duration: 0.2s;
  }
`

interface SaveModalProps {
  title: string
  content: string
  onClose: () => void
  onConfirm: () => void
}

const SaveModal = (props: SaveModalProps) => {
  const { title, content, onClose, onConfirm } = props

  return (
    <ModalBackground>
      <ModalContainer>
        <Svg>
          <img src="/icons/bookmarks.png" alt="" />
        </Svg>
        <CookieHeading>{title}</CookieHeading>
        <CookieDescription>{content}</CookieDescription>
        <ButtonContainer>
          <AcceptButton onClick={onClose}>확인</AcceptButton>
          <DeclineButton onClick={onConfirm}>보관함 이동</DeclineButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalBackground>
  )
}
export default SaveModal
