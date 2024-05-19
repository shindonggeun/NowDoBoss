import { RadarChartPropsType } from '@src/types/CommonPropsType'
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

const RadarChart = (props: RadarChartPropsType) => {
  const { labels, value1, value2 } = props

  const data = {
    labels,
    datasets: [
      {
        label: '남성 (%)',
        data: value1,
        fill: true,
        backgroundColor: 'rgba(55, 97, 247, 0.4)',
        borderColor: 'rgba(55, 97, 247, 1)',
        borderWidth: 1.5,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235,1)',
      },
      {
        label: '여성 (%)',
        data: value2,
        fill: true,
        backgroundColor: 'rgba(251, 103, 202, 0.4)',
        borderColor: 'rgba(251, 103, 202, 1)',
        borderWidth: 1.5,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132,1)',
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
      padding: 20,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: '#aaa',
        },
        ticks: {
          display: false,
          beginAtZero: true,
          max: 100,
          stepSize: 10,
        },
        suggestedMin: 0,
        suggestedMax: 40,
      },
    },
  }

  return <Radar data={data} options={options} />
}

export default RadarChart
