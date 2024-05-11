import { ProfilePropsType } from '@src/types/ProfileType'
import * as p from '@src/components/styles/profile/ProfileStyle'

const Profile = (props: ProfilePropsType) => {
  const { MemberInfoData } = props

  const getProviderImage = (provider: string) => {
    switch (provider) {
      case 'GOOGLE':
        return '/images/GoogleBtnSmall.png'
      case 'KAKAO':
        return '/images/KakaoBtnSmall.png'
      case 'NAVER':
        return '/images/NaverBtnSmall.png'
      default:
        return '' // provider가 없거나 다른 경우 기본 이미지 혹은 빈 문자열
    }
  }

  return (
    <p.Container>
      <p.Img
        src={MemberInfoData.profileImage || '/images/profile.png'}
        alt="profile"
      />
      <p.InfoDiv>
        <p.Name>{MemberInfoData.nickname}</p.Name>
        <p.EmailDiv>
          <p.Email>{MemberInfoData.email}</p.Email>
          {MemberInfoData.provider && (
            <p.Provider
              src={getProviderImage(MemberInfoData.provider)}
              alt="provider"
            />
          )}
        </p.EmailDiv>
      </p.InfoDiv>
    </p.Container>
  )
}

export default Profile
