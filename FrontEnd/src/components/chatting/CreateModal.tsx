import { Box, Modal } from '@mui/material'
import * as c from '@src/components/styles/chatting/CreateModalStyle'
import arrow_up from '@src/assets/arrow_up.svg'
import arrow_down from '@src/assets/arrow_down.svg'
import React, { useState } from 'react'
import { createChatRoom } from '@src/api/chattingApi'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase'
import { subscribeTopic } from '@src/api/fcmApi.tsx'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '550px',
  borderRadius: '10px',
  bgcolor: 'background.paper',
  '&:focus': {
    outline: 'none',
  },
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
}

type CreateModalPropsType = {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateModal = (props: CreateModalPropsType) => {
  const { modalOpen, setModalOpen } = props
  const navigate = useNavigate()
  const [nameValue, setNameValue] = useState<string>('')
  const [introductionValue, setIntroductionValue] = useState<string>('')

  const [outputCategoryValue, setOutputCategoryValue] =
    useState<string>('카테고리를 선택해주세요.')
  const [selectedCategoryValue, setSelectedCategoryValue] = useState<string>('')
  const [selectedLimitValue, setSelectedLimitValue] = useState<number>(0)

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const categories = [
    { name: '이모저모', value: 'ETC' },
    { name: '인테리어', value: 'INTERIOR' },
    { name: '상권공유', value: 'COMMERCIAL_AREA' },
    { name: '동업제안', value: 'PARTNERSHIP' },
    { name: '창업고민', value: 'START_UP' },
  ]

  // fcm
  const messaging = firebase.messaging()
  const firebaseMessage = async (chatRoomId: number) => {
    try {
      const permission = await Notification.requestPermission()

      if (permission === 'granted') {
        console.log('Notification permission granted.')

        // 방 들어갈 때 토픽 구독 로직
        const { mutate: subscribeTopicMutation } = useMutation({
          mutationKey: ['subscribeTopic'],
          mutationFn: subscribeTopic,
        })

        // FCM 토큰을 가져옵니다.
        messaging
          .getToken()
          .then(token => {
            console.log('Token:', token)
            subscribeTopicMutation({ token, topicName: String(chatRoomId) })
          })
          .catch(err => {
            console.error('Token retrieval failed:', err)
          })
      } else {
        console.log('Unable to get permission to notify.')
      }
    } catch (error) {
      console.error('Permission request failed', error)
    }
  }

  const { mutate: mutateCreateChatRoom } = useMutation({
    mutationKey: ['createChatRoom'],
    mutationFn: createChatRoom,
    onSuccess: res => {
      setModalOpen(false)
      // 토픽 구독하기
      firebaseMessage(res.dataBody.chatRoomId)
      return navigate(`/chatting/${res.dataBody.chatRoomId}`)
    },
  })

  // 채팅방 생성 함수
  const handleSubmit = () => {
    const ArticleData = {
      name: nameValue,
      introduction: introductionValue,
      category: selectedCategoryValue,
      limit: selectedLimitValue,
    }
    mutateCreateChatRoom(ArticleData)
  }

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <c.CreateModal>채팅방 생성하기</c.CreateModal>
          <c.Title>채팅방 이름</c.Title>
          <c.TitleInput
            $isActive={nameValue.length > 0}
            placeholder="채팅방 이름을 입력해주세요."
            defaultValue={nameValue}
            maxLength={19}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setNameValue(e.target.value)
            }}
          />
          <c.Title>채팅방 소개</c.Title>
          <c.ContentInput
            $isActive={introductionValue.length > 0}
            placeholder="채팅방을 간단히 소개해주세요."
            defaultValue={introductionValue}
            maxLength={49}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setIntroductionValue(e.target.value)
            }}
          />
          {/* 드롭다운 메뉴 토글 버튼 */}
          <c.Dropdown>
            <c.Title>카테고리</c.Title>
            <c.DropdownButton
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <c.SelectedContent> {outputCategoryValue}</c.SelectedContent>
              <c.DropdownIcon src={isDropdownOpen ? arrow_up : arrow_down} />
            </c.DropdownButton>

            {/* 드롭다운 메뉴 항목 */}
            {isDropdownOpen && (
              <c.DropdownBox>
                {categories.map(category => (
                  <c.DropdownContent
                    key={category.name}
                    onClick={() => {
                      setOutputCategoryValue(category.name)
                      setSelectedCategoryValue(category.value)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {category.name}
                  </c.DropdownContent>
                ))}
              </c.DropdownBox>
            )}
          </c.Dropdown>
          <c.Title>최대인원 (최대 600명)</c.Title>
          <c.NumberInput
            type="number"
            $isActive={!!selectedLimitValue}
            placeholder="채팅방 인원을 적어주세요."
            defaultValue={selectedLimitValue}
            max="600"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSelectedLimitValue(Number(e.target.value))
            }}
          />

          <c.ButtonDiv>
            <c.SubmitButton
              onClick={() => {
                handleSubmit()
              }}
            >
              완료
            </c.SubmitButton>
            <c.SubmitButton onClick={() => setModalOpen(false)}>
              취소
            </c.SubmitButton>
          </c.ButtonDiv>
        </Box>
      </Modal>
    </div>
  )
}

export default CreateModal
