import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;
`
const Top = styled.button`
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: #fff;
  color: #000;
  border: 1px solid rgb(202, 190, 169);
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &:hover {
    color: rgb(103, 151, 218);
  }
`

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false)

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    })
  }
  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleShowButton)
    return () => {
      window.removeEventListener('scroll', handleShowButton)
    }
  }, [])

  return (
    showButton && (
      <Container>
        <Top onClick={scrollToTop} type="button">
          Top
        </Top>
      </Container>
    )
  )
}

export default ScrollToTopButton
