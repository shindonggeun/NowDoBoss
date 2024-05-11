import React, { useState } from 'react'
import userStore from '@src/stores/userStore'
import PasswordInput from '@src/components/profile/PasswordInput'
import * as c from '@src/containers/profile/ChangePasswordContainerStyle'

const ChangePasswordContainer = () => {
  const memberInfo = userStore(state => state.memberInfo)
  const isSocialUser = memberInfo && memberInfo.provider !== null // 소셜 로그인한 사용자인지 확인

  const [nowPassword, setNowPassword] = useState('')
  const [changePassword, setChangePassword] = useState('')
  const [changePasswordCheck, setChangePasswordCheck] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // 비밀번호 변경 로직 추가
    alert('비밀번호가 변경되었습니다.')
  }

  return (
    <div>
      {isSocialUser ? (
        <c.SocialMsg>소셜 회원은 지원하지 않는 기능입니다.</c.SocialMsg>
      ) : (
        <c.Form onSubmit={handleSubmit}>
          <c.InputContainer>
            <PasswordInput
              value={nowPassword}
              onChange={e => setNowPassword(e.target.value)}
              id="currentPassword"
              placeholder="기존 비밀번호"
            />
            <c.InputMsg>영문, 숫자, 특수문자 포함 8~16자</c.InputMsg>
          </c.InputContainer>
          <PasswordInput
            value={changePassword}
            onChange={e => setChangePassword(e.target.value)}
            id="newPassword"
            placeholder="신규 비밀번호"
          />
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
