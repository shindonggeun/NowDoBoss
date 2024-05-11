import * as p from '@src/components/styles/profile/ProfileStyle'

const Profile = () => {
  return (
    <p.Container>
      <p.Img src="/images/profile.png" alt="profile" />
      <p.InfoDiv>
        <p.Name>이승현</p.Name>
        <p.EmailDiv>
          <p.Email>tmdgus1761@gmail.com</p.Email>
          <p.Provider src="/images/KakaoBtnSmall.png" alt="provider" />
        </p.EmailDiv>
      </p.InfoDiv>
    </p.Container>
  )
}

export default Profile
