import { Client, Frame, over } from 'webstomp-client'

export type StompClient = Client | null

export type OnConnectedCallback = (client: Client) => void

export type OnErrorCallback = (error: Frame | string) => void

let stompClient: StompClient = null

// STOMP 클라이언트 연결 함수
export const connectStompClient = (
  serverURL: string,
  // token: string,
  onConnected: OnConnectedCallback,
  onError: OnErrorCallback,
): void => {
  const socket = new WebSocket(serverURL)
  // 연결이 된 후 메세지를 보내는 로직
  socket.onopen = () => {
    const client = over(socket)

    client.debug = () => {}
    const headers = {
      // Authorization: `Bearer ${token}`,
    }

    // 수정된 connect 호출 부분
    client.connect(
      headers,
      (frame?: Frame) => {
        if (frame) {
          onConnected(client)
        }
      },
      (error: Frame | CloseEvent) => {
        onError(error instanceof Frame ? error : 'CloseEvent')
      },
    )

    stompClient = client
  }
}

// STOMP 클라이언트 객체를 가져오는 함수
export const getStompClient = (): StompClient => stompClient
