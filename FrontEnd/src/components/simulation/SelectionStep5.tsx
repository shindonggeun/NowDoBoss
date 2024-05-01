import * as c from '@src/components/styles/simulation/StepStyle'
import { useNavigate } from 'react-router-dom'
import {
  subCategories,
  BuildingData,
  SubCategoryItem,
} from '@src/stores/simulationStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { StoreSize, StoreSizeDataBody } from '@src/types/SimulationType'
import { fetchStoreSize } from '@src/api/simulationApi'

interface Step5Props {
  nextStep: () => void
  bulidingSize: number
  onSelectedBulidingSize: (value: number) => void
  floor: string
  onSelectedFloor: (value: string) => void
  category: string
  subCategory: string
}

const SelectionStep5 = ({
  nextStep,
  bulidingSize,
  onSelectedBulidingSize,
  floor,
  onSelectedFloor,
  category,
  subCategory,
}: Step5Props) => {
  const navigate = useNavigate()

  const categoryObj: SubCategoryItem | undefined = subCategories[category].find(
    target => target.name === subCategory,
  )
  const categoryCode = categoryObj ? categoryObj.code : ''

  const { data, isLoading, refetch } = useQuery<StoreSizeDataBody>({
    queryKey: ['SimulationStoreSize'],
    queryFn: () => fetchStoreSize(categoryCode),
  })
  console.log(category, subCategory, categoryCode)
  console.log(data)
  useEffect(() => {
    refetch()
  }, [refetch, subCategory])

  interface BuildingType {
    [key: string]: {
      squareMeter: number
      pyeong: number
    }
  }

  const response: StoreSize = data!.dataBody
  const Buildings: BuildingType = response
  console.log(Object.keys(response).map(size => size))
  console.log(response)

  const goReportPage = () => {
    nextStep()
    navigate('/simulation/report')
  }

  return (
    <div>
      {!isLoading && data ? (
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
                <c.BuildingSizeTitle>
                  {BuildingData[size].name}
                </c.BuildingSizeTitle>
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

          <c.GoReportContainer>
            <c.GoReportButton
              type="button"
              onClick={goReportPage}
              disabled={bulidingSize === 0 || floor === ''}
            >
              분석 레포트 받아보기
            </c.GoReportButton>
          </c.GoReportContainer>
        </c.Container>
      ) : (
        <div>데이터 로딩중</div>
      )}
    </div>
  )
}

export default SelectionStep5
