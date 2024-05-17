import * as c from '@src/components/styles/simulation/SelectionStyle'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useSimulationStore from '@src/stores/simulationStore'
import useReportStore from '@src/stores/reportStore'
import ReportSummary from '@src/components/simulation/report/ReportSummary'
import ReportHeader from '@src/components/simulation/report/ReportHeader'
import ReportDetail from '@src/components/simulation/report/ReportDetail'
import ReportGender from '@src/components/simulation/report/ReportGender'
import ReportMonthAnalysis from '@src/components/simulation/report/ReportMonthAnalysis'
import ReportKeyMoney from '@src/components/simulation/report/ReportKeyMoney'
import ReportMyGoal from '@src/components/simulation/report/ReportMyGoal'
import ReportFranchise from '@src/components/simulation/report/ReportFranchise'
import SearchLoading from '@src/common/SearchLoading'
import ReportWarning from '@src/components/simulation/report/ReportWarning'
import Snackbar from '@mui/joy/Snackbar'

const SimulReportContainer = () => {
  const { resetSimulButton } = useSimulationStore()
  const { resetReportButton } = useReportStore()
  const location = useLocation()

  const resetButton = () => {
    resetSimulButton()
    resetReportButton()
  }

  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()
  const [alramOpen, setAlramOpen] = useState(false)

  const onClickAlram = (data: boolean) => {
    setAlramOpen(data)
  }

  const onClose = () => {
    setIsOpen(false)
    resetButton()
    navigate('/analysis')
  }

  const [spinner, setSpinner] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false)
    }, 1500)
  }, [])

  return (
    <div>
      {isOpen && (
        <c.Overlay>
          <c.Container>
            <ReportHeader
              onClose={onClose}
              onClickAlram={onClickAlram}
              ReportData={location.state.res.dataBody}
            />
            {spinner ? (
              <SearchLoading />
            ) : (
              <c.FadeInContainer>
                <ReportSummary ReportData={location.state.res.dataBody} />
                <ReportDetail ReportData={location.state.res.dataBody} />
                <c.SplitLine />
                <ReportKeyMoney ReportData={location.state.res.dataBody} />
                <c.SplitLine />
                <ReportGender ReportData={location.state.res.dataBody} />
                <c.SplitLine />
                <ReportMonthAnalysis ReportData={location.state.res.dataBody} />
                <c.SplitLine />
                <ReportMyGoal ReportData={location.state.res.dataBody} />
                <c.SplitLine />
                <ReportFranchise ReportData={location.state.res.dataBody} />
                <ReportWarning />
              </c.FadeInContainer>
            )}
          </c.Container>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={1100}
            open={alramOpen}
            variant="soft"
            color="primary"
            onClose={() => {
              setAlramOpen(false)
            }}
          >
            분석 결과가 저장되었습니다!
          </Snackbar>
        </c.Overlay>
      )}
    </div>
  )
}

export default SimulReportContainer
