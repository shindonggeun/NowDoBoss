import { HorizontalBarChartPropsType } from '@src/types/CommonPropsType'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const HorizontalBarChart = (props: HorizontalBarChartPropsType) => {
  const {
    labels,
    values,
    datasetsLabel,
    aspectRatio,
    xDisplay,
    pluginUnit,
    pluginValues,
  } = props
  const minValue = Math.min(...values)

  const data = {
    labels,
    datasets: [
      {
        label: datasetsLabel,
        data: values,
        backgroundColor: [
          'rgba(255, 26, 104, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(0, 0, 0, 0.2)',
        ],
        borderColor: [
          'rgba(255, 26, 104, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(0, 0, 0, 1)',
        ],
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    aspectRatio,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: 'right' as const,
      },
    },
    layout: {
      padding: {
        top: 20,
        right: 35,
      },
    },
    scales: {
      x: {
        // beginAtZero: false,
        min: minValue * 0.1,
        grace: 2,
        display: xDisplay,
        grid: {
          display: false,
        },
      },
      y: {
        // beginAtZero: true,
        display: true,
        grid: {
          display: false,
        },
      },
    },
  }

  const plugins = [
    {
      id: 'doubleLabels',
      afterDatasetsDraw(chart: ChartJS<'bar', number[], unknown>) {
        const { ctx } = chart
        ctx.save()
        chart.getDatasetMeta(0).data.forEach((dataPoint, index) => {
          // ctx.font = 'bold 11px sans-serif'
          // ctx.fillStyle = 'grey'
          // ctx.textAlign = 'right'
          // ctx.fillText(data.labels[index], dataPoint.x - 6, dataPoint.y + 2)

          ctx.font = 'bold 12px sans-serif'
          ctx.fillStyle = 'rgba(0, 0, 0, 1)'
          ctx.textAlign = 'left'
          ctx.fillText(
            // 여기서 pluginValues가 존재할 경우 해당 값을 사용합니다.
            pluginValues
              ? `${pluginValues[index].toLocaleString()}%`
              : `${values[index].toLocaleString()}${pluginUnit}`,
            dataPoint.x + 6,
            dataPoint.y + 3,
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

export default HorizontalBarChart
