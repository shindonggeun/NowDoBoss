import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  labels: string[]
  values: number[]
  minvalue: number
}

const BarChart2 = (props: BarChartProps) => {
  const { labels, values, minvalue } = props

  const data = {
    labels,
    datasets: [
      {
        label: '인구(명)',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // 차트 색상
        borderColor: 'rgba(75, 192, 192, 1)', // 선 색상
        borderWidth: 1,
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
        min: minvalue,
        grid: {
          display: false,
        },
      },
    },
    categoryPercentage: 0.3,
  }

  return <Bar options={options} data={data} />
}

export default BarChart2
