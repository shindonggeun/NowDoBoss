import { ComboChartPropsType } from '@src/types/CommonPropsType'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)
const ComboChart = (props: ComboChartPropsType) => {
  const { labels, value1, value2 } = props

  const backgroundColors = [
    'rgba(33, 150, 243, 0.2)',
    'rgba(156, 39, 176, 0.2',
    'rgba(76, 175, 80, 0.2)',
    ' rgba(255, 193, 7, 0.2)',
    'rgba(121, 85, 72, 0.2)',
    'rgba(96, 125, 139, 0.2) ',
  ]

  const borderColors = [
    'rgba(33, 150, 243, 1)',
    'rgba(156, 39, 176, 1)',
    'rgba(76, 175, 80, 1)',
    'rgba(255, 193, 7, 1)',
    'rgba(121, 85, 72, 1)',
    ' rgba(96, 125, 139, 1)',
  ]

  const data: ChartData<'bar' | 'line', number[], string> = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: '인구 수 (명)',
        data: value1,
        backgroundColor: value1.map((_, index) => backgroundColors[index]),
        borderColor: value1.map((_, index) => borderColors[index]),
        borderWidth: 0.5,
      },
      {
        type: 'line' as const,
        label: '비율 (%)',
        data: value2,
        backgroundColor: 'rgba(230, 126, 34, 0.8)',
        borderColor: 'rgba(230, 126, 34, 1)',
        borderWidth: 1.5,
        fill: false,
        yAxisID: 'y-axis-2',
      },
    ],
  }

  const options: ChartOptions<'bar' | 'line'> = {
    responsive: true, // 차트가 반응형으로 동작하도록 설정
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left',
      },
      'y-axis-2': {
        type: 'linear' as const,
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false, // 두 번째 Y축의 그리드 라인을 차트 영역에 그리지 않습니다.
        },
      },
    },
  }

  return (
    <Bar data={data as ChartData<'bar', number[], string>} options={options} />
  )
}

export default ComboChart
