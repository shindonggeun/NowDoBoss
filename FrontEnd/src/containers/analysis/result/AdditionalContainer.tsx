import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import selectPlaceStore from '@src/stores/selectPlaceStore'
import analysisStore from '@src/stores/analysisStore'
import { postAnalysisBookmarks } from '@src/api/analysisApi'
import SaveModal from '@src/components/analysis/result/SaveModal'
import NotLogin from '@src/common/swal/NotLogin'
import { AnalysisBookmarksDataType } from '@src/types/AnalysisType'
import * as a from '@src/containers/analysis/result/AdditionalContainerStyle'

const AdditionalContainer = () => {
  const userLoggedIn = localStorage.getItem('isLogIn') === 'true'

  const selectedGoo = selectPlaceStore(state => state.selectedGoo)
  const selectedDong = selectPlaceStore(state => state.selectedDong)
  const selectedCommercial = selectPlaceStore(state => state.selectedCommercial)
  const selectedService = analysisStore(state => state.selectedService)

  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false) // 분석 결과 저장 모달 상태
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')

  const { mutate: PostAnalysisBookmarks } = useMutation({
    mutationKey: ['PostAnalysisBookmarks'],
    mutationFn: postAnalysisBookmarks,
    onSuccess: res => {
      if (res.dataHeader.successCode === 0) {
        setModalTitle('북마크에 추가됐어요!')
        setModalContent(
          '선택하신 정보가 북마크에 추가되었어요. 언제든지 확인 가능해요.',
        )
        setShowModal(true)
        // 성공
      } else {
        setModalTitle('북마크 추가 실패')
        setModalContent(
          '이미 북마크에 추가된 상권과 업종의 분석 데이터에요. 북마크에서 확인해 보세요!',
        )
        setShowModal(true)
      }
    },
  })

  const handlePostAnalysisBookmarks = () => {
    if (!userLoggedIn) {
      NotLogin(navigate)
    } else {
      const data: AnalysisBookmarksDataType = {
        districtCode: String(selectedGoo.code),
        districtCodeName: selectedGoo.name,
        administrationCode: String(selectedDong.code),
        administrationCodeName: selectedDong.name,
        commercialCode: String(selectedCommercial.code),
        commercialCodeName: selectedCommercial.name,
        serviceType: selectedService.serviceType,
        serviceCode: selectedService.serviceCode,
        serviceCodeName: selectedService.serviceCodeName,
      }

      PostAnalysisBookmarks(data)
    }
  }

  const handleGoToBookmarks = () => {
    setShowModal(false)
    navigate('/profile/bookmarks/analysis')
  }

  return (
    <a.Container>
      <a.Button onClick={() => handlePostAnalysisBookmarks()}>
        <span>분석결과 저장하기</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 74 74"
          height="34"
          width="34"
        >
          <circle strokeWidth="3" stroke="black" r="35.5" cy="37" cx="37" />
          <path
            fill="black"
            d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
          />
        </svg>
      </a.Button>
      {showModal && (
        <SaveModal
          title={modalTitle}
          content={modalContent}
          onClose={() => setShowModal(false)}
          onConfirm={handleGoToBookmarks}
        />
      )}
    </a.Container>
  )
}

export default AdditionalContainer
