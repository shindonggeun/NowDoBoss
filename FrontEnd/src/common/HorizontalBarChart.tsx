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

const HorizontalBarChart = () => {
  const labels = [
    '식료품',
    '의류',
    '생활용품',
    '의료비',
    '교통',
    '여가',
    '문화',
    '교육',
    '유흥',
  ]
  const values = ['12', '23', '500', '302', '101', '69', '99', '350', '200']

  const data = {
    labels,
    datasets: [
      {
        label: '유형별 지출금액',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    // aspectRatio: 3,
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
