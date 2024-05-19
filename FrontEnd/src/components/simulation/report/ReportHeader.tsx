import * as c from '@src/components/styles/simulation/SelectionStyle'
import * as h from '@src/containers/simulation/ReportStyle'
import SaveCheckIcon from '@src/assets/saveCheckMark.svg'
import SaveIcon from '@src/assets/saveMark.svg'
import CompareIcon from '@src/assets/compare.svg'
import Xmark from '@src/assets/xmark_solid_nomal.svg'
import KakaoBtn from '@src/assets/kakaoSmBtn.png'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { reportSave } from '@src/api/simulationApi'
import {
  SimulationReportType,
  SimulationSaveType,
} from '@src/types/SimulationType'
import { useNavigate } from 'react-router-dom'
import { reportKaKaoUrl } from '@src/api/kakaoShareApi'
import { SimulationDataType } from '@src/types/KaKaoShareType'

const { Kakao } = window

interface HeaderType {
  onClose: () => void
  onClickAlram: (data: boolean) => void
  onClickFail: (data: boolean) => void
  ReportData: SimulationReportType
}
const ReportHeader = ({
  onClose,
  ReportData,
  onClickAlram,
  onClickFail,
}: HeaderType) => {
  const userLoggedIn = localStorage.getItem('isLogIn') === 'true' // 로그인 상태 확인 (localStorage 사용)

  const isFranchise = ReportData.request.isFranchisee
  const { brandName } = ReportData.request
  const subCategoryName = ReportData.request.serviceCodeName
  const subCategoryCode = ReportData.request.serviceCode
  const bulidingSize = ReportData.request.storeSize
  const { floor } = ReportData.request
  const { gugun } = ReportData.request
  const navigate = useNavigate()

  const [isSaved, setIsSaved] = useState<boolean>(false)

  // 창업 시뮬레이션 비교하기 버튼 클릭 핸들러
  const handleSimulationCompareClick = () => {
    if (userLoggedIn) {
      navigate('/analysis/simulation/compare')
    } else {
      onClickFail(true)
    }
  }

  // 레포트 분석 저장
  const { mutate: mutateSaveReport } = useMutation({
    mutationFn: reportSave,
    onSuccess: res => {
      if (res.status === 500) {
        onClickFail(true)
      }
      if (res.dataHeader && res.dataHeader.successCode === 0) {
        onClickAlram(true)
        setIsSaved(!isSaved)
      }
    },
    onError: error => {
      console.log(error)
    },
  })

  const onClickSave = () => {
    const saveReportData: SimulationSaveType = {
      totalPrice: ReportData.totalPrice,
      isFranchisee: isFranchise!,
      brandName,
      gugun,
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

  // 카카오톡 share 탬플릿
  // const serverUrl = 'http://localhost:5173'
  const serverUrl = 'https://k10c208.p.ssafy.io'
  const shareKakao = (data: string) => {
    window.Kakao.Link.sendCustom({
      templateId: 107914,
      templateArgs: {
        Server_Url: serverUrl,
        // Path: 'api/v1/share',
        Path: 'share',
        Token: data,
      },
    })
  }

  // 카톡 공유 temp
  const { mutate: mutateKakaoReport } = useMutation({
    mutationFn: reportKaKaoUrl,
    onSuccess: res => {
      shareKakao(res.dataBody.token)
    },
    onError: error => {
      console.error(error)
    },
  })

  const onClickCompare = async () => {
    await handleSimulationCompareClick()
  }

  const onClickShare = () => {
    const reportCreateData: SimulationDataType = {
      url: `${serverUrl}/api/v1/analysis/simulation/report`,
      input: {
        isFranchisee: isFranchise,
        brandName,
        gugun,
        serviceCode: subCategoryCode,
        serviceCodeName: subCategoryName,
        storeSize: bulidingSize,
        floor,
      },
    }
    mutateKakaoReport(reportCreateData)
  }

  return (
    <c.SelctionReportHeader>
      <c.SelctionReportContainer>
        <c.HeaderLeft>
          <c.HeaderTitle>창업 시뮬레이션</c.HeaderTitle>
        </c.HeaderLeft>
        <c.HeaderRight>
          <h.HeaderIcon onClick={onClickShare}>
            <h.KakaoIcon src={KakaoBtn} alt="kakao" />
            공유하기
          </h.HeaderIcon>
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
