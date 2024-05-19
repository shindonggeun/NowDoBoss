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
    backgroundColor,
    borderColor,
  } = props
  const minValue = Math.min(...values)

  const data = {
    labels,
    datasets: [
      {
        label: datasetsLabel,
        data: values,
        backgroundColor,
        borderColor,
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
          ctx.font = 'bolder 12px pretendard'
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
