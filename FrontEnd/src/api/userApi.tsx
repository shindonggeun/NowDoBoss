import { customAxios } from '@src/util/auth/customAxios'
// import queryString from 'query-string'

export const sendEmailVerificationCode = async (memberEmail: string) => {
  console.log(memberEmail)
  return customAxios
    .post(`/email/send/${memberEmail}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}
