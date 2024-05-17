import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Plugin,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  labels: string[]
  values: number[]
  infos: string[]
  dataLavel: string
}

const BarChart4 = (props: BarChartProps) => {
  const { labels, values, infos, dataLavel } = props

  const data = {
    labels,
    datasets: [
      {
        label: dataLavel,
        data: values,
        backgroundColor: 'rgba(255, 168, 74, 0.2)', // 차트 색상
        borderColor: 'rgba(255, 168, 74, 1)', // 선 색상
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 20,
        left: 25,
        right: 25,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        beginAtZero: false,
        min: 0,
        grid: {
          display: false,
        },
      },
    },
    categoryPercentage: 0.9,
  }

  const plugins: Plugin<'bar', unknown>[] = [
    {
      id: 'customCenterValue',
      afterDraw: (chart: ChartJS<'bar', number[], unknown>) => {
        const { ctx } = chart
        ctx.save()
        chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
          ctx.font = 'bolder 12px pretendard'
          ctx.fillStyle = '#22222'
          ctx.textAlign = 'center'
          ctx.fillText(infos[index], datapoint.x, datapoint.y - 5)
        })
      },
    },
    {
      id: 'customValue',
      afterDraw: (chart: ChartJS<'bar', number[], unknown>) => {
        const { ctx } = chart
        ctx.save()
        chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
          ctx.font = 'bolder 11px pretendard'
          ctx.fillStyle = '#33333'
          ctx.textAlign = 'center'
          ctx.fillText(
            `${data.datasets[0].data[index].toLocaleString()}개`,
            datapoint.x,
            datapoint.y + 22,
          )
        })
      },
    },
  ]

  return (
    <Bar
      key={JSON.stringify(data)}
      options={options}
      data={data}
      plugins={plugins}
    />
  )
}

export default BarChart4
