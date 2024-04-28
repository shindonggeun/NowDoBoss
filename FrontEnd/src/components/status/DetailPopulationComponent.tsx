import * as c from '@src/components/styles/status/DeatilComponentStyle'
import { DetailDataBody } from '@src/types/StatusType'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface DetailPopulationProps {
  props: DetailDataBody | undefined
}

const DetailPopulationComponent = ({ props }: DetailPopulationProps) => {
  console.log(props)
  const footTrafficDistrictListByPeriod = {
    summary: '증가',
    data: [
      { '20224': 114441017 },
      { '20231': 115242542 },
      { '20232': 112643302 },
      { '20233': 113105133 },
    ],
  }

  const labels = footTrafficDistrictListByPeriod.data.map(item => {
    const key = Object.keys(item)[0]
    const year = key.substring(0, 4)
    const quarter = key.substring(4)
    return `${year}-${quarter}분기`
  })

  const chartData = {
    labels,
    datasets: [
      {
        label: '유동인구',
        data: Object.values(footTrafficDistrictListByPeriod.data).map(
          item => Object.values(item)[0],
        ),
        backgroundColor: '#415FEB',
        // borderColor: '#415FEB',
        // borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '분기별 평균 유동인구',
      },
    },
  }

  return (
    <>
      <h1>유동인구 페이지</h1>
      <c.AnalysisTitle>분기별 평균 유동인구</c.AnalysisTitle>
      <c.AnalysisSubTitle>
        유동인구가 이전분기에 비해
        <c.AnalysiEemphasis>
          {footTrafficDistrictListByPeriod.summary}
        </c.AnalysiEemphasis>
        하고 있습니다.
      </c.AnalysisSubTitle>
      <c.ChartDataContainer>
        <Bar data={chartData} options={chartOptions} />
      </c.ChartDataContainer>
    </>
  )
}

export default DetailPopulationComponent
