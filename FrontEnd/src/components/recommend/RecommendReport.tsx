import * as r from '@src/components/styles/recommend/RecommendReportStyle'
import SidebarHeader from '@src/common/SidebarHeader'
import Divider from '@src/common/Divider'
import { useState } from 'react'
import MainButton from '@src/common/MainButton'
import ThreeBox from '@src/common/ThreeBox'
import BarChart from '@src/common/BarChart'

const DistrictData = [
  {
    id: 1,
    name: '상권1',
    placeCountAverage: 12,
    placeCountCurrent: 10,
    takeAverage: 350,
    takeCurrent: 400,
    closeAverage: 12,
    closeCurrent: 5,
  },
  {
    id: 2,
    name: '상권2',
    placeCountAverage: 23,
    placeCountCurrent: 15,
    takeAverage: 750,
    takeCurrent: 456,
    closeAverage: 15,
    closeCurrent: 8,
  },
  {
    id: 3,
    name: '상권3',
    placeCountAverage: 36,
    placeCountCurrent: 42,
    takeAverage: 754,
    takeCurrent: 576,
    closeAverage: 25,
    closeCurrent: 17,
  },
]

type RecommendReportPropsType = {
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
}

const RecommendReport = (props: RecommendReportPropsType) => {
  const { setIsSubmit } = props
  const [selectedTab, setSelectedTab] = useState<string>('상권1')
  const [selectedData, setSelectedData] = useState(DistrictData[0])

  const handleTabClick = (name: string) => {
    setSelectedTab(name)
    const data = DistrictData.find(district => district.name === name)
    if (data) {
      setSelectedData(data)
    }
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
          {DistrictData.map(district => (
            <r.Tab
              key={district.id}
              $selectedTab={selectedTab === district.name}
              onClick={() => {
                handleTabClick(district.name)
              }}
            >
              {district.id}. {district.name}
            </r.Tab>
          ))}
        </r.TabBox>
      </r.FixedHeader>
      <r.Notice>
        해당 보고서에서 제공하는 내용은 <b>추정정보</b>이므로 실제와 다를 수
        있기에, <b>사용자의 책임 하에 활용</b>하시기 바랍니다.
      </r.Notice>
      <r.Title>{selectedData.name} 비교</r.Title>
      <r.MainContent>
        <ThreeBox
          MainContent="점포수"
          AroundData={selectedData.placeCountAverage}
          CurrentData={selectedData.placeCountCurrent}
          Unit="개"
        />
        <ThreeBox
          MainContent="매출액"
          AroundData={selectedData.takeAverage}
          CurrentData={selectedData.takeCurrent}
          Unit="만원"
        />
        <ThreeBox
          MainContent="폐업률"
          AroundData={selectedData.closeAverage}
          CurrentData={selectedData.closeCurrent}
          Unit="%"
        />
      </r.MainContent>
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
