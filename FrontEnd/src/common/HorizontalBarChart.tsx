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

const HorizontalBarChart = () => {
  // const labels = [
  //   '한식음식점',
  //   '중식음식점',
  //   '일식음식점',
  //   '양식음식점',
  //   '치킨전문점',
  //   '분식전문점',
  //   '호프-간이주점',
  //   '커피-음료',
  //   '제과점',
  //   '패스트푸드점',
  // ]
  // const values = ['12', '23', '124', '63', '103', '0', '26', '70', '2', '400']

  const labels = ['한식음식점', '중식음식점']
  const values = ['12', '23']

  const data = {
    labels,
    datasets: [
      {
        label: '점포 수',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  }

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    aspectRatio: 3,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
        position: 'right' as const,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  }

  return <Bar data={data} options={options} />
}

export default HorizontalBarChart
