import { AreaChartPropsType } from '@src/types/ChartPropType'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
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
        backgroundColor: 'rgba(75,192,192,0.2)', // 차트 색상
        borderColor: 'rgba(75,192,192,1)', // 선 색상
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
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  }
  return <Line options={options} data={data} />
}

export default AreaChart
