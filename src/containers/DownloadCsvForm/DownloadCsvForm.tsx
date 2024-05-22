import { Box, BoxProps } from '@mui/material'

import DatePicker from '@/components/Input/DateTime/DatePicker'
import useDateRange from '@/components/Input/DateTime/useDateRange'

export function DownloadCsvForm(props: BoxProps) {
  const { start, end, handleStartChange, handleEndChange } = useDateRange()

  return (
    <Box {...props}>
      From{' '}
      <DatePicker
        disableFuture
        value={start}
        onChange={handleStartChange}
        sx={{ mr: 2 }}
      />
      To{' '}
      <DatePicker
        disableFuture
        value={end}
        onChange={handleEndChange}
        sx={{ mr: 3 }}
      />
    </Box>
  )
}
