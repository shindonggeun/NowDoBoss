import styled from 'styled-components'
import bookMark from '@src/assets/bookmark.svg'

const Header = styled.div`
  background-color: #236cff;
  color: white;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 10px 10px 5px 10px;
  border-top-right-radius: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: 680px) {
    border-top-left-radius: 15px;
    border-bottom-right-radius: 0;
    box-shadow: none;
  }
`

const Icon = styled.img``

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`
const Content = styled.div``

const Title = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
`
const SubTitle = styled.div`
  font-size: 0.9rem;
  padding: 0 0 5px;
`
const CloseButton = styled.div`
  background-color: #e2ebf7;
  border-radius: 100%;

  color: #236cff;
  font-weight: 600;
  width: 2.2rem;
  height: 2.2rem;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  &:hover {
    background-color: #cfdcff;
    color: #236cff;
  }

  &:active {
    background-color: #78a1ff;
    color: #e2ebf7;
    //box-shadow: 0 0 0 2px #e2ebf7;
  }
`

type SidebarHeaderPropsType = {
  title: string
  subTitle: string
  close: boolean
  // eslint-disable-next-line react/require-default-props
  setOpen?: (open: boolean) => void
  icon: boolean
}

const SidebarHeader = (props: SidebarHeaderPropsType) => {
  const { title, subTitle, close, setOpen, icon = '' } = props

  return (
    <Header>
      <Container>
        {icon && <Icon src={bookMark} />}
        <Content>
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </Content>
      </Container>
      {close && (
        <CloseButton onClick={() => setOpen && setOpen(false)}>Ⅹ</CloseButton>
      )}
    </Header>
  )
}
export default SidebarHeader
