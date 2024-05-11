import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PromiseDongType, RecommendCommercialType } from '@src/types/MapType'
import { fetchDongInfo } from '@src/api/mapApi'
import useSelectPlaceStore from '@src/stores/selectPlaceStore'
import { useNavigate } from 'react-router-dom'
import * as r from '@src/components/styles/recommend/RecommendReportStyle'
import arrowRight from '@src/assets/arrow_right.svg'

type RecommendBannerPropsType = {
  selectedData: RecommendCommercialType
}

const RecommendBanner = (props: RecommendBannerPropsType) => {
  const { selectedData } = props
  const navigate = useNavigate()
  // 상권 코드 받았을 때 상위 구, 동 데이터 불러오기 위한 코드 저장
  const [commercialCode, setCommercialCode] = useState<number>(0)

  // 상권 코드 보내고 해당하는 행정동 코드, 이름 받아오기
  const { data: DongData } = useQuery<PromiseDongType>({
    queryKey: ['fetchAdministration', commercialCode],
    queryFn: async () => {
      return fetchDongInfo(commercialCode)
    },
    // enabled: !!commercialCode,
  })

  // store에 저장된 구 데이터와 선택한 구, 동, 상권 값 가져올 store
  const { goosData, setSelectedGoo, setSelectedDong, setSelectedCommercial } =
    useSelectPlaceStore(state => ({
      goosData: state.goosData,
      setSelectedGoo: state.setSelectedGoo,
      setSelectedDong: state.setSelectedDong,
      setSelectedCommercial: state.setSelectedCommercial,
    }))

  // 행정동 코드 입력 시 행정구 코드, 이름 찾아서 저장
  const ReCallBeforeData = useCallback(
    (code: number) => {
      // 행정동의 8자리 코드 중 5자리 추출
      const slicedCode = String(code).slice(0, 5)
      // districtData 배열에서 조건에 맞는 항목 찾기
      const foundDistrict = goosData.find(
        district => district.gooCode === Number(slicedCode),
      )
      // 행정동 8코드의 앞 5자리는 속한 행정구라서, 행정구 정보 찾아서 store에 저장해서 드롭다운 갱신
      if (foundDistrict) {
        setSelectedGoo({
          name: foundDistrict.gooName,
          code: foundDistrict.gooCode,
        })
      }
    },
    [goosData, setSelectedGoo],
  )

  // 동 데이터 갱신되면 구, 동 정보 저장
  useEffect(() => {
    if (commercialCode !== 0 && DongData) {
      ReCallBeforeData(DongData.dataBody.administrationCode)
      setSelectedDong({
        name: DongData.dataBody.administrationCodeName,
        code: DongData.dataBody.administrationCode,
      })
      navigate('/analysis')
    }
  }, [DongData, ReCallBeforeData, commercialCode, navigate, setSelectedDong])

  return (
    <r.GoAnalysis
      onClick={() => {
        setSelectedCommercial({
          name: selectedData.commercialCodeName,
          code: selectedData.commercialCode,
        }) // 상권 코드 저장해서 동 정보 호출
        setCommercialCode(selectedData.commercialCode)
      }}
    >
      <r.BannerContent>
        <b>더 자세한 상권 분석 결과</b>가 <b>궁금</b>하신가요? <br />
        추가로 <b>업종을 선택</b>하고 <b>자세한 분석</b>을 받아보세요!
      </r.BannerContent>
      <r.BannerArrow src={arrowRight} />
    </r.GoAnalysis>
  )
}

export default RecommendBanner
