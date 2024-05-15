import * as c from '@src/components/styles/simulation/SelectionStyle'
import * as h from '@src/containers/simulation/ReportStyle'
import SaveCheckIcon from '@src/assets/saveCheckMark.svg'
import SaveIcon from '@src/assets/saveMark.svg'
import CompareIcon from '@src/assets/compare.svg'
import Xmark from '@src/assets/xmark_solid_nomal.svg'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { reportSave } from '@src/api/simulationApi'
import useSimulationStore from '@src/stores/simulationStore'
import useReportStore from '@src/stores/reportStore'
import { SimulationSaveType } from '@src/types/SimulationType'
import { useNavigate } from 'react-router-dom'

const { Kakao } = window

interface HeaderType {
  onClose: () => void
  onClickAlram: (data: boolean) => void
  totalPrice: number
}
const ReportHeader = ({ onClose, totalPrice, onClickAlram }: HeaderType) => {
  const {
    isFranchise,
    brandName,
    subCategoryName,
    subCategoryCode,
    bulidingSize,
    floor,
  } = useSimulationStore()
  const navigate = useNavigate()
  const { sigungu } = useReportStore()
  const [isSaved, setIsSaved] = useState<boolean>(false)

  // 창업 시뮬레이션 비교하기 버튼 클릭 핸들러
  const handleSimulationCompareClick = () => {
    navigate('/analysis/simulation/compare')
  }

  // 레포트 분석 저장
  const { mutate: mutateSaveReport } = useMutation({
    mutationFn: reportSave,
    onSuccess: () => {
      onClickAlram(true)
    },
    onError: error => {
      console.error(error)
    },
  })

  const onClickSave = () => {
    setIsSaved(!isSaved)
    const saveReportData: SimulationSaveType = {
      totalPrice,
      isFranchisee: isFranchise!,
      brandName,
      gugun: sigungu,
      serviceCode: subCategoryCode,
      serviceCodeName: subCategoryName,
      storeSize: bulidingSize,
      floor,
    }
    if (!isSaved) {
      mutateSaveReport(saveReportData)
    }
  }

  useEffect(() => {
    Kakao.cleanup()
    Kakao.init('e55da734c04c78fcc069c3dab68f3c1e')
    // console.log(Kakao.isInitialized())
  }, [])

  // const localUrl = 'http://localhost:5173/analysis'
  const serverUrl = 'https://k10c208.p.ssafy.io/analysis'

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '나도 창업 할 수 있다!!!',
        description: '테스트중~~',
        imageUrl:
          'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
        link: {
          mobileWebUrl: serverUrl,
          webUrl: serverUrl,
        },
      },
      buttons: [
        {
          title: 'Now Do Boss',
          link: {
            mobileWebUrl: serverUrl,
            webUrl: serverUrl,
          },
        },
      ],
    })
  }

  const onClickCompare = async () => {
    handleSimulationCompareClick()
    onClose()
  }
  return (
    <c.SelctionReportHeader>
      <c.SelctionReportContainer>
        <c.HeaderLeft onClick={() => shareKakao()}>
          <c.HeaderTitle>창업 시뮬레이션</c.HeaderTitle>
        </c.HeaderLeft>
        <c.HeaderRight>
          <h.HeaderIcon onClick={onClickSave}>
            {isSaved ? (
              <h.SaveIcon src={SaveCheckIcon} alt="saveCheck" />
            ) : (
              <h.SaveIcon src={SaveIcon} alt="save" />
            )}
            저장하기
          </h.HeaderIcon>
          <h.HeaderIcon onClick={onClickCompare}>
            <h.CompareIcon src={CompareIcon} alt="compare" />
            비교하기
          </h.HeaderIcon>
        </c.HeaderRight>
      </c.SelctionReportContainer>
      <c.CloseIcon src={Xmark} alt="close" onClick={onClose} />
    </c.SelctionReportHeader>
  )
}

export default ReportHeader
