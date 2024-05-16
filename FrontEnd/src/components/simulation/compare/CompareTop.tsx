import Option from '@mui/joy/Option'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import Chip from '@mui/joy/Chip'
import Select from '@mui/joy/Select'
import { SimulationSaveType } from '@src/types/SimulationType'

interface CompareTopType {
  savedList: SimulationSaveType[]
  setSelected: (value: number | null) => void
}
const CompareTop = ({ savedList, setSelected }: CompareTopType) => {
  return (
    <Select
      placeholder="상권을 선택해 주세요"
      slotProps={{
        listbox: {
          sx: {
            '--ListItemDecorator-size': '48px',
          },
        },
      }}
      sx={{
        minWidth: 200,
        width: '45%',
        fontFamily: 'Pretendard',
      }}
    >
      {savedList.map((data, i) => {
        const label = `${
          data.isFranchisee ? `${data.brandName}, ` : ''
        } ${data.gugun}, ${data.serviceCodeName}`
        const TotalPrice = data.totalPrice

        let formattedNumber
        if (TotalPrice >= 10000) {
          const billions = Math.floor(TotalPrice / 10000)
          const millions = Math.floor(TotalPrice % 10000)
          formattedNumber = `${billions}억 ${millions.toLocaleString()} 만원`
        } else {
          formattedNumber = `${TotalPrice.toLocaleString()} 만원`
        }
        return (
          <Option
            key={i}
            value={i}
            label={label}
            onClick={() => setSelected(i)}
          >
            <Box
              component="span"
              sx={{ display: 'block', fontFamily: 'pretendard' }}
            >
              <Typography
                component="span"
                level="title-sm"
                sx={{ fontWeight: 600 }}
              >
                {data.isFranchisee ? `${data.brandName}` : '개인 창업'}
              </Typography>
              <Typography component="span" level="title-sm">
                {data.gugun}, {data.serviceCodeName}
              </Typography>

              <Typography level="body-xs">
                {data.storeSize}㎡, {data.floor}
              </Typography>
            </Box>
            <Chip
              size="sm"
              variant="soft"
              color="primary"
              sx={{
                ml: 'auto',
                borderRadius: '2px',
                minHeight: '20px',
                paddingInline: '4px',
                fontSize: 'xs',
                bgcolor: 'primary.softBg',
              }}
            >
              {formattedNumber}
            </Chip>
          </Option>
        )
      })}
    </Select>
  )
}

export default CompareTop
