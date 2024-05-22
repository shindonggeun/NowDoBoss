import { useState, useEffect } from 'react'

const useWindowWidth = () => {
  const [isWide, setIsWide] = useState(window.innerWidth >= 992)

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth >= 1015)
    }

    window.addEventListener('resize', handleResize)

    // 초기 값 설정
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isWide
}

export default useWindowWidth
