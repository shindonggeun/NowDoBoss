import * as h from '@src/components/styles/AnalysisSidebarTopStyle'

const AnalysisSidebarTopComponent = () => {
  type DataItem = { name: string; num: number; percent: number }
  const data: DataItem[] = [
    { name: '강동구', num: 20000, percent: 12.4 },
    { name: '강남구', num: 16346, percent: 6.3 },
    { name: '종로구', num: 16664, percent: 23.5 },
    { name: '종로구', num: 16664, percent: 23.5 },
    { name: '종로구', num: 16664, percent: 23.5 },
    { name: '종로구', num: 16664, percent: 23.5 },
    { name: '종로구', num: 16664, percent: 23.5 },
    { name: '종로구', num: 16664, percent: 23.5 },
    { name: '종로구', num: 16664, percent: 23.5 },
    { name: '종로구', num: 16664, percent: 23.5 },
  ]

  return (
    <>
      <h.Container>매출 높은 동네 Top10</h.Container>
      {data.map((item, i) => (
        <h.Item key={i}>
          <h.Name>
            {i + 1}. {item.name}
          </h.Name>
          <h.Num>{item.num}천</h.Num>
          <h.Percent>{item.percent}%</h.Percent>
        </h.Item>
      ))}
    </>
  )
}

export default AnalysisSidebarTopComponent
