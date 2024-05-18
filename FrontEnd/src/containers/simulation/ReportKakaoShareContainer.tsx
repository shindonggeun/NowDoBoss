import { useMutation } from '@tanstack/react-query'
import { fetchKaKaoUrl } from '@src/api/kakaoShareApi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { reportCreates } from '@src/api/simulationApi'
import { SimulationDataTypes } from '@src/types/SimulationType'

const ReportKakaoShareContainer = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { mutate: mutateCreateReport } = useMutation({
    mutationFn: reportCreates,
    onSuccess: res => {
      navigate('/analysis/simulation/report', { state: { res } })
    },
    onError: error => {
      console.error(error)
    },
  })

  const { mutate: mutateCreateKakaoReport } = useMutation({
    mutationFn: fetchKaKaoUrl,
    onSuccess: res => {
      const reportCreateData: SimulationDataTypes = {
        isFranchisee: res.dataBody.input.isFranchisee,
        brandName: res.dataBody.input.brandName,
        gugun: res.dataBody.input.gugun,
        serviceCode: res.dataBody.input.serviceCode,
        serviceCodeName: res.dataBody.input.serviceCodeName,
        storeSize: res.dataBody.input.storeSize,
        floor: res.dataBody.input.floor,
      }

      mutateCreateReport(reportCreateData)
    },
    onError: error => {
      console.error(error)
    },
  })

  useEffect(() => {
    mutateCreateKakaoReport(location.pathname.split('/share/')[1])
  }, [location.pathname, mutateCreateKakaoReport])
  return <div />
}

export default ReportKakaoShareContainer
