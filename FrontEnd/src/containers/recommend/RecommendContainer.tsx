import * as r from '@src/containers/recommend/RecommendContainerStyle'
import KakaoMap from '@src/common/KakaoMap'
import SearchBar from '@src/components/recommend/SearchBar'
import RecommendReport from '@src/components/recommend/RecommendReport'
import { useState } from 'react'

const RecommendContainer = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false)

  return (
    <r.Container>
      <r.Map>
        <KakaoMap />
      </r.Map>
      <r.Search>
        <SearchBar setIsSubmit={setIsSubmit} />
      </r.Search>
      {isSubmit && (
        <r.Report>
          <RecommendReport />
        </r.Report>
      )}
    </r.Container>
  )
}

export default RecommendContainer
