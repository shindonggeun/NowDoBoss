import * as c from '@src/components/styles/simulation/StepStyle'
import { useNavigate } from 'react-router-dom'
import useSimulationStore, {
  subCategories,
  BuildingData,
  SubCategoryItem,
} from '@src/stores/simulationStore'
import useReportStore from '@src/stores/reportStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import {
  SimulationDataType,
  StoreSizeDataBody,
} from '@src/types/SimulationType'
import { fetchStoreSize, reportCreate } from '@src/api/simulationApi'

const SelectionStep5 = () => {
  const navigate = useNavigate()
  const {
    isFranchise,
    brandName,
    category,
    subCategoryName,
    subCategoryCode,
    bulidingSize,
    setBulidingSize,
    floor,
    setFloor,
    updateStoreSize,
    setUpdateStoreSize,
  } = useSimulationStore()
  const { sigungu } = useReportStore()

  const categoryObj: SubCategoryItem | undefined = subCategories[category].find(
    target => target.name === subCategoryName,
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      respons = data.dataBody
    }
  }, [refetch, subCategoryName])

  // 레포트 생성
  const { mutate: mutateCreateReport } = useMutation({
    mutationFn: reportCreate,
    onSuccess: res => {
      navigate('/simulation/report', { state: { res } })
    },
    onError: error => {
      console.error(error)
    },
  })

  const goReportPage = () => {
    const reportCreateData: SimulationDataType = {
      isFranchisee: isFranchise,
      brandName,
      gugun: sigungu,
      serviceCode: subCategoryCode,
      serviceCodeName: subCategoryName,
      storeSize: bulidingSize,
      floor,
    }
    console.log(reportCreateData)
    mutateCreateReport(reportCreateData)
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
