import { ArcElement, Chart as ChartJS, Legend, Plugin, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutPropsType {
  labels: string[]
  value: number[]
  textCenter: string
  subTextCenter: string
}
const DoughnutChart = (props: DoughnutPropsType) => {
  const { labels, value, textCenter, subTextCenter } = props

  const data = {
    labels,
    datasets: [
      {
        label: '비율 (%)',
        data: value,
        backgroundColor: [
          'rgba(4, 191, 218, 0.4)',
          'rgba(255, 168, 74, 0.4)',
          'rgba(251, 103, 202, 0.4)',
          'rgba(155, 136, 237, 0.4)',
          'rgba(55, 97, 247, 0.4)',
        ],
        borderColor: [
          'rgba(4, 191, 218, 1)',
          'rgba(255, 168, 74, 1)',
          'rgba(251, 103, 202, 1)',
          'rgba(155, 136, 237, 1)',
          'rgba(55, 97, 247, 1)',
        ],
        borderWidth: 0.5,
        cutout: '65%',
      },
    ],
  }

  const options = {
    responsive: true,
    aspectRatio: 2,
    interaction: {
      intersect: false,
    },
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: false,
        position: 'right' as const,
      },
    },
  }

  const plugins: Plugin<'doughnut', unknown>[] = [
    {
      id: 'customCenterText',
      afterDraw: (chart: ChartJS<'doughnut', number[], unknown>) => {
        const { ctx } = chart
        ctx.save()
        ctx.font = 'bolder 14px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(
          textCenter,
          chart.getDatasetMeta(0).data[0].x,
          chart.getDatasetMeta(0).data[0].y + 12,
        )
        ctx.restore()
      },
    },
    {
      id: 'customCenterSubText',
      afterDraw: (chart: ChartJS<'doughnut', number[], unknown>) => {
        const { ctx } = chart
        ctx.save()
        ctx.font = '11px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(
          subTextCenter,
          chart.getDatasetMeta(0).data[0].x,
          chart.getDatasetMeta(0).data[0].y - 6,
        )
        ctx.restore()
      },
    },
    {
      id: 'customTopLabels', // 새로 추가한 플러그인
      afterDraw: (chart: ChartJS<'doughnut', number[], unknown>) => {
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
            const extraLine = x >= halfwidth + 20 ? 15 : -15

            // Line
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(xLine, yLine)
            ctx.lineTo(xLine + extraLine, yLine)
            ctx.strokeStyle = Array.isArray(dataset.borderColor)
              ? dataset.borderColor[index]
              : dataset.borderColor
            ctx.stroke()

            // text
            ctx.font = 'bolder 11px sans-serif'

            // control the position
            const textXposition = x >= halfwidth + 20 ? 'left' : 'right'
            const PlusFivePx = x >= halfwidth + 20 ? 5 : -5
            ctx.textAlign = textXposition
            ctx.textBaseline = 'middle'
            ctx.fillStyle = Array.isArray(dataset.borderColor)
              ? dataset.borderColor[index]
              : dataset.borderColor
            ctx.fillText(
              Array.isArray(data.labels) ? data.labels[index] : data.labels,
              xLine + extraLine + PlusFivePx,
              yLine,
            )
          })
        })
      },
    },
  ]

  return (
    <Doughnut
      data={data}
      options={options}
      plugins={plugins}
      key={textCenter}
    />
  )
}
export default DoughnutChart
