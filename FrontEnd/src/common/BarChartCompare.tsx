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
        backgroundColor: ['rgba(4, 191, 218, 0.4)', 'rgba(255, 168, 74, 0.4)'],
        borderColor: ['rgba(4, 191, 218, 1)', 'rgba(255, 168, 74, 1)'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    layout: {
      padding: 0,
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
        ticks: {
          stepSize: 1,
        },
        grid: {
          display: false,
        },
      },
    },
    categoryPercentage: 0.5,
  }

  return <Bar options={options} data={data} />
}

export default BarChart2
