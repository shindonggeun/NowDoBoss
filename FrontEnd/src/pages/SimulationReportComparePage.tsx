import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import ReportCompare from '@src/components/simulation/report/ReportCompare'
import { ModalDialogProps } from '@mui/joy/ModalDialog'

const StatusPage = () => {
  const [layout, setLayout] = useState<ModalDialogProps['layout'] | undefined>(
    undefined,
  )
  // const navigate = useNavigate()

  return (
    <div>
      <ReportCompare layout={layout} setLayout={setLayout} />
    </div>
  )
}

export default StatusPage
