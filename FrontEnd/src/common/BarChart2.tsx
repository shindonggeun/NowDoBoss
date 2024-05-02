import { BarChartPropsType } from '@src/types/ChartPropType'
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

const BarChart2 = (props: BarChartPropsType) => {
  const { labels, values } = props

  const data = {
    labels,
    datasets: [
      {
        label: '유동 인구(명)',
        data: values,
        backgroundColor: 'rgba(75,192,192,0.2)', // 차트 색상
        borderColor: 'rgba(75,192,192,1)', // 선 색상
      },
    ],
  }

  const options = {
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
