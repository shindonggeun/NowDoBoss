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
    'rgba(103, 128, 159, 0.2)', // 10대 (연한 청회색)
    'rgba(241, 196, 15, 0.2)', // 20대 (연한 노란색)
    'rgba(231, 76, 60, 0.2)', // 30대 (연한 붉은색)
    'rgba(46, 204, 113, 0.2)', // 40대 (연한 녹색)
    'rgba(52, 152, 219, 0.2)', // 50대 (연한 파란색)
    'rgba(155, 89, 182, 0.2)', // 60대 (연한 보라색)
  ]

  const borderColors = [
    'rgba(103, 128, 159, 1)', // 10대 (청회색)
    'rgba(241, 196, 15, 1)', // 20대 (노란색)
    'rgba(231, 76, 60, 1)', // 30대 (붉은색)
    'rgba(46, 204, 113, 1)', // 40대 (녹색)
    'rgba(52, 152, 219, 1)', // 50대 (파란색)
    'rgba(155, 89, 182, 1)', // 60대 (보라색)
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
        borderRadius: 10,
        barThickness: 40,
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
    layout: {
      padding: {
        left: 10,
        right: 10,
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
        display: false,
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
