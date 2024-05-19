import * as p from '@src/components/styles/profile/ProfileStyle'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  SimulationDataTypes,
  SimulationSaveBody,
} from '@src/types/SimulationType'
import { fetchSavedList, reportCreates } from '@src/api/simulationApi'
import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'

const SimulationBookmarksContainer = () => {
  const navigate = useNavigate()
  // const [page, setPage] = useState(0)

  // 시뮬레이션 목록 리스트 조회 - 무한스크롤 처리
  const { data, isLoading } = useQuery<SimulationSaveBody>({
    queryKey: ['SavedSimulationLists'],
    queryFn: () => fetchSavedList(0, 9),
  })

  let ReportData
  // let PageInfo
  if (data) {
    ReportData = data.dataBody.data
    // PageInfo = data.dataBody.pageInfo
  }

  // 결과 페이지 이동
  const { mutate: mutateCreateReport } = useMutation({
    mutationFn: reportCreates,
    onSuccess: res => {
      navigate('/analysis/simulation/report', { state: { res } })
    },
    onError: error => {
      console.error(error)
    },
  })

  return (
    <div>
      {!isLoading && data ? (
        <div>
          <p.CardWrapper>
            {ReportData!.map(item => {
              const BrandName =
                item.brandName !== null ? item.brandName : '개인 창업'

              let TotalPrice
              if (item.totalPrice >= 10000) {
                const billions = Math.floor(item.totalPrice / 10000)
                const millions = Math.floor(item.totalPrice % 10000)
                TotalPrice = `${billions}억 ${millions.toLocaleString()} 만원`
              } else {
                TotalPrice = `${item.totalPrice.toLocaleString()} 만원`
              }

              const goReportPage = () => {
                const reportCreateData: SimulationDataTypes = {
                  isFranchisee: item.isFranchisee,
                  brandName: item.brandName,
                  gugun: item.gugun,
                  serviceCode: item.serviceCode,
                  serviceCodeName: item.serviceCodeName,
                  storeSize: item.storeSize,
                  floor: item.floor,
                }

                mutateCreateReport(reportCreateData)
              }

              return (
                <p.Card key={item.id} $width={270} onClick={goReportPage}>
                  <p.CardTitle>{BrandName}</p.CardTitle>
                  <p.CardTitle>
                    예상 창업비용{' '}
                    <p.CardTitleEmphasis>{TotalPrice}</p.CardTitleEmphasis>
                  </p.CardTitle>

                  <p.CardContent $marginTop={20}>
                    {item.serviceCodeName}, {item.gugun}, {item.storeSize}㎡,{' '}
                    {item.floor}
                  </p.CardContent>
                  {/* <p.CardDate $marginTop={10}>2022.02.22</p.CardDate> */}
                  <p.CardArrow>
                    <p.ArrowSVG>
                      <path d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z" />
                    </p.ArrowSVG>
                  </p.CardArrow>
                </p.Card>
              )
            })}
          </p.CardWrapper>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}

export default SimulationBookmarksContainer
