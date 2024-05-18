import styled from 'styled-components'
import Snackbar from '@mui/joy/Snackbar'
import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { useNavigate } from 'react-router-dom'

interface SnackBarType {
  alramFail: boolean
  onClickFail: (data: boolean) => void
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const SnackBarFail = ({ alramFail, onClickFail }: SnackBarType) => {
  const navigate = useNavigate()

  const GoLoginPage = () => {
    navigate('/login')
  }

  return (
    <Snackbar
      autoHideDuration={5000}
      variant="solid"
      color="primary"
      size="lg"
      invertedColors
      open={alramFail}
      onClose={() => onClickFail(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        background: 'white',
        maxWidth: 300,
      }}
    >
      <Container>
        <Typography
          level="title-lg"
          sx={{ fontFamily: 'Pretendard', fontSize: 20 }}
        >
          회원만 이용가능한 기능입니다.
        </Typography>
        <Typography sx={{ mt: 1, mb: 2, fontFamily: 'Pretendard' }}>
          로그인하고 나도보스 이용하러 가기
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: 'flex', justifyContent: 'end' }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => GoLoginPage()}
          >
            로그인
          </Button>
          <Button
            variant="solid"
            color="primary"
            onClick={() => onClickFail(false)}
          >
            닫기
          </Button>
        </Stack>
      </Container>
    </Snackbar>
  )
}

export default SnackBarFail
