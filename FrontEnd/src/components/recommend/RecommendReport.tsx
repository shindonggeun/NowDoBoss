import * as r from '@src/components/styles/recommend/RecommendReportStyle'
import SidebarHeader from '@src/common/SidebarHeader'
import Divider from '@src/common/Divider'
import { useState } from 'react'
import MainButton from '@src/common/MainButton'

type RecommendReportPropsType = {
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
}

const RecommendReport = (props: RecommendReportPropsType) => {
  const { setIsSubmit } = props
  const [selectedTab, setSelectedTab] = useState<string>('상권1')
  const DistrictData = [
    {
      id: 1,
      name: '상권1',
    },
    {
      id: 2,
      name: '상권2',
    },
    {
      id: 3,
      name: '상권3',
    },
  ]

  return (
    <r.Container>
      <SidebarHeader
        title="상권 추천 결과"
        subTitle=""
        close
        setOpen={setIsSubmit}
      />
      <r.TabBox>
        {DistrictData.map(district => (
          <r.Tab
            key={district.id}
            $selectedTab={selectedTab === district.name}
            onClick={() => {
              setSelectedTab(district.name)
            }}
          >
            {district.id}. {district.name}
          </r.Tab>
        ))}
      </r.TabBox>
      <r.Notice>
        해당 보고서에서 제공하는 내용은 <b>추정정보</b>이므로 실제와 다를 수
        있기에, <b>사용자의 책임 하에 활용</b>하시기 바랍니다.
      </r.Notice>
      <r.Title>000상권 비교</r.Title>
      <r.MainContent>
        <r.ComparisonContainer>
          <r.ComparisonTitle>점포수</r.ComparisonTitle>
          <r.ComparisonBox>
            00동 평균 점포수
            <r.ComparisonData>
              <r.Content>12</r.Content>개
            </r.ComparisonData>
          </r.ComparisonBox>
          <r.ComparisonBox>
            00상권 점포수
            <r.ComparisonData>
              <r.Content>10</r.Content>개
            </r.ComparisonData>
          </r.ComparisonBox>
          <r.ComparisonBox>
            타 상권 대비 점포수
            <r.ComparisonData>
              <r.Content>-2</r.Content>개
            </r.ComparisonData>
          </r.ComparisonBox>
        </r.ComparisonContainer>
        <r.ComparisonContainer>
          <r.ComparisonTitle>매출액</r.ComparisonTitle>
          <r.ComparisonBox>
            00동 평균 매출액
            <r.ComparisonData>
              <r.Content>350</r.Content>
              만원
            </r.ComparisonData>
          </r.ComparisonBox>
          <r.ComparisonBox>
            00상권 매출액
            <r.ComparisonData>
              <r.Content>400</r.Content>
              만원
            </r.ComparisonData>
          </r.ComparisonBox>
          <r.ComparisonBox>
            타 상권 대비 매출액
            <r.ComparisonData>
              <r.Content>+50</r.Content>
              만원
            </r.ComparisonData>
          </r.ComparisonBox>
        </r.ComparisonContainer>
        <r.ComparisonContainer>
          <r.ComparisonTitle>폐업률</r.ComparisonTitle>
          <r.ComparisonBox>
            00동 평균 폐업률
            <r.ComparisonData>
              <r.Content>12</r.Content>%
            </r.ComparisonData>
          </r.ComparisonBox>
          <r.ComparisonBox>
            00상권 폐업률
            <r.ComparisonData>
              <r.Content>5</r.Content>%
            </r.ComparisonData>
          </r.ComparisonBox>
          <r.ComparisonBox>
            타 상권 대비 폐업률
            <r.ComparisonData>
              <r.Content>+7</r.Content>%
            </r.ComparisonData>
          </r.ComparisonBox>
        </r.ComparisonContainer>
      </r.MainContent>
      <Divider />
      <r.BlueOcean>
        <r.Title>블루오션</r.Title>
        <r.SubContent>
          주변 상권에는 많지만 해당 상권에 적은 업종을 제안합니다.
        </r.SubContent>
      </r.BlueOcean>
      <r.Chart>표</r.Chart>
      <MainButton buttonContent="해당 상권 분석 결과 보러가기" />
    </r.Container>
  )
}

export default RecommendReport
