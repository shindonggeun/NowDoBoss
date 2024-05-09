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
}

const BarChart2 = (props: BarChartProps) => {
  const { labels, values, minvalue } = props

  const data = {
    labels,
    datasets: [
      {
        label: '운영일(개월)',
        data: values,
        backgroundColor: ['rgba(4, 191, 218, 0.4)', 'rgba(255, 168, 74, 0.4)'],
        borderColor: ['rgba(4, 191, 218, 1)', 'rgba(255, 168, 74, 1)'],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        display: false,
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
        min: minvalue,
        ticks: {
          stepSize: 1,
        },
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
          ctx.font = 'bolder 12px sans-serif'
          ctx.fillStyle = data.datasets[0].borderColor[index]
          ctx.textAlign = 'center'
          ctx.fillText(
            `${data.datasets[0].data[index].toLocaleString()} 명`,
            datapoint.x,
            datapoint.y - 10,
          )
        })
      },
    },
  ]

  return <Bar options={options} data={data} plugins={plugins} />
}

export default BarChart2
