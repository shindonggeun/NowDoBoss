import * as r from '@src/components/styles/recommend/RecommendReportStyle'
import { RecommendCommercialType } from '@src/types/MapType'
import { useEffect, useState } from 'react'
import SaveCheckIcon from '@src/assets/saveCheckMark.svg'
import SaveIcon from '@src/assets/saveMark.svg'
import Xmark from '@src/assets/xmark_solid_nomal.svg'
import report from '@src/assets/report.svg'
import useSelectPlaceStore from '@src/stores/selectPlaceStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  recommendDelete,
  recommendSave,
  recommendSaveList,
} from '@src/api/recommendApi'
import Swal from 'sweetalert2'
// import bookMark from '@src/assets/bookmark.svg'

type RecommendReportPropsType = {
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>
  data: RecommendCommercialType[]
  selectedTab: string
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>
  selectedData: RecommendCommercialType
  setSelectedData: React.Dispatch<React.SetStateAction<RecommendCommercialType>>
  handleTabClick: (name: string) => void
}

const RecommendHeader = (props: RecommendReportPropsType) => {
  const {
    setIsSubmit,
    data,
    selectedTab,
    selectedData,
    setSelectedTab,
    setSelectedData,
    handleTabClick,
  } = props

  // 첫 번째 탭 선택되게 만드는 코드
  useEffect(() => {
    // 초기에 첫 번째 탭이 선택되도록 설정
    if (data && data.length > 0) {
      setSelectedTab(data[0].commercialCodeName)
      setSelectedData(data[0])
    }
  }, [data, setSelectedData, setSelectedTab])

  // 저장버튼 누를 때 필요한 선택한 구, 동 코드 가져오기 위한 store 호출
  const { selectedGoo, selectedDong } = useSelectPlaceStore(state => ({
    selectedGoo: state.selectedGoo,
    selectedDong: state.selectedDong,
  }))

  // 저장했는지 여부 확인하기 위한 상태관리
  const [isSaved, setIsSaved] = useState<boolean>(false)

  // 추천 데이터 저장 useQuery
  const { mutate: saveMutation } = useMutation({
    mutationFn: recommendSave,
    onSuccess: () => {
      setIsSaved(true)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '내 보관함에 저장되었습니다.',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })
  // 추천 데이터 삭제 useQuery
  const { mutate: deleteMutation } = useMutation({
    mutationFn: recommendDelete,
    onSuccess: () => {
      setIsSaved(false)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '내 보관함에서 삭제되었습니다.',
        showConfirmButton: false,
        timer: 1500,
      })
    },
  })

  // 보관함 목록 조회 useQuery
  const { data: saveListData } = useQuery({
    queryKey: ['recommendSaveList'],
    queryFn: recommendSaveList,
  })

  // 저장 목록과 상권 코드 비교해서 저장된 데이터인지 확인 후 버튼 활성화
  useEffect(() => {
    if (saveListData?.dataBody) {
      const isDataSaved = saveListData.dataBody.some(
        (savedData: { userId: number; commercialCode: string }) =>
          Number(savedData.commercialCode) === selectedData.commercialCode,
      )
      setIsSaved(isDataSaved)
    }
  }, [saveListData, selectedData.commercialCode])

  const onClickSave = () => {
    if (!isSaved) {
      saveMutation({
        districtCode: selectedGoo.code,
        administrationCode: selectedDong.code,
        commercialCode: selectedData.commercialCode,
      })
    } else {
      deleteMutation({
        districtCode: selectedGoo.code,
        administrationCode: selectedDong.code,
        commercialCode: selectedData.commercialCode,
      })
    }
  }

  return (
    <r.Div>
      {data && (
        <r.Div>
          <r.FixedHeader>
            <r.Header>
              <r.HeaderContainer>
                <r.Icon src={report} />
                <r.Content>
                  <r.HeaderTitle>상권 추천 결과</r.HeaderTitle>
                </r.Content>
              </r.HeaderContainer>
              <r.RightHeader>
                <r.HeaderIcon onClick={onClickSave} $isLoading={false}>
                  {isSaved ? (
                    <r.SaveIcon src={SaveCheckIcon} alt="saveCheck" />
                  ) : (
                    <r.SaveIcon src={SaveIcon} alt="save" />
                  )}
                  저장하기
                </r.HeaderIcon>

                <r.CloseIcon
                  src={Xmark}
                  alt="close"
                  onClick={() => setIsSubmit && setIsSubmit(false)}
                />
              </r.RightHeader>
            </r.Header>
            <r.TabBox>
              {data.map((commercial, index) => {
                return (
                  <r.Tab
                    key={commercial.commercialCode}
                    $selectedTab={selectedTab === commercial.commercialCodeName}
                    onClick={() => {
                      handleTabClick(commercial.commercialCodeName)
                    }}
                  >
                    {index + 1}. {commercial.commercialCodeName}
                  </r.Tab>
                )
              })}
            </r.TabBox>
          </r.FixedHeader>
          {/* 경고문 */}
          <r.Notice>
            해당 보고서에서 제공하는 내용은 <b>추정정보</b>이므로 실제와 다를 수
            있기에, <b>사용자의 책임 하에 활용</b>하시기 바랍니다.
          </r.Notice>
        </r.Div>
      )}
    </r.Div>
  )
}

export default RecommendHeader
