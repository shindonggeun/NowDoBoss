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
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
  ]

  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(153, 102, 255, 1)',
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
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1.5,
        fill: false,
        yAxisID: 'y-axis-2',
      },
    ],
  }

  const options: ChartOptions<'bar' | 'line'> = {
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
