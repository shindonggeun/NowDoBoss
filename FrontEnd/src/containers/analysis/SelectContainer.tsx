import KakaoMap from '@src/common/KakaoMap'
import * as a from '@src/containers/analysis/SelectContainerStyle'
import { useState } from 'react'
import SearchSection from '@src/components/analysis/SearchSection'
import up_arrow from '@src/assets/arrow_up.svg'
import down_arrow from '@src/assets/arrow_down.svg'

const SelectContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <a.Container>
      <a.MapDiv>
        <KakaoMap />
      </a.MapDiv>
      <a.SearchDiv>
        <a.Search>
          <SearchSection isOpen={isOpen} setIsOpen={setIsOpen} />
        </a.Search>
        <a.ReduceBtnWrap>
          <a.ReduceBtn onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <a.BtnImg src={up_arrow} />
            ) : (
              <a.BtnImg src={down_arrow} />
            )}
          </a.ReduceBtn>
        </a.ReduceBtnWrap>
      </a.SearchDiv>
    </a.Container>
  )
}

export default SelectContainer
