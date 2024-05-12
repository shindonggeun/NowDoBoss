import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UpdateMemberInfo, UploadProfileImage } from '@src/api/profileApi'
import * as e from '@src/containers/profile/EditProfileContainerStyle'

const EditProfileContainer = () => {
  const queryClient = useQueryClient() // 캐싱 무효화를 위해 QueryClient 인스턴스를 가져옵니다.
  const memberInfo = JSON.parse(localStorage.getItem('memberInfo') as string)
  const [nickname, setNickname] = useState(memberInfo.nickname)
  const [profileImage, setProfileImage] = useState(
    memberInfo.profileImage || '/images/profile.png',
  )
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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

  // 프로필 이미지 업로드 API
  const { mutate: uploadProfileImage } = useMutation({
    mutationKey: ['uploadProfileImage'],
    mutationFn: UploadProfileImage,
    onSuccess: res => {
      if (res.dataHeader.successCode === 0) {
        setProfileImage(res.dataBody)
      }
    },
  })

  // 프로필 업데이트 API
  const { mutate: updateMemberInfo } = useMutation({
    mutationKey: ['updateMemberInfo'],
    mutationFn: UpdateMemberInfo,
    onSuccess: res => {
      if (res.dataHeader.successCode === 0) {
        // 캐싱 무효화하고 프로필 가져오기 API 재호출
        queryClient.invalidateQueries({ queryKey: ['GetMemberInfoData'] })

        // Local Storage 와 상태를 새로운 데이터로 업데이트
        const updatedMemberInfo = { ...memberInfo, nickname, profileImage }
        localStorage.setItem('memberInfo', JSON.stringify(updatedMemberInfo))

        // 상태 업데이트로 컴포넌트에 반영
        setNickname(updatedMemberInfo.nickname)
        setProfileImage(updatedMemberInfo.profileImage)
      } else {
        alert(res.dataHeader.resultMessage || '업데이트 실패')
      }
    },
  })

  // 프로필 이미지가 바뀌었을때 함수
  const handleProfileImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('fileName', file.name)

      uploadProfileImage(formData)
    }
  }

  useEffect(() => {
    // profileImage가 초기 이미지가 아니고, 실제로 변경되었을 경우에만 실행
    if (profileImage !== '/images/profile.png') {
      const data = {
        nickname,
        profileImage,
      }

      updateMemberInfo(data) // profileImage가 변경될 때마다 회원 정보 업데이트 실행
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileImage])

  // 프로필 업데이트 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = {
      nickname,
      profileImage,
    }

    updateMemberInfo(data)
  }

  // 프로필 이미지를 클릭했을떄 ref
  const handleClickImage = () => {
    fileInputRef.current?.click()
  }

  // 닉네임 변경 핸들러
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }

  return (
    <div>
      <e.Form onSubmit={handleSubmit}>
        <e.InfoWrap>
          <e.ProfileImageContainer>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfileImageChange}
              style={{ display: 'none' }}
            />
            <e.ProfileImage onClick={handleClickImage} image={profileImage} />
          </e.ProfileImageContainer>
          <e.InfoDiv>
            <e.Name>{memberInfo.nickname}</e.Name>
            <e.EmailDiv>
              <e.Email>{memberInfo.email}</e.Email>
              {memberInfo.provider && (
                <e.Provider
                  src={getProviderImage(memberInfo.provider)}
                  alt="provider"
                />
              )}
            </e.EmailDiv>
          </e.InfoDiv>
        </e.InfoWrap>
        <e.UpdateWrap>
          <e.TitleWrap>
            <e.UpdateTitle>닉네임 변경</e.UpdateTitle>
            <e.NameInput value={nickname} onChange={handleNicknameChange} />
          </e.TitleWrap>
          <e.SubmitButton>수정하기</e.SubmitButton>
        </e.UpdateWrap>
      </e.Form>
    </div>
  )
}

export default EditProfileContainer
