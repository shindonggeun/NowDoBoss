import SelectionPanel from '@src/components/analysis/SelectionPanel'
import KakaoMap from '@src/common/KakaoMap'

const SelectLocationSection = () => {
  return (
    <div>
      <SelectionPanel />
      <KakaoMap />
    </div>
  )
}

export default SelectLocationSection
