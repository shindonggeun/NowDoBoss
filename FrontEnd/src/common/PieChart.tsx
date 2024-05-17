import { Chart as ChartJS, ArcElement, Legend, Tooltip, Plugin } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  labels: string[]
  value: number[]
}

const PieChart = (props: PieChartProps) => {
  const { labels, value } = props

  const data = {
    labels,
    datasets: [
      {
        label: '인구수(명)',
        data: value,
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true, // 차트가 반응형으로 동작하도록 설정
    aspectRatio: 1, // 가로세로비 조정
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
        display: true,
        position: 'bottom' as const,
      },
    },
  }

  // 그래프 안에 비율 넣어주기
  const plugins: Plugin<'pie', unknown>[] = [
    {
      id: 'customCenterText',
      afterDraw: (chart: ChartJS<'pie', number[], unknown>) => {
        const { ctx } = chart
        data.labels.forEach((gender, index) => {
          const { x, y } = chart
            .getDatasetMeta(0)
            .data[index].tooltipPosition(true)
          ctx.font = 'bolder 15px sans-serif'
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
        const total = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0)
        data.datasets[0].data.forEach((datapoint, index) => {
          const percentage = `(${((datapoint / total) * 100).toFixed(1)}%)`
          const { x, y } = chart
            .getDatasetMeta(0)
            .data[index].tooltipPosition(true)
          ctx.font = 'bold 13px sans-serif'
          ctx.fillStyle = data.datasets[0].borderColor[index]
          ctx.textAlign = 'center'
          ctx.fillText(percentage, x, y + 20)
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

export default PieChart
