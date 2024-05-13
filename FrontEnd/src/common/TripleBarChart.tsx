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
  infos: string[]
  values: number[]
  dataLavel: string
}

const TripleBar = (props: BarChartProps) => {
  const { labels, infos, values, dataLavel } = props

  const data = {
    labels,
    datasets: [
      {
        label: dataLavel,
        data: values,
        backgroundColor: [
          'rgba(84, 114, 221, 1)',
          'rgba(28, 66, 201, 1)',
          'rgba(162, 172, 205, 1)',
        ], // 차트 색상
        // borderColor: 'rgba(75, 192, 192, 1)', // 선 색상
        borderWidth: 1,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
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
        display: false,
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    categoryPercentage: 0.5,
  }

  const plugins: Plugin<'bar', unknown>[] = [
    {
      id: 'customCenterValue',
      afterDraw: (chart: ChartJS<'bar', number[], unknown>) => {
        const { ctx } = chart
        ctx.save()
        chart.getDatasetMeta(0).data.forEach((datapoint, index) => {
          ctx.font = 'bolder 14px sans-serif'
          ctx.fillStyle = 'black'
          ctx.textAlign = 'center'
          ctx.fillText(infos[index], datapoint.x, datapoint.y - 5)
        })
      },
    },
  ]

  return <Bar options={options} data={data} plugins={plugins} />
}

export default TripleBar
