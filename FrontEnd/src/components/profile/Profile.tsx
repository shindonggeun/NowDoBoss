import * as p from '@src/components/styles/profile/ProfileStyle'

const Profile = () => {
  return (
    <p.Container>
      <p.ImgDiv>
        <p.Img src="/images/profile.png" alt="profile" />
      </p.ImgDiv>
      <p.InfoDiv>
        <p.Name>이승현</p.Name>
        <p.EmailDiv>
          <p.Email>lsh1751@naver.com</p.Email>
          <div>카</div>
        </p.EmailDiv>
      </p.InfoDiv>
    </p.Container>
  )
}

export default Profile
