import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SimulSelction from '@src/components/simulation/SimulSelction'

const StatusPage = () => {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const onClickClose = () => {
    setIsOpen(false)
    navigate('/analysis')
  }

  return <>{isOpen && <SimulSelction open={isOpen} onClose={onClickClose} />}</>
}

export default StatusPage
