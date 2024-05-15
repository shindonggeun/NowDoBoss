import * as c from '@src/components/styles/simulation/CompareModalStyle.tsx'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import IconButton from '@mui/joy/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Modal from '@mui/joy/Modal'
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog'
import ModalClose from '@mui/joy/ModalClose'
import DialogTitle from '@mui/joy/DialogTitle'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ContainerBox from '@src/common/ContainerBox.tsx'
import CompareTop from '@src/components/simulation/compare/CompareTop'
import { SimulationSaveBody } from '@src/types/SimulationType'
import { fetchSavedList } from '@src/api/simulationApi.tsx'

interface ModalType {
  layout: ModalDialogProps['layout'] | undefined
  setLayout: (layout: ModalDialogProps['layout']) => void
}

const SimulationReportCompare = ({ layout, setLayout }: ModalType) => {
  const navigate = useNavigate()
  const [firstSelected, setFirstSelected] = useState<number | null>(null)
  const [secondSelected, setSecondSelected] = useState<number | null>(null)
  console.log(firstSelected, secondSelected)
  useEffect(() => {
    setLayout('center')
  }, [])

  // 시뮬레이션 목록 리스트 조회
  const { data, isLoading } = useQuery<SimulationSaveBody>({
    queryKey: ['SavedSimulationLists'],
    queryFn: () => fetchSavedList(),
  })

  // 레포트 생성
  // const { mutate: mutateCreateReport } = useMutation({
  //   mutationFn: reportCreate,
  //   onSuccess: res => {
  //     navigate('/analysis/simulation/report', { state: { res } })
  //   },
  //   onError: error => {
  //     console.error(error)
  //   },
  // })

  return (
    <Modal
      style={{ zIndex: 1200, backgroundColor: 'rgba(0, 0, 0, 0)' }}
      open={!!layout}
      // onClose={() => {
      //   setLayout(undefined)
      // }}
    >
      <ModalDialog layout={layout} sx={{ maxWidth: '700px', width: '70%' }}>
        <ContainerBox height={150} />
        <ModalClose
          onClick={() => {
            navigate('/analysis')
          }}
        />
        <IconButton
          onClick={() => {
            navigate(-1)
          }}
          sx={{ position: 'absolute', left: '8px', top: '8px' }}
        >
          <ArrowBackIcon sx={{ maxWidth: '20px' }} />
        </IconButton>

        <DialogTitle
          sx={{
            position: 'absolute',
            left: '58px',
            top: '14px',
            fontFamily: 'pretendard',
          }}
        >
          창업 비용 비교하기
        </DialogTitle>
        {data && !isLoading && (
          <c.CheckContainer>
            <CompareTop
              savedList={data.dataBody}
              setSelected={setFirstSelected}
            />
            <CompareTop
              savedList={data.dataBody}
              setSelected={setSecondSelected}
            />
          </c.CheckContainer>
        )}

        <List
          sx={{
            overflow: 'scroll',
            mx: 'calc(-1 * var(--ModalDialog-padding))',
            px: 'var(--ModalDialog-padding)',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {[...Array(100)].map((_item, index) => (
            <ListItem key={index}>I&apos;m in a scrollable area.</ListItem>
          ))}
        </List>
      </ModalDialog>
    </Modal>
  )
}

export default SimulationReportCompare
