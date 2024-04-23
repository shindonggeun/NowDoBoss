import * as h from '@src/components/styles/status/AnalysisSidebarBottomStyle'

type StatusSidebarBottomProps = {
  selectedOption: string | null
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>
}

const StatusSidebarBottomComponent = ({
  selectedOption,
  setSelectedOption,
}: StatusSidebarBottomProps) => {
  const options = ['유동인구', '매출평균', '입점률', '폐점률']

  return (
    <h.Container>
      <h.Title>구별 상권 현황</h.Title>
      <h.Subtitle>아래의 구분을 선택하여 현황을 파악해 보세요</h.Subtitle>
      <h.OptionsContainer>
        {options.map(option => (
          <h.Option
            key={option}
            selected={selectedOption === option}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </h.Option>
        ))}
      </h.OptionsContainer>
    </h.Container>
  )
}

export default StatusSidebarBottomComponent
