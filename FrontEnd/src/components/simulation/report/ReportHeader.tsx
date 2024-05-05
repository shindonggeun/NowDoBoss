import * as c from '@src/components/styles/simulation/SelectionStyle'
import * as h from '@src/containers/simulation/ReportStyle'
import SaveCheckIcon from '@src/assets/saveCheckMark.svg'
import SaveIcon from '@src/assets/saveMark.svg'
import CompareIcon from '@src/assets/compare.svg'
import Xmark from '@src/assets/xmark_solid_nomal.svg'
import { useState } from 'react'
import useSimulationStore from '@src/stores/simulationStore'

interface HeaderType {
  onClose: () => void
}
const ReportHeader = ({ onClose }: HeaderType) => {
  const { isFranchise, brandName } = useSimulationStore()
  const [isSaved, setIsSaved] = useState<boolean>(false)

  const onClickSave = () => {
    setIsSaved(!isSaved)
  }

  return (
    <c.SelctionHeader>
      <c.HeaderLeft>
        <c.HeaderTitle>
          {isFranchise ? brandName : ''} 창업 시뮬레이션
        </c.HeaderTitle>
      </c.HeaderLeft>
      <c.HeaderRignt>
        <h.HeaderIcon onClick={onClickSave}>
          {isSaved ? (
            <h.SaveIcon src={SaveCheckIcon} alt="saveCheck" />
          ) : (
            <h.SaveIcon src={SaveIcon} alt="save" />
          )}
          저장하기
        </h.HeaderIcon>
        <h.HeaderIcon onClick={() => {}}>
          <h.CompareIcon src={CompareIcon} alt="compare" />
          비교하기
        </h.HeaderIcon>
        <c.CloseIcon src={Xmark} alt="close" onClick={onClose} />
      </c.HeaderRignt>
    </c.SelctionHeader>
  )
}

export default ReportHeader
