import * as c from '@src/components/styles/simulation/SelectionStyle'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
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

const SimulReportContainer = () => {
  const {
    setIsFranchise,
    setBrandName,
    setCategory,
    setSubCategoryName,
    setSubCategoryCode,
    setBulidingSize,
    setFloor,
  } = useSimulationStore()
  const { setAddress, setQuery, setSido, setSigungu } = useReportStore()
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

  const onClose = () => {
    setIsOpen(false)
    resetButton()
  }

  return (
    <div>
      {isOpen && (
        <c.Overlay>
          <c.Container>
            <ReportHeader onClose={onClose} />
            <ReportSummary ReportData={location.state.res.dataBody} />
            <ReportDetail ReportData={location.state.res.dataBody} />
            <c.SplitLine />
            <ReportKeyMoney ReportData={location.state.res.dataBody} />
            <c.SplitLine />
            <ReportMyGoal ReportData={location.state.res.dataBody} />
            <c.SplitLine />
            <ReportGender ReportData={location.state.res.dataBody} />
            <c.SplitLine />
            <ReportMonthAnalysis ReportData={location.state.res.dataBody} />
            <c.SplitLine />
            <ReportFranchise ReportData={location.state.res.dataBody} />
          </c.Container>
        </c.Overlay>
      )}
    </div>
  )
}

export default SimulReportContainer

// import * as c from '@src/components/styles/simulation/SelectionStyle'
// import { useEffect, useRef, useState } from 'react'
//
// const SimulReportContainer = () => {
//   const modalRef = useRef<HTMLDivElement>(null)
//   const [isOpen, setIsOpen] = useState(true)
//
//   const onClose = () => setIsOpen(false)
//
//   useEffect(() => {
//     const closeModal = (e: MouseEvent) => {
//       if (
//         isOpen &&
//         modalRef.current &&
//         !modalRef.current.contains(e.target as Node)
//       ) {
//         onClose()
//       }
//     }
//
//     document.addEventListener('mousedown', closeModal)
//     return () => {
//       document.removeEventListener('mousedown', closeModal)
//     }
//   }, [isOpen])
//
//   return (
//     <div>
//       {isOpen && (
//         <c.Overlay>
//           <c.Container ref={modalRef}>
//             <div>시뮬레이션 계산페이지</div>
//             <div>시뮬레이션 계산페이지</div>
//           </c.Container>
//         </c.Overlay>
//       )}
//     </div>
//   )
// }
//
// export default SimulReportContainer
