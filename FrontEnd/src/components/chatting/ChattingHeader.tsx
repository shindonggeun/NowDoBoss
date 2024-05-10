import * as c from '@src/components/styles/chatting/ChattingHeaderStyle'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { roomExit } from '@src/api/chattingApi'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export type ChattingHeaderPropsType = {
  roomData: {
    chatRoomId: number
    category: string
    name: string
    introduction: string
    memberCount: number
    limit: number
  }
}

const ChattingHeader = (props: ChattingHeaderPropsType) => {
  const { roomData } = props
  const navigate = useNavigate()

  const [openModal, setOpenModal] = useState(false)

  const { mutate: mutateRoomExit } = useMutation({
    mutationFn: roomExit,
    onSuccess: () => {
      // 댓글 삭제 성공 시 댓글 목록 재호출
      navigate('/community/list')
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: toast => {
          // eslint-disable-next-line no-param-reassign
          toast.onmouseenter = Swal.stopTimer
          // eslint-disable-next-line no-param-reassign
          toast.onmouseleave = Swal.resumeTimer
        },
      })
      Toast.fire({
        icon: 'success',
        title: '성공적으로 채팅방을 나갔습니다.',
      })
    },
  })

  const onRoomExit = () => {
    Swal.fire({
      title: '채팅방을 나가시겠습니까?',
      showDenyButton: true,
      icon: 'warning',
      confirmButtonText: '네',
      denyButtonText: '아니요',
      confirmButtonColor: '#429f50',
      cancelButtonColor: '#d33',
    }).then(result => {
      if (result.isConfirmed) {
        mutateRoomExit(Number(roomData.chatRoomId))
      }
    })
  }

  return (
    <c.Container>
      <c.Header>
        <c.ChatInfo>
          <c.ChatImg />
          <c.ChatDiv>
            <c.ChatTitle>{roomData.name}</c.ChatTitle>
            <c.ChatMembers>{roomData.memberCount} members</c.ChatMembers>
          </c.ChatDiv>
        </c.ChatInfo>
        <c.More onClick={() => setOpenModal(!openModal)}>⋯</c.More>
        {openModal ? (
          <c.MoreModal>
            <c.ModalTriangle />
            <c.ModalDiv>
              <c.ModalContent onClick={() => {}}>정보보기</c.ModalContent>

              <c.ModalContent
                onClick={() => {
                  onRoomExit()
                }}
              >
                나가기
              </c.ModalContent>
            </c.ModalDiv>
          </c.MoreModal>
        ) : (
          ''
        )}
      </c.Header>
    </c.Container>
  )
}

export default ChattingHeader
