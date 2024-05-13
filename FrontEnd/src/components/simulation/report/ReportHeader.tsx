import * as c from '@src/components/styles/simulation/SelectionStyle'
import * as h from '@src/containers/simulation/ReportStyle'
import SaveCheckIcon from '@src/assets/saveCheckMark.svg'
import SaveIcon from '@src/assets/saveMark.svg'
import CompareIcon from '@src/assets/compare.svg'
import Xmark from '@src/assets/xmark_solid_nomal.svg'
import { useState } from 'react'
import useSimulationStore from '@src/stores/simulationStore'
import useReportStore from '@src/stores/reportStore'
import { useMutation } from '@tanstack/react-query'
import { reportSave } from '@src/api/simulationApi'
import { SimulationSaveType } from '@src/types/SimulationType'

interface HeaderType {
  onClose: () => void
  onClickAlram: (data: boolean) => void
  totalPrice: number
}
const ReportHeader = ({ onClose, totalPrice, onClickAlram }: HeaderType) => {
  const {
    isFranchise,
    brandName,
    subCategoryName,
    subCategoryCode,
    bulidingSize,
    floor,
  } = useSimulationStore()
  const { sigungu } = useReportStore()
  const [isSaved, setIsSaved] = useState<boolean>(false)
  // 레포트 분석 저장
  const { mutate: mutateSaveReport } = useMutation({
    mutationFn: reportSave,
    onSuccess: () => {
      onClickAlram(true)
    },
    onError: error => {
      console.error(error)
    },
  })

  const onClickSave = () => {
    setIsSaved(!isSaved)
    const saveReportData: SimulationSaveType = {
      totalPrice,
      isFranchisee: isFranchise!,
      brandName,
      gugun: sigungu,
      serviceCode: subCategoryCode,
      serviceCodeName: subCategoryName,
      storeSize: bulidingSize,
      floor,
    }
    if (!isSaved) {
      mutateSaveReport(saveReportData)
    }
  }

  const onClickCompare = () => {
    console.log('비교하기 버튼...')
  }

  return (
    <c.SelctionHeader>
      <c.HeaderLeft>
        <c.HeaderTitle>창업 시뮬레이션</c.HeaderTitle>
      </c.HeaderLeft>
      <c.HeaderRight>
        <h.HeaderIcon onClick={onClickSave}>
          {isSaved ? (
            <h.SaveIcon src={SaveCheckIcon} alt="saveCheck" />
          ) : (
            <h.SaveIcon src={SaveIcon} alt="save" />
          )}
          저장하기
        </h.HeaderIcon>
        <h.HeaderIcon onClick={onClickCompare}>
          <h.CompareIcon src={CompareIcon} alt="compare" />
          비교하기
        </h.HeaderIcon>
        <c.CloseIcon src={Xmark} alt="close" onClick={onClose} />
      </c.HeaderRight>
    </c.SelctionHeader>
  )
}

export default ReportHeader
