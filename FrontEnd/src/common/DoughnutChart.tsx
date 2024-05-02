import { DoughnutChartPropsType } from '@src/types/ChartPropType'
import { ArcElement, Chart as ChartJS, Legend, Plugin, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)
const DoughnutChart = (props: DoughnutChartPropsType) => {
  const { labels, value, textCenter } = props

  const data = {
    labels,
    datasets: [
      {
        label: '비율 (%)',
        data: value,
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 0.5,
        cutout: '65%',
      },
    ],
  }

  const options = {
    responsive: true, // 차트가 반응형으로 동작하도록 설정
    aspectRatio: 2, // 가로세로비 조정
    // maintainAspectRatio: true, // 종횡비 유지 설정
    // hover했을 때 데이터 값이 보이도록 설정
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
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
          chart.getDatasetMeta(0).data[0].y,
        )
        ctx.restore()
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
