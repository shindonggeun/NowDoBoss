import SimulSelction from '@src/components/simulation/SimulSelction'
import { useState } from 'react'

const StatusPage = () => {
  const [isOpen, setIsOpen] = useState(true)

  const onClickClose = () => setIsOpen(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        시뮬레이션 버튼
      </button>

      {isOpen && <SimulSelction open={isOpen} onClose={onClickClose} />}
    </>
  )
}

export default StatusPage
