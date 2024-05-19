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

type BarChartPropsType = {
  blueOceanInfo: {
    serviceCodeName: string
    myStore: number
    totalStore: number
    storeRate: number
  }[]
}

const BarChart = (props: BarChartPropsType) => {
  const { blueOceanInfo } = props

  // 사용자 정의 플러그인으로 그래프 내부에 글자 추가
  const centerTextPlugin = {
    id: 'centerText',
    afterDraw(chart: ChartJS) {
      const { ctx } = chart
      ctx.save()

      let fontSize
      const fontWeight = '600'
      if (window.innerWidth <= 400) {
        fontSize = '0.5rem'
      } else if (window.innerWidth <= 460) {
        fontSize = '0.6rem'
      } else if (window.innerWidth <= 500) {
        fontSize = '0.7rem'
      } else if (window.innerWidth <= 550) {
        fontSize = '0.75rem'
      } else {
        fontSize = '0.8rem'
      }
      ctx.font = ` ${fontWeight} ${fontSize} 'Pretendard'`
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'

      // 막대 그래프의 가운데를 맞추기 위한 로직
      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((bar, index) => {
          const { x, y, height } = bar.getProps(['x', 'y', 'height'], true)
          // 막대의 중앙에 텍스트를 그리기 위해 y 위치를 조정합니다.
          const dataValue = dataset.data[index]
          if (dataValue !== null) {
            const text = String(index + 1) // 데이터 값을 문자열로 변환
            const textY =
              y +
              height / 10 +
              ctx.measureText(text).actualBoundingBoxAscent / 2
            ctx.fillText(`Top${text}`, x, textY)
          }
        })
      })

      ctx.restore()
    },
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // 카테고리(범례) 없애기
      },
      // 플러그인 등록
      centerTextPlugin,
    },
    scales: {
      x: {
        display: true, // X축 값 없애기
        grid: {
          display: false, // X축 그리드 라인 없애기
        },
        ticks: {
          font: {
            size: 14, // 폰트 크기 설정
            weight: 'bold', // 폰트 두께를 bold로 설정
          },
        },
      },
      y: {
        display: false, // Y축 값 없애기
        grid: {
          display: false, // Y축 그리드 라인 없애기
        },
        min: 0, // Y축의 최소값 설정
        max: blueOceanInfo[4].storeRate, // Y축의 최대값 설정 (이 값을 조정하여 시각적 차이를 조절)
      },
    },
  }

  const labels = [
    `${blueOceanInfo[0].serviceCodeName}`,
    blueOceanInfo[1].serviceCodeName,
    blueOceanInfo[2].serviceCodeName,
    blueOceanInfo[3].serviceCodeName,
    blueOceanInfo[4].serviceCodeName,
  ]

  const data = {
    labels,
    datasets: [
      {
        label: '해당 매장 추천율',
        data: [
          blueOceanInfo[0].storeRate,
          blueOceanInfo[1].storeRate,
          blueOceanInfo[2].storeRate,
          blueOceanInfo[3].storeRate,
          blueOceanInfo[4].storeRate,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          // 'rgb(153, 102, 255)',
          // 'rgb(201, 203, 207)',
        ],
        borderWidth: 1.5,
      },
    ],
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <Bar options={options} data={data} plugins={[centerTextPlugin]} />
}

export default BarChart
