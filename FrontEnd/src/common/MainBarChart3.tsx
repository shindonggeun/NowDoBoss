import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LogarithmicScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
)

export type MainBarChartType = {
  labels: string[]
  values: number[]
}

const MainBarChart3 = (props: MainBarChartType) => {
  const { labels, values } = props
  const backgroundColors = values.map((_, index) =>
    index === 3 ? 'rgba(17, 84, 219, 1)' : 'rgba(186, 209, 255, 1)',
  )
  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: values,
        backgroundColor: backgroundColors,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 0.5,
        borderRadius: 5,
        barThickness: 20, // 바 두께 설정
        maxBarThickness: 30, // 최대 바 두께 설정
        // minBarLength: 20, // 최소 바 길이 설정
      },
    ],
  }

  const options = {
    responsive: true,
    indexAxis: 'y' as const,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      tooltip: {
        enabled: false, // 툴팁 비활성화
      },
    },
    layout: {
      padding: {
        top: 0,
        left: 0,
        right: 0,
      },
    },
    scales: {
      x: {
        display: false,
        beginAtZero: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        beginAtZero: false,
        grid: {
          display: false,
        },
      },
    },
  }

  return <Bar key={JSON.stringify(data)} data={data} options={options} />
}

export default MainBarChart3
