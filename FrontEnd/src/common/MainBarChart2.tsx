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

const MainBarChart2 = (props: MainBarChartType) => {
  const { labels, values } = props
  const backgroundColors = values.map((_, index) =>
    index === 1 ? 'rgba(17, 84, 219, 1)' : 'rgba(186, 209, 255, 1)',
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
      },
    ],
  }

  const options = {
    responsive: true,
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
        top: 10,
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

export default MainBarChart2
