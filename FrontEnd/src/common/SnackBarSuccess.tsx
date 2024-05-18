import Snackbar from '@mui/joy/Snackbar'

interface SnackbarProps {
  alramOpen: boolean
  onClickAlram: (data: boolean) => void
}

const SnackBarSuccess = ({ alramOpen, onClickAlram }: SnackbarProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={1100}
      open={alramOpen}
      variant="soft"
      color="primary"
      onClose={() => {
        onClickAlram(false)
      }}
    >
      분석 결과가 저장되었습니다!
    </Snackbar>
  )
}

export default SnackBarSuccess
