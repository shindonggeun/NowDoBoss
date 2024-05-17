import { ArcElement, Chart as ChartJS, Legend, Plugin, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutPropsType {
  labels: string[]
  value: number[]
  textCenter: string
  subTextCenter: string
}

// center에 1위 데이터, 데이터 막대 라벨링
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
      id: 'customTopLabels',
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
    {
      id: 'customTopPercent',
      afterDraw: (chart: ChartJS<'doughnut', number[], unknown>) => {
        const {
          ctx,
          chartArea: { width, height },
        } = chart
        const total = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0)
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
            const { x, y } = datapoint.tooltipPosition(true)
            const percentage = `(${((data.datasets[0].data[index] / total) * 100).toFixed(1)}%)`

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
            ctx.fillText(percentage, xLine + extraLine + PlusFivePx, yLine + 13)
          })
        })
      },
    },
    // {
    //   id: 'customCenterPercent',
    //   afterDraw: (chart: ChartJS<'doughnut', number[], unknown>) => {
    //     const { ctx } = chart
    //     const total = data.datasets[0].data.reduce((acc, cur) => acc + cur, 0)
    //     data.datasets[0].data.forEach((datapoint, index) => {
    //       const percentage = `(${((datapoint / total) * 100).toFixed(1)}%)`
    //       const { x, y } = chart
    //         .getDatasetMeta(0)
    //         .data[index].tooltipPosition(true)
    //       ctx.font = 'bold 12px sans-serif'
    //       ctx.fillStyle = data.datasets[0].borderColor[index]
    //       ctx.textAlign = 'center'
    //       ctx.fillText(percentage, x, y)
    //     })
    //   },
    // },
  ]

  return (
    <Doughnut
      key={JSON.stringify(data)}
      data={data}
      options={options}
      plugins={plugins}
    />
  )
}
export default DoughnutChart
