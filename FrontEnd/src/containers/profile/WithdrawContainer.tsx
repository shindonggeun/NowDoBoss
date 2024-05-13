import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { deleteAccount } from '@src/api/profileApi'
import * as w from '@src/containers/profile/WithdrawContainerStyle'

const WithdrawContainer = () => {
  const queryClient = useQueryClient()
  const [, , removeCookie] = useCookies(['accessToken'])
  const navigate = useNavigate()
  const [isAgreed, setIsAgreed] = useState(false)

  // 동의 체크 여부 토글 함수
  const handleAgreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(event.target.checked)
  }

  // 회원탈퇴 API
  const { mutate: DeleteAccount } = useMutation({
    mutationKey: ['DeleteAccount'],
    mutationFn: deleteAccount,
    onSuccess: res => {
      if (res.dataHeader.successCode === 0) {
        // 쿠키에서 accessToken 삭제
        removeCookie('accessToken', { path: '/' })

        // 로컬 스토리지에서 memberInfo 및 로그인 여부 삭제
        localStorage.removeItem('memberInfo')
        localStorage.removeItem('isLogIn')

        // 캐시된 데이터 업데이트 및 삭제
        queryClient.invalidateQueries({ queryKey: ['GetMemberInfoData'] })

        navigate('/account-deleted')
      }
    },
  })

  const handleSubmit = () => {
    if (isAgreed) {
      DeleteAccount() // 회원탈퇴 API 호출
    }
  }

  return (
    <w.Container>
      <w.Title>회원 탈퇴 전 확인하세요.</w.Title>
      <w.InfoTextWrap>
        <w.InfoText>
          회원 탈퇴 처리 후에는 개인정보를 복원할 수 없으며, 해당 아이디는
          영구적으로 삭제됩니다.
        </w.InfoText>
        <w.InfoText>모든 이용내역은 삭제되며 복원이 불가능합니다.</w.InfoText>
        <w.InfoText>구독 중인 서비스는 자동으로 취소됩니다.</w.InfoText>
      </w.InfoTextWrap>
      <w.AgreeSection>
        <w.AgreeInput
          type="checkbox"
          id="agree"
          checked={isAgreed}
          onChange={handleAgreeChange}
        />
        <label htmlFor="agree">
          해당 내용을 모두 확인했으며, 회원탈퇴에 동의합니다.
        </label>
      </w.AgreeSection>
      <w.ButtonWrapper>
        <w.SubmitButton
          onClick={handleSubmit}
          $isAgreed={isAgreed}
          disabled={!isAgreed}
        >
          회원 탈퇴하기
        </w.SubmitButton>
      </w.ButtonWrapper>
    </w.Container>
  )
}

export default WithdrawContainer
