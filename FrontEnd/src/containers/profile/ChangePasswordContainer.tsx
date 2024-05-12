import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { changeMemberPassword } from '@src/api/profileApi'
import PasswordInput from '@src/components/profile/PasswordInput'
import * as c from '@src/containers/profile/ChangePasswordContainerStyle'

const ChangePasswordContainer = () => {
  const memberInfo = JSON.parse(localStorage.getItem('memberInfo') as string)
  const isSocialUser = memberInfo && memberInfo.provider !== null // 소셜 로그인한 사용자인지 확인

  const [nowPassword, setNowPassword] = useState('')
  const [changePassword, setChangePassword] = useState('')
  const [changePasswordCheck, setChangePasswordCheck] = useState('')
  const [errorMessage, setErrorMessage] = useState('') // 에러 메시지 상태

  const navigate = useNavigate()

  // 비밀번호 변경 API
  const { mutate: ChangeMemberPassword } = useMutation({
    mutationKey: ['ChangeMemberPassword'],
    mutationFn: changeMemberPassword,
    onSuccess: res => {
      if (res.dataHeader.successCode === 0) {
        alert('비밀번호 변경 성공!')
        navigate('/profile/settings/edit')
        setNowPassword('')
        setChangePassword('')
        setChangePasswordCheck('')
      } else if (res.dataHeader.resultCode === null) {
        // 일반 오류 처리
        setErrorMessage(res.dataHeader.resultMessage)
      } else {
        // 유효성 검사 오류 처리
        const messages = Object.values(res.dataHeader.resultMessage).join('\n')
        setErrorMessage(messages)
      }
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      nowPassword,
      changePassword,
      changePasswordCheck,
    }

    ChangeMemberPassword(data) // 비밀번호 변경 API 함수 호출
    setErrorMessage('') // 에러 메시지 초기화
  }

  return (
    <div>
      {isSocialUser ? (
        <c.SocialMsg>소셜 회원은 지원하지 않는 기능입니다.</c.SocialMsg>
      ) : (
        <c.Form onSubmit={handleSubmit}>
          {errorMessage && <c.ErrorMsg>{errorMessage}</c.ErrorMsg>}
          <PasswordInput
            value={nowPassword}
            onChange={e => setNowPassword(e.target.value)}
            id="currentPassword"
            placeholder="기존 비밀번호"
          />
          <c.InputContainer>
            <PasswordInput
              value={changePassword}
              onChange={e => setChangePassword(e.target.value)}
              id="newPassword"
              placeholder="신규 비밀번호"
            />
            <c.InputMsg>영문, 숫자, 특수문자 포함 8~16자</c.InputMsg>
          </c.InputContainer>
          <PasswordInput
            value={changePasswordCheck}
            onChange={e => setChangePasswordCheck(e.target.value)}
            id="checkPassword"
            placeholder="신규 비밀번호 확인"
          />
          <c.SubmitButton type="submit">수정하기</c.SubmitButton>
        </c.Form>
      )}
    </div>
  )
}

export default ChangePasswordContainer
