import { HorizontalBarChartPropsType } from '@src/types/CommonPropsType'
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

const HorizontalBarChart = (props: HorizontalBarChartPropsType) => {
  const { labels, values, datasetsLabel, aspectRatio, xDisplay } = props

  const data = {
    labels,
    datasets: [
      {
        label: datasetsLabel,
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    aspectRatio,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: 'right' as const,
      },
    },
    scales: {
      x: {
        display: xDisplay,
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

  return <Bar data={data} options={options} />
}

export default HorizontalBarChart
