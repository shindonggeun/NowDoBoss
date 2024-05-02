import * as c from '@src/components/styles/simulation/SelectionStyle'
import ReportSummary from '@src/components/simulation/report/ReportSummary'
import ReportHeader from '@src/components/simulation/report/ReportHeader'
import { useState } from 'react'

const SimulReportContainer = () => {
  const [isOpen, setIsOpen] = useState(true)

  const onClose = () => setIsOpen(false)

  return (
    <div>
      {isOpen && (
        <c.Overlay>
          <c.Container>
            <ReportHeader onClose={onClose} />
            <ReportSummary />
            <div>
              <div>예상비용 상세</div>
              <div>아래의 비용들을 더해 계산했어요</div>
            </div>
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
