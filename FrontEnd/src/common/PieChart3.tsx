import { Chart as ChartJS, ArcElement, Legend, Tooltip, Plugin } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  labels: string[]
  value: number[]
}

const backgroundColor = [
  'rgba(33, 150, 243, 0.2)',
  'rgba(156, 39, 176, 0.2',
  'rgba(76, 175, 80, 0.2)',
  ' rgba(255, 193, 7, 0.2)',
  'rgba(121, 85, 72, 0.2)',
  'rgba(96, 125, 139, 0.2) ',
]
const borderColor = [
  'rgba(33, 150, 243, 1)',
  'rgba(156, 39, 176, 1)',
  'rgba(76, 175, 80, 1)',
  'rgba(255, 193, 7, 1)',
  'rgba(121, 85, 72, 1)',
  ' rgba(96, 125, 139, 1)',
]

const PieChart3 = (props: PieChartProps) => {
  const { labels, value } = props

  const data = {
    labels,
    datasets: [
      {
        label: '점포 수(개)',
        data: value,
        backgroundColor,
        borderColor,
        borderWidth: 0.3,
      },
    ],
  }

  const options = {
    responsive: true, // 차트가 반응형으로 동작하도록 설정
    aspectRatio: 1.5, // 가로세로비 조정
    // maintainAspectRatio: true, // 종횡비 유지 설정
    // hover했을 때 데이터 값이 보이도록 설정
    interaction: {
      intersect: false,
    },
    layout: {
      padding: {
        top: 20,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  const plugins: Plugin<'pie', unknown>[] = [
    {
      id: 'customCenterText',
      afterDraw: (chart: ChartJS<'pie', number[], unknown>) => {
        const { ctx } = chart
        data.labels.forEach((gender, index) => {
          const { x, y } = chart
            .getDatasetMeta(0)
            .data[index].tooltipPosition(true)
          ctx.font = 'bolder 12px Pretendard'
          ctx.fillStyle = data.datasets[0].borderColor[index]
          ctx.textAlign = 'center'
          ctx.fillText(gender, x, y)
        })
      },
    },

    {
      id: 'customCenterPercent',
      afterDraw: (chart: ChartJS<'pie', number[], unknown>) => {
        const { ctx } = chart
        data.datasets[0].data.forEach((datapoint, index) => {
          const { x, y } = chart
            .getDatasetMeta(0)
            .data[index].tooltipPosition(true)
          ctx.font = 'bolder 11px Pretendard'
          ctx.fillStyle = data.datasets[0].borderColor[index]
          ctx.textAlign = 'center'
          ctx.fillText(`(${datapoint}개)`, x, y + 10)
        })
      },
    },
  ]

  return (
    <Pie
      key={JSON.stringify(data)}
      data={data}
      options={options}
      plugins={plugins}
    />
  )
}

export default PieChart3
