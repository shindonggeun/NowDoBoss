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
  minvalue: number
  dataLavel: string
}

const BarChart3 = (props: BarChartProps) => {
  const { labels, values, minvalue, dataLavel } = props

  const data = {
    labels,
    datasets: [
      {
        label: dataLavel,
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // 차트 색상
        borderColor: 'rgba(75, 192, 192, 1)', // 선 색상
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
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        beginAtZero: false,
        min: minvalue,
        grid: {
          display: false,
        },
      },
    },
    categoryPercentage: 0.3,
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
          ctx.fillText(
            `${Math.floor(data.datasets[0].data[index] / 10000).toLocaleString()}만명`,
            datapoint.x,
            datapoint.y - 10,
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

export default BarChart3
