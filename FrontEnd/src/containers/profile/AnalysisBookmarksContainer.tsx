import { useQuery } from '@tanstack/react-query'
import { GetAnalysisBookmarks } from '@src/api/analysisApi'
import { AnalysisBookmarksResDataType } from '@src/types/AnalysisType'
import * as p from '@src/components/styles/profile/ProfileStyle'
// import { useNavigate } from 'react-router-dom'

const AnalysisBookmarksContainer = () => {
  // const navigate = useNavigate()

  const { data: AnalysisBookmarksList } = useQuery({
    queryKey: ['getAnalysisBookmarks'],
    queryFn: () => GetAnalysisBookmarks(0, 9),
  })

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // 24시간 형태로 표시합니다.
    }

    const formattedDate = date.toLocaleDateString('ko-KR', dateOptions)
    const formattedTime = date.toLocaleTimeString('ko-KR', timeOptions)

    return `${formattedDate} ${formattedTime}`
  }
  //
  // const handleGoResult = (item: AnalysisBookmarksResDataType) => {
  //   const selectedGoo = {
  //     code: Number(item.districtCode),
  //     name: item.districtCodeName,
  //   }
  //
  //   const selectedDong = {
  //     code: Number(item.administrationCode),
  //     name: item.administrationCodeName,
  //   }
  //
  //   const selectedCommercial = {
  //     code: Number(item.commercialCode),
  //     name: item.commercialCodeName,
  //   }
  //
  //   const selectedService = {
  //     serviceType: item.serviceType,
  //     serviceCode: item.serviceCode,
  //     serviceCodeName: item.serviceCodeName,
  //   }
  //
  //   navigate('/analysis', {
  //     state: { selectedGoo, selectedDong, selectedCommercial, selectedService },
  //   })
  // }

  return (
    <div>
      {AnalysisBookmarksList ? (
        <p.CardWrapper>
          {AnalysisBookmarksList.dataBody.data.map(
            (item: AnalysisBookmarksResDataType, index: number) => (
              <p.Card key={index} $width={270}>
                <p.CardContent $marginTop={5}>
                  {item.serviceCodeName}
                </p.CardContent>
                <p.CardTitle>{item.commercialCodeName}</p.CardTitle>
                <p.CardContent $marginTop={5}>
                  {item.districtCodeName} {item.administrationCodeName}
                </p.CardContent>
                <p.CardDate $marginTop={5}>
                  {formatDateTime(item.createdAt)}
                </p.CardDate>
                <p.CardArrow>
                  <p.ArrowSVG>
                    <path d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z" />
                  </p.ArrowSVG>
                </p.CardArrow>
              </p.Card>
            ),
          )}
        </p.CardWrapper>
      ) : (
        <div>저장 목록이 없습니다.</div>
      )}
    </div>
  )
}

export default AnalysisBookmarksContainer
