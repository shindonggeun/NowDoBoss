import * as c from '@src/components/styles/simulation/StepStyle'
import { useNavigate } from 'react-router-dom'
import { BuildingData } from '@src/stores/simulationStore'

interface Step5Props {
  nextStep: () => void
  bulidingSize: number
  onSelectedBulidingSize: (value: number) => void
  floor: string
  onSelectedFloor: (value: string) => void
}

const SelectionStep5 = ({
  nextStep,
  bulidingSize,
  onSelectedBulidingSize,
  floor,
  onSelectedFloor,
}: Step5Props) => {
  const navigate = useNavigate()

  interface BuildingType {
    [key: string]: {
      squareMeter: number
      pyeong: number
    }
  }

  const Buildings: BuildingType = {
    small: {
      squareMeter: 35,
      pyeong: 10,
    },
    medium: {
      squareMeter: 61,
      pyeong: 18,
    },
    large: {
      squareMeter: 86,
      pyeong: 26,
    },
  }

  const goReportPage = () => {
    nextStep()
    navigate('/simulation/report')
  }

  return (
    <c.Container>
      {/* <h1>setp5 페이지 입니다</h1> */}
      <c.Title>
        <c.Emphasis>매장크기</c.Emphasis>를 선택해 주세요
      </c.Title>
      <c.BuildingContainer>
        {Object.keys(Buildings).map(size => (
          <c.SelectButtonLarge
            key={size}
            size="lg"
            type="button"
            onClick={() => {
              onSelectedBulidingSize(Buildings[size].squareMeter)
            }}
            selected={bulidingSize === Buildings[size].squareMeter}
          >
            <c.BuildingImg src={BuildingData[size].img} alt="building" />
            <c.BuildingSize>
              {Buildings[size].pyeong}㎡ ({Buildings[size].squareMeter})평
            </c.BuildingSize>
            <c.BuildingSizeTitle>{BuildingData[size].name}</c.BuildingSizeTitle>
          </c.SelectButtonLarge>
        ))}
      </c.BuildingContainer>

      <c.Title>
        <c.Emphasis>층수</c.Emphasis>를 선택해 주세요
      </c.Title>
      <c.FloorContainer>
        {['1층', '1층이상'].map(value => (
          <c.SelectButton
            key={value}
            size="m"
            selected={floor === value}
            type="button"
            onClick={() => {
              onSelectedFloor(value)
              // nextStep()
            }}
          >
            {value}
          </c.SelectButton>
        ))}
      </c.FloorContainer>

      <c.GoReportButton type="button" onClick={goReportPage}>
        분석 레포트 받아보기
      </c.GoReportButton>
    </c.Container>
  )
}

export default SelectionStep5
