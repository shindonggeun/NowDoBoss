import * as r from '@src/components/styles/recommend/RecommendReportStyle'
import bookMark from '@src/assets/bookmark.svg'
import { RecommendCommercialType } from '@src/types/MapType'
import { useEffect } from 'react'

type RecommendReportPropsType = {
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
  data: RecommendCommercialType[]
  selectedTab: string
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>
  setSelectedData: React.Dispatch<React.SetStateAction<RecommendCommercialType>>
  handleTabClick: (name: string) => void
}

const RecommendHeader = (props: RecommendReportPropsType) => {
  const {
    setIsSubmit,
    data,
    selectedTab,
    setSelectedTab,
    setSelectedData,
    handleTabClick,
  } = props

  // 첫 번째 탭 선택되게 만드는 코드
  useEffect(() => {
    // 초기에 첫 번째 탭이 선택되도록 설정
    if (data.length > 0) {
      setSelectedTab(data[0].commercialCodeName)
      setSelectedData(data[0])
    }
  }, [data, setSelectedData, setSelectedTab]) // data가 변경될 때만 이 코드를 실행

  return (
    <r.Div>
      <r.FixedHeader>
        <r.Header>
          <r.HeaderContainer>
            <r.Icon src={bookMark} />
            <r.Content>
              <r.HeaderTitle>상권 추천 결과</r.HeaderTitle>
            </r.Content>
          </r.HeaderContainer>

          <r.CloseButton onClick={() => setIsSubmit && setIsSubmit(false)}>
            Ⅹ
          </r.CloseButton>
        </r.Header>
        <r.TabBox>
          {data.map((commercial, index) => {
            return (
              <r.Tab
                key={commercial.commercialCode}
                $selectedTab={selectedTab === commercial.commercialCodeName}
                onClick={() => {
                  handleTabClick(commercial.commercialCodeName)
                }}
              >
                {index + 1}. {commercial.commercialCodeName}
              </r.Tab>
            )
          })}
        </r.TabBox>
      </r.FixedHeader>
      {/* 경고문 */}
      <r.Notice>
        해당 보고서에서 제공하는 내용은 <b>추정정보</b>이므로 실제와 다를 수
        있기에, <b>사용자의 책임 하에 활용</b>하시기 바랍니다.
      </r.Notice>
    </r.Div>
  )
}

export default RecommendHeader
