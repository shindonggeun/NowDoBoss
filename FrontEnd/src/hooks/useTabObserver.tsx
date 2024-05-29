import { useEffect, useRef } from 'react'

const useTabObserver = (
  setState: React.Dispatch<React.SetStateAction<number>>,
  stateNumber: number,
): React.MutableRefObject<HTMLDivElement | null> => {
  const isRef = useRef<HTMLDivElement>(null)
  const option = {
    threshold: 0,
    rootMargin: `-${document.body.scrollHeight / 2 - 1}px 0px`,
  }
  // const option = {}

  useEffect(() => {
    const observer = new IntersectionObserver(entry => {
      if (entry[0].isIntersecting) {
        setState(stateNumber)
      }
    }, option)

    if (isRef.current) {
      observer.observe(isRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return isRef
}

export default useTabObserver
