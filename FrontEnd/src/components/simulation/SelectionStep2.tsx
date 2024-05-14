import * as c from '@src/components/styles/simulation/StepStyle'
import serchIcon from '@src/assets/SearchIcon.svg'
import DaumPostcode from 'react-daum-postcode'
import { useState } from 'react'
import useReportStore from '@src/stores/reportStore'
import useSelectPlaceStore from '@src/stores/selectPlaceStore'
// import { DaumDataType } from '@src/types/SimulationType'

interface Step2Props {
  nextStep: () => void
}

const SelectionStep2 = ({ nextStep }: Step2Props) => {
  const [showPostcode, setShowPostcode] = useState(false)
  const [infoText, setInfoText] = useState('')
  const { address, setAddress, setQuery, sido, setSido, setSigungu } =
    useReportStore()
  const { selectedGoo, selectedDong } = useSelectPlaceStore()

  const completeHandler = (data: any) => {
    // console.log(data)
    if (data.sido === '서울') {
      setAddress(data.address) // "서울 송파구 동남로 99"
      setQuery(data.query) // "서울특별시 송파구 가락동 "
      setSido(data.sido) // "서울"
      setSigungu(data.sigungu) // "송파구"
    } else {
      // 초기화
      setAddress('')
      setQuery('')
      setSido('')
      setSigungu('')
    }
    setInfoText('죄송합니다. 현재 서울 이외의 지역은 지원되지 않습니다.')
    setShowPostcode(false)
  }

  const onClickLocation = () => {
    setSigungu(selectedGoo.name)
    setQuery(`서울특별시 ${selectedGoo.name} ${selectedDong.name}`)
    nextStep()
  }

  return (
    <c.Container>
      <c.Title>
        창업 하시려는
        <c.Emphasis> 위치</c.Emphasis>를 입력해 주세요
      </c.Title>
      {showPostcode ? (
        <c.DaumContainer>
          <DaumPostcode onComplete={completeHandler} autoClose={false} />
        </c.DaumContainer>
      ) : (
        <div>
          <c.InputContainer
            onClick={() => {
              setShowPostcode(true)
            }}
          >
            <c.SearchIcon src={serchIcon} alt="serchIcon" />
            <c.StyledInput
              type="text"
              placeholder={address !== '' ? `${address}` : '시/군/구 검색하기'}
            />
          </c.InputContainer>
          {selectedGoo.name !== '행정구' ? (
            <c.GuidLocation>
              최근 검색한 위치{' '}
              <c.Emphasis onClick={onClickLocation}>
                {selectedGoo.name}{' '}
                {selectedDong.name !== '행정동' ? selectedDong.name : null}에서
                시작하기
              </c.Emphasis>
            </c.GuidLocation>
          ) : null}
        </div>
      )}

      {sido !== '' && !showPostcode && (
        <c.ButtonContainer>
          <c.NextButton type="button" onClick={nextStep}>
            다음
          </c.NextButton>
        </c.ButtonContainer>
      )}
      {!showPostcode && sido === '' && <c.InfoText>{infoText}</c.InfoText>}
    </c.Container>
  )
}

export default SelectionStep2
