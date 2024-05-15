import * as c from '@src/components/styles/simulation/CompareModalStyle.tsx'
import IconButton from '@mui/joy/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Modal from '@mui/joy/Modal'
import List from '@mui/joy/List'
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog'
import ModalClose from '@mui/joy/ModalClose'
import DialogTitle from '@mui/joy/DialogTitle'
// import ListItem from '@mui/joy/ListItem'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import ContainerBox from '@src/common/ContainerBox.tsx'
import CompareTop from '@src/components/simulation/compare/CompareTop'
import {
  SimulationDataType,
  SimulationReportCompareData,
  SimulationSaveBody,
} from '@src/types/SimulationType'
import { fetchSavedList, reportCreate } from '@src/api/simulationApi.tsx'
import CompareList from '@src/components/simulation/compare/CompareList.tsx'

interface ModalType {
  layout: ModalDialogProps['layout'] | undefined
  setLayout: (layout: ModalDialogProps['layout']) => void
}

const SimulationReportCompare = ({ layout, setLayout }: ModalType) => {
  const navigate = useNavigate()
  const [firstSelected, setFirstSelected] = useState<number | null>(null)
  const [firstReportData, setFirstReportData] =
    useState<SimulationReportCompareData | null>(null)
  const [secondSelected, setSecondSelected] = useState<number | null>(null)
  const [secondReportData, setSecondReportData] =
    useState<SimulationReportCompareData | null>(null)

  useEffect(() => {
    setLayout('center')
  }, [])

  // 시뮬레이션 목록 리스트 조회
  const { data, isLoading } = useQuery<SimulationSaveBody>({
    queryKey: ['SavedSimulationLists'],
    queryFn: () => fetchSavedList(),
  })

  // 레포트 생성
  const { mutate: mutateCreateReport } = useMutation({
    mutationFn: reportCreate,
    onSuccess: (res, variables) => {
      if (variables.selectedType === 'first') {
        setFirstReportData(res)
      } else if (variables.selectedType === 'second') {
        setSecondReportData(res)
      }
    },
    onError: error => {
      console.error(error)
    },
  })

  // 첫번째 선택목록 반환 데이터
  useEffect(() => {
    if (data && firstSelected !== null) {
      const reportCreateData: SimulationDataType = {
        isFranchisee: data.dataBody[firstSelected].isFranchisee,
        brandName: data.dataBody[firstSelected].brandName,
        gugun: data.dataBody[firstSelected].gugun,
        serviceCode: data.dataBody[firstSelected].serviceCode,
        serviceCodeName: data.dataBody[firstSelected].serviceCode,
        storeSize: data.dataBody[firstSelected].storeSize,
        floor: data.dataBody[firstSelected].floor,
        selectedType: 'first',
      }

      mutateCreateReport(reportCreateData)
    }
    // console.log(firstReportData?.dataBody, '-----')
  }, [firstSelected])

  // 두번째 선택목록 반환 데이터
  useEffect(() => {
    if (data && secondSelected !== null) {
      const reportCreateData: SimulationDataType = {
        isFranchisee: data.dataBody[secondSelected].isFranchisee,
        brandName: data.dataBody[secondSelected].brandName,
        gugun: data.dataBody[secondSelected].gugun,
        serviceCode: data.dataBody[secondSelected].serviceCode,
        serviceCodeName: data.dataBody[secondSelected].serviceCode,
        storeSize: data.dataBody[secondSelected].storeSize,
        floor: data.dataBody[secondSelected].floor,
        selectedType: 'second',
      }

      mutateCreateReport(reportCreateData)
    }
    // console.log(secondReportData?.dataBody, '-----')
  }, [secondSelected])

  return (
    <Modal
      style={{ zIndex: 1200, backgroundColor: 'rgba(0, 0, 0, 0)' }}
      open={!!layout}
      // onClose={() => {
      //   setLayout(undefined)
      // }}
    >
      <ModalDialog layout={layout} sx={{ maxWidth: '700px', width: '70%' }}>
        <ContainerBox height={30} />
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

        <c.BodyContainer>
          <c.BodyContainerRight>
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
              <c.CheckContainer>
                {firstReportData !== null && (
                  <CompareList ReportData={firstReportData.dataBody} />
                )}
                <c.BodyContainerLeft>
                  <c.TextCenter>
                    <c.BodyContainerText>전체 창업 비용</c.BodyContainerText>
                    <c.BodyContainerText>임대료</c.BodyContainerText>
                    <c.BodyContainerText>보증금</c.BodyContainerText>
                    <c.BodyContainerText>인테리어 비용</c.BodyContainerText>
                    <c.BodyContainerText>가맹 부담금</c.BodyContainerText>
                    <c.BodyContainerText>권리금</c.BodyContainerText>
                  </c.TextCenter>
                </c.BodyContainerLeft>

                {secondReportData !== null && (
                  <CompareList ReportData={secondReportData.dataBody} />
                )}
              </c.CheckContainer>
            </List>
          </c.BodyContainerRight>
        </c.BodyContainer>
      </ModalDialog>
    </Modal>
  )
}

export default SimulationReportCompare
