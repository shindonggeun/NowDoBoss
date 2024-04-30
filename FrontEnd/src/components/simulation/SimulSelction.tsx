import { useState, useEffect, useRef } from 'react'
import * as c from '@src/components/styles/simulation/SelectionStyle'
import SelectionStep1 from '@src/components/simulation/SelectionStep1'
import SelectionStep2 from '@src/components/simulation/SelectionStep2'
import SelectionStep3 from '@src/components/simulation/SelectionStep3'
import SelectionStep4 from '@src/components/simulation/SelectionStep4'
import LeftArrow from '@src/assets/angle_left.svg'
import Xmark from '@src/assets/xmark_solid_nomal.svg'

interface SimulSelctionProps {
  open: boolean
  onClose: () => void
}

const SimulSelction = ({ open, onClose }: SimulSelctionProps) => {
  const [step, setStep] = useState<number>(1)
  const [isFranchise, setIsFranchise] = useState<boolean | null>(null)
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

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

  const onSelectedkFranchise = (choice: boolean) => {
    setIsFranchise(choice)
  }

  const onSelectedCategory = (choice: string) => {
    setCategory(choice)
  }

  const onSelectedSubCategory = (choice: string) => {
    setSubCategory(choice)
  }

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
          {/* <div>시뮬레이션 선택페이지</div> */}
          {step === 1 && (
            <c.FadeInContainer>
              <SelectionStep1
                nextStep={nextStep}
                isFranchise={isFranchise}
                onSelectedkFranchise={onSelectedkFranchise}
              />
            </c.FadeInContainer>
          )}
          {step === 2 && (
            <c.FadeInContainer>
              <SelectionStep2 nextStep={nextStep} />
            </c.FadeInContainer>
          )}
          {step === 3 && (
            <c.FadeInContainer>
              <SelectionStep3
                nextStep={nextStep}
                category={category}
                onSelectedCategory={onSelectedCategory}
              />
            </c.FadeInContainer>
          )}
          {step === 4 && (
            <c.FadeInContainer>
              <SelectionStep4
                nextStep={nextStep}
                category={category}
                subCategory={subCategory}
                onSelectedSubCategory={onSelectedSubCategory}
              />
            </c.FadeInContainer>
          )}
        </c.Contants>
      </c.Container>
    </c.Overlay>
  )
}

export default SimulSelction
