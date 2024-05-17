import { AreaChartPropsType } from '@src/types/CommonPropsType'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  LogarithmicScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  LogarithmicScale,
)

const AreaChart = (props: AreaChartPropsType) => {
  const { labels, values } = props

  const data = {
    labels,
    datasets: [
      {
        label: '유동인구(명)',
        data: values,
        fill: true, // 면적 차트를 위한 설정
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        tension: 0.4, // 선 곡률 (0에서 1 사이의 값)
      },
    ],
  }

  const options = {
    responsive: true, // 차트가 반응형으로 동작하도록 설정
    // maintainAspectRatio: true, // 종횡비 유지 설정
    // hover했을 때 데이터 값이 보이도록 설정
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        type: 'logarithmic' as const,
        grid: {
          display: false,
        },
      },
    },
  }
  return <Line key={JSON.stringify(data)} options={options} data={data} />
}

export default AreaChart
