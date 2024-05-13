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
import { useMutation } from '@tanstack/react-query'
import { reportSave } from '@src/api/simulationApi'
import { SimulationSaveType } from '@src/types/SimulationType'

const SimulReportContainer = () => {
  const {
    setIsFranchise,
    setBrandName,
    setCategory,
    setSubCategoryName,
    setSubCategoryCode,
    setBulidingSize,
    setFloor,
    isFranchise,
    brandName,
    subCategoryName,
    subCategoryCode,
    bulidingSize,
    floor,
  } = useSimulationStore()
  const { setAddress, setQuery, setSido, setSigungu, sigungu } =
    useReportStore()
  const location = useLocation()

  const resetButton = () => {
    setIsFranchise(null)
    setBrandName(null)
    setCategory('')
    setSubCategoryName('')
    setSubCategoryCode('')
    setBulidingSize(0)
    setFloor('')
    setAddress('')
    setQuery('')
    setSido('')
    setSigungu('')
  }

  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  const onClose = () => {
    setIsOpen(false)
    resetButton()
    navigate('/analysis')
  }

  // 레포트 분석 저장
  const { mutate: mutateSaveReport } = useMutation({
    mutationFn: reportSave,
    onSuccess: () => {
      console.log('저장 완료!')
    },
    onError: error => {
      console.error(error)
    },
  })

  const [spinner, setSpinner] = useState(true)
  useEffect(() => {
    const saveReportData: SimulationSaveType = {
      totalPrice: location.state.res.dataBody.totalPrice,
      isFranchisee: isFranchise!,
      brandName,
      gugun: sigungu,
      serviceCode: subCategoryCode,
      serviceCodeName: subCategoryName,
      storeSize: bulidingSize,
      floor,
    }
    console.log(saveReportData)
    mutateSaveReport(saveReportData)

    setTimeout(() => {
      setSpinner(false)
    }, 2000)
  }, [])

  return (
    <div>
      {isOpen && (
        <c.Overlay>
          <c.Container>
            <ReportHeader onClose={onClose} />
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
              </c.FadeInContainer>
            )}
          </c.Container>
        </c.Overlay>
      )}
    </div>
  )
}

export default SimulReportContainer
