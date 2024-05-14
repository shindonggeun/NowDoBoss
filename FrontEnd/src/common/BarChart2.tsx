import { BarChartPropsType } from '@src/types/CommonPropsType'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LogarithmicScale,
  Plugin,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
)

const BarChart2 = (props: BarChartPropsType) => {
  const { labels, values, minValue, datasetsLabel, pluginUnit, pluginValues } =
    props

  const data = {
    labels,
    datasets: [
      {
        label: datasetsLabel,
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // 차트 색상 (색상을 더 다르게 하고 싶다면 props으로 전환)
        borderColor: 'rgba(75, 192, 192, 1)', // 선 색상
        borderWidth: 0.5,
        borderRadius: 10,
      },
    ],
  }

  const options = {
    responsive: true, // 차트가 반응형으로 동작하도록 설정
    // maintainAspectRatio: true, // 종횡비 유지 설정
    // hover했을 때 데이터 값이 보이도록 설정
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
    },
    layout: {
      padding: {
        top: 20,
        left: 20,
        right: 30,
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
        min: minValue * 0.8,
        grid: {
          display: false,
        },
      },
    },
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
            pluginValues
              ? `${pluginValues[index]}%`
              : `${values[index].toLocaleString()}${pluginUnit}`,
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
      data={data}
      options={options}
      plugins={plugins}
    />
  )
}

export default BarChart2
