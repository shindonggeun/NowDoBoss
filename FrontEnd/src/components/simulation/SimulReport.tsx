import * as c from '@src/components/styles/simulation/SelectionStyle'
import * as h from '@src/components/styles/simulation/ReportStyle'
import Xmark from '@src/assets/xmark_solid_nomal.svg'
import { useState } from 'react'

const SimulReport = () => {
  const [isOpen, setIsOpen] = useState(true)

  const onClose = () => setIsOpen(false)

  return (
    <div>
      {isOpen && (
        <c.Overlay>
          <c.Container>
            <c.SelctionHeader>
              <c.HeaderLeft>
                <c.HeaderTitle>창업 시뮬레이션</c.HeaderTitle>
              </c.HeaderLeft>
              <c.HeaderRignt>
                <div>저장하기</div>
                <div>비교하기</div>
                <c.CloseIcon src={Xmark} alt="close" onClick={onClose} />
              </c.HeaderRignt>
            </c.SelctionHeader>
            <h.Container>
              <h.SummaryContainer>
                <div>핵심 요약 분석</div>
                <div>5,456만원</div>
                <div>
                  주변상권 및 업종을 반영하여 계산한 비용으로 실제와 다를 수
                  있습니다.
                </div>
                <div>지역</div>
                <div>종로구 부암동</div>
                <div>업종</div>
                <div>베이커리</div>
                <div>면적</div>
                <div>중형(47)</div>
                <div>층</div>
                <div>1층</div>
              </h.SummaryContainer>
            </h.Container>
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

export default SimulReport

// import * as c from '@src/components/styles/simulation/SelectionStyle'
// import { useEffect, useRef, useState } from 'react'
//
// const SimulReport = () => {
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
// export default SimulReport
