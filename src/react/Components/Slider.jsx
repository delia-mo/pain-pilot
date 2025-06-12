import { Slider, Typography, Stack } from '@mui/material'
import React, { useState } from 'react'

const CustomSlider = () => {
  const [value, setValue] = useState(30)
  const handleChange = (_, newValue) => {
    setValue(newValue)
  }
  return (
    <Stack spacing={2}>
      <Slider
        value={value}
        onChange={handleChange}
        min={0}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        sx={{
          color: theme => theme.palette.primary.main
        }}
      />
      <Typography>
        {value}
        /10
      </Typography>
    </Stack>
  )
}

export default CustomSlider
