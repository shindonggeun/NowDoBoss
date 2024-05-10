import * as r from '@src/components/styles/recommend/RecommendReportStyle'
import SidebarHeader from '@src/common/SidebarHeader'
import Divider from '@src/common/Divider'
import { useState } from 'react'
import MainButton from '@src/common/MainButton'
import ThreeBox from '@src/common/ThreeBox'
import BarChart from '@src/common/BarChart'
import { RecommendCommercialType } from '@src/types/MapType'

type RecommendReportPropsType = {
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
  data: RecommendCommercialType[]
}

const RecommendReport = (props: RecommendReportPropsType) => {
  const { setIsSubmit, data } = props
  const [selectedTab, setSelectedTab] = useState<string>('')
  const [selectedData, setSelectedData] = useState(data[0])

  const handleTabClick = (name: string) => {
    setSelectedTab(name)
    const tab = data.find(commercial => commercial.commercialCodeName === name)
    if (tab) {
      setSelectedData(tab)
    }
  }

  const roundNumber = (num: number, decimalPlaces: number) => {
    const factor = 10 ** decimalPlaces
    return Math.round(num * factor) / factor
  }

  return (
    <r.Container>
      <r.FixedHeader>
        <SidebarHeader
          title="상권 추천 결과"
          subTitle=""
          close
          setOpen={setIsSubmit}
          icon
          isOpen
        />
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
      <r.Notice>
        해당 보고서에서 제공하는 내용은 <b>추정정보</b>이므로 실제와 다를 수
        있기에, <b>사용자의 책임 하에 활용</b>하시기 바랍니다.
      </r.Notice>
      <r.Title>{selectedData.commercialCodeName} 비교</r.Title>
      <r.MainContent>
        <ThreeBox
          MainContent="유동 인구"
          AroundData={
            selectedData.footTrafficCommercialInfo.administrationFootTraffic
          }
          CurrentData={selectedData.footTrafficCommercialInfo.myFootTraffic}
          SeoulData={selectedData.footTrafficCommercialInfo.otherFootTraffic}
          Unit="명"
        />
        <ThreeBox
          MainContent="점포 수"
          AroundData={selectedData.storeCommercialInfo.administrationStores}
          CurrentData={selectedData.storeCommercialInfo.myStores}
          SeoulData={selectedData.storeCommercialInfo.otherStores}
          Unit="개"
        />
        <ThreeBox
          MainContent="폐업률"
          AroundData={roundNumber(
            selectedData.closedRateCommercialInfo.administrationClosedRate,
            2,
          )}
          CurrentData={roundNumber(
            selectedData.closedRateCommercialInfo.myClosedRate,
            2,
          )}
          SeoulData={roundNumber(
            selectedData.closedRateCommercialInfo.otherClosedRate,
            2,
          )}
          Unit="%"
        />
      </r.MainContent>{' '}
      <ThreeBox
        MainContent="매출"
        AroundData={selectedData.salesCommercialInfo.administrationSales / 4}
        CurrentData={selectedData.salesCommercialInfo.mySales / 4}
        SeoulData={selectedData.salesCommercialInfo.otherSales / 4}
        Unit="원"
      />
      <Divider />
      <r.BlueOcean>
        <r.BlueOceanTitle>블루오션</r.BlueOceanTitle>
        <r.SubContent>
          주변 상권에는 많지만 해당 상권에 적은 업종을 제안합니다.
        </r.SubContent>
      </r.BlueOcean>
      <r.Chart>
        <BarChart />
      </r.Chart>
      <MainButton buttonContent="해당 상권 분석 결과 보러가기" />
    </r.Container>
  )
}

export default RecommendReport
