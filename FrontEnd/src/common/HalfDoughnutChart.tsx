import { HalfDoughnutChartPropsType } from '@src/types/ChartPropType'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)
const HalfDoughnutChart = (props: HalfDoughnutChartPropsType) => {
  const { labels, values } = props

  const data = {
    labels,
    datasets: [
      {
        label: '점포 수',
        data: values,
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 0.5,
        cutout: '60%',
        circumference: 180, // 도넛 반 자르기
        rotation: 270, // 도넛 돌리기
      },
    ],
  }

  const options = {
    responsive: true, // 차트가 반응형으로 동작하도록 설정
    aspectRatio: 3, // 가로세로비 조정
    // maintainAspectRatio: true, // 종횡비 유지 설정
    // hover했을 때 데이터 값이 보이도록 설정
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
  }

  return <Doughnut data={data} options={options} />
}

export default HalfDoughnutChart
