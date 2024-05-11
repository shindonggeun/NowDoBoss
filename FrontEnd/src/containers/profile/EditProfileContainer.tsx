import React, { useRef, useState } from 'react'
import userStore from '@src/stores/userStore'
import { UploadProfileImage } from '@src/api/profileApi'
import * as e from '@src/containers/profile/EditProfileContainerStyle'

const EditProfileContainer = () => {
  const memberInfo = userStore(state => state.memberInfo)
  const [profileImage, setProfileImage] = useState(
    memberInfo.profileImage || '/images/profile.png',
  )
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileName', file.name)

      try {
        const response = await UploadProfileImage(formData)
        // 업로드된 이미지 URL로 상태 업데이트
        setProfileImage(response.dataBody)
        // 여기서 프로필 수정하는 데이터에 업로드된 이미지 URL 추가
        // 예를 들어, 프로필 업데이트 함수 호출 등
      } catch (error) {
        console.error('프로필 이미지 업로드 실패:', error)
      }
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(profileImage)
    // 여기서 프로필 수정 API 호출 가능
    alert('프로필이 업데이트되었습니다!')
  }

  const handleClickImage = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <e.Form onSubmit={handleSubmit}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleProfileImageChange}
            style={{ display: 'none' }}
          />
          <e.ProfileImageContainer
            onClick={handleClickImage}
            image={profileImage}
          />
        </div>
      </e.Form>
    </div>
  )
}

export default EditProfileContainer
