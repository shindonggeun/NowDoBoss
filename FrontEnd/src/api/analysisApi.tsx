import { customAxios } from '@src/util/auth/customAxios'

export const getFlowPopulationData = async (commercialCode: string) => {
  return customAxios
    .get(`/commercial/foot-traffic/${commercialCode}`)
    .then(res => res.data)
    .catch(err => console.log(err))
}
