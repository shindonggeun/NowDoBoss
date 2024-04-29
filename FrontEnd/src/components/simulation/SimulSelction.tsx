import { useState, useEffect, useRef } from 'react'
import * as c from '@src/components/styles/simulation/SelectionStyle'
import LeftArrow from '@src/assets/angle_left.svg'
import Xmark from '@src/assets/xmark_solid_nomal.svg'
import SelectionStep1 from '@src/components/simulation/SelectionStep1'
import SelectionStep2 from '@src/components/simulation/SelectionStep2'
import SelectionStep3 from '@src/components/simulation/SelectionStep3'

interface SimulSelctionProps {
  open: boolean
  onClose: () => void
}

const SimulSelction = ({ open, onClose }: SimulSelctionProps) => {
  const [step, setStep] = useState<number>(1)
  const [category, setCategory] = useState('')
  const [isFranchise, setIsFranchise] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  console.log(category, isFranchise, setCategory, setIsFranchise)
  const nextStep = () => {
    setStep(prev => prev + 1)
  }

  const prevStep = () => {
    setStep(next => next - 1)
  }

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (
        open &&
        modalRef.current &&
        !modalRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', closeModal)
    return () => {
      document.removeEventListener('mousedown', closeModal)
    }
  }, [onClose, open])

  return (
    <c.Overlay>
      <c.Container ref={modalRef}>
        <c.SelctionHeader>
          {step > 1 ? (
            <c.PrevIcon src={LeftArrow} alt="prev" onClick={() => prevStep()} />
          ) : null}
          <c.HeaderTitle>창업 시뮬레이션</c.HeaderTitle>
          <c.CloseIcon src={Xmark} alt="close" onClick={onClose} />
        </c.SelctionHeader>
        <c.Contants>
          <div>시뮬레이션 선택페이지</div>
          {step === 1 && <SelectionStep1 nextStep={nextStep} />}
          {step === 2 && <SelectionStep2 nextStep={nextStep} />}
          {step === 3 && <SelectionStep3 nextStep={nextStep} />}
        </c.Contants>
      </c.Container>
    </c.Overlay>
  )
}

export default SimulSelction
