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
          const formattedPrices = data.datasets[0].data.map(price => {
            if (price > 100000000) {
              const billions = Math.floor(price / 100000000)
              const millions = Math.floor(Math.floor(price % 100000000) / 10000)
              return `${billions}억 ${millions.toLocaleString()} 만원`
            }
            return `${Math.floor(price / 10000).toLocaleString()} ${price === 0 ? '원' : '만원'}`
          })
          ctx.font = 'bolder 12px Pretendard'
          ctx.fillStyle = '#22222'
          ctx.textAlign = 'center'
          ctx.fillText(formattedPrices[index], datapoint.x, datapoint.y - 10)
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
