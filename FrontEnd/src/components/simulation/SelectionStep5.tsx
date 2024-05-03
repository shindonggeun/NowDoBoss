import * as c from '@src/components/styles/simulation/StepStyle'
import { useNavigate } from 'react-router-dom'
import useSimulationStore, {
  subCategories,
  BuildingData,
  SubCategoryItem,
} from '@src/stores/simulationStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { StoreSizeDataBody } from '@src/types/SimulationType'
import { fetchStoreSize } from '@src/api/simulationApi'

interface Step5Props {
  nextStep: () => void
}

const SelectionStep5 = ({ nextStep }: Step5Props) => {
  const navigate = useNavigate()
  const {
    category,
    subCategory,
    bulidingSize,
    setBulidingSize,
    floor,
    setFloor,
    updateStoreSize,
    setUpdateStoreSize,
  } = useSimulationStore()

  const categoryObj: SubCategoryItem | undefined = subCategories[category].find(
    target => target.name === subCategory,
  )
  const categoryCode = categoryObj ? categoryObj.code : ''

  const { data, isLoading, refetch } = useQuery<StoreSizeDataBody>({
    queryKey: ['SimulationStoreSize'],
    queryFn: () => fetchStoreSize(categoryCode),
  })

  let respons = data ? data.dataBody : updateStoreSize

  useEffect(() => {
    refetch()
    if (!isLoading && data) {
      setUpdateStoreSize(data?.dataBody)
      respons = data.dataBody
    }
  }, [refetch, subCategory])

  const goReportPage = () => {
    nextStep()
    navigate('/simulation/report')
  }

  return (
    <div>
      {!isLoading && data ? (
        <c.Container>
          <c.Title>
            <c.Emphasis>매장크기</c.Emphasis>를 선택해 주세요
          </c.Title>
          <c.BuildingContainer>
            {Object.keys(respons!).map(size => (
              <c.SelectButtonLarge
                key={size}
                size="lg"
                type="button"
                onClick={() => {
                  // @ts-ignore
                  setBulidingSize(respons[size].squareMeter)
                }}
                // @ts-ignore
                selected={bulidingSize === respons[size].squareMeter}
              >
                <c.BuildingImg src={BuildingData[size].img} alt="building" />
                <c.BuildingSize>
                  {
                    // @ts-ignore
                    respons[size].pyeong
                  }
                  ㎡ (
                  {
                    // @ts-ignore
                    respons[size].squareMeter
                  }
                  )평
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
                  setFloor(value)
                  // nextStep()
                }}
              >
                {value}
              </c.SelectButton>
            ))}
          </c.FloorContainer>

          <c.GoReportContainer>
            {bulidingSize === 0 || floor === '' ? null : (
              <c.GoReportButton type="button" onClick={goReportPage}>
                분석 레포트 받아보기
              </c.GoReportButton>
            )}
          </c.GoReportContainer>
        </c.Container>
      ) : (
        <div>데이터 로딩중</div>
      )}
    </div>
  )
}

export default SelectionStep5
