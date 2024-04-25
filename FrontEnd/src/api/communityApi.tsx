import { customAxios } from '@src/util/auth/customAxios'
import { CommunityCreateDataType } from '@src/types/CommunityType'

export const fetchCommunityCreate = async (data: CommunityCreateDataType) => {
  return customAxios
    .post(`/community`, data)
    .then(res => res.data)
    .catch(err => console.log(err))
}
