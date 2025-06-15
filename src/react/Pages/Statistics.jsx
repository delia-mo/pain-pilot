import React from 'react'

import {
  Stack
} from '@mui/material'

const Statistics = () => (
  <Stack
    sx={{
      width: '100%',
      height: '100%',
      padding: 2,
      backgroundColor: theme => theme.palette.background.default,
      color: theme => theme.palette.text.primary,
      fontFamily: theme => theme.typography.fontFamily,
      overflowY: 'auto'
    }}
  />
)

export default Statistics
