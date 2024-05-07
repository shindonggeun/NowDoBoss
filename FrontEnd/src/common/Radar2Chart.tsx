import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
)

interface RaderChartProps {
  // labels: string[]
  value: number[]
}

const RadarChart = (props: RaderChartProps) => {
  const { value } = props

  const labels: string[] = ['10대', '20대', '30대', '40대', '50대', '60대']

  const data = {
    labels,
    datasets: [
      {
        label: '연령대별 유동인구',
        data: value,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1.5,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235,1)',
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
    layout: {
      padding: 10,
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: '#E4EAF0',
        },
        ticks: {
          display: false,
          beginAtZero: true,
          max: 100,
          stepSize: 10,
        },
        suggestedMin: 0,
        suggestedMax: 40,
        grid: {
          color: '#E4EAF0',
        },
      },
    },
  }

  return <Radar data={data} options={options} />
}

export default RadarChart
