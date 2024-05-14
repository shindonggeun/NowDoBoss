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
        backgroundColor: [
          'rgba(4, 191, 218, 0.4)',
          'rgba(255, 168, 74, 0.4)',
          'rgba(255, 219, 74, 0.4)',
          'rgba(251, 103, 202, 0.4)',
          'rgba(155, 136, 237, 0.4)',
          'rgba(55, 97, 247, 0.4)',
        ],
        borderColor: [
          'rgba(4, 191, 218, 1)',
          'rgba(255, 168, 74, 1)',
          'rgba(255, 219, 74, 1)',
          'rgba(251, 103, 202, 1)',
          'rgba(155, 136, 237, 1)',
          'rgba(55, 97, 247, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    aspectRatio: 1,
    interaction: {
      intersect: false,
    },
    layout: {
      padding: 80,
    },
    plugins: {
      legend: {
        display: false,
        position: 'bottom' as const,
      },
    },
  }

  // 그래프 안에 비율 넣어주기
  const plugins: Plugin<'pie', unknown>[] = [
    {
      id: 'customTopLabels',
      afterDraw: (chart: ChartJS<'pie', number[], unknown>) => {
        const {
          ctx,
          chartArea: { width, height },
        } = chart
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
            const { x, y } = datapoint.tooltipPosition(true)

            const halfwidth = width / 2
            const halfheight = height / 2
            const xLine = x > halfwidth + 20 ? x + 15 : x - 15
            const yLine = y > halfheight + 20 ? y + 15 : y - 15

            // text
            ctx.font = 'bolder 11px sans-serif'

            // control the position
            const textXposition = x >= +20 ? 'left' : 'right'
            ctx.textAlign = textXposition
            ctx.textBaseline = 'middle'
            ctx.fillStyle = Array.isArray(dataset.borderColor)
              ? dataset.borderColor[index]
              : dataset.borderColor
            ctx.fillText(data.labels[index], xLine, yLine)
          })
        })
      },
    },

    // {
    //   id: 'customCenterPercent',
    //   afterDraw: (chart: ChartJS<'pie', number[], unknown>) => {
    //     const { ctx } = chart
    //     const total = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0)
    //     data.datasets[0].data.forEach((datapoint, index) => {
    //       const percentage = `(${((datapoint / total) * 100).toFixed(1)}%)`
    //       const { x, y } = chart
    //         .getDatasetMeta(0)
    //         .data[index].tooltipPosition(true)
    //       ctx.font = 'bold 13px sans-serif'
    //       ctx.fillStyle = data.datasets[0].borderColor[index]
    //       ctx.textAlign = 'center'
    //       ctx.fillText(percentage, x, y + 20)
    //     })
    //   },
    // },
  ]

  return <Pie data={data} options={options} plugins={plugins} />
}

export default PieChart
