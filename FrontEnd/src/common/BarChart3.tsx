import { BarChartPropsType } from '@src/types/CommonPropsType'
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

const BarChart2 = (props: BarChartPropsType) => {
  const { labels, values } = props

  const data = {
    labels,
    datasets: [
      {
        label: '유동 인구(명)',
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
        barThickness: 10, // 막대바 폭 조절 (고정값)
      },
      y: {
        display: false, // 왼쪽 축 제거
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  }

  return <Bar options={options} data={data} />
}

export default BarChart2
