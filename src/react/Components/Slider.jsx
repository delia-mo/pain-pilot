import { Slider, TextField, Box } from '@mui/material'
import React, { useState } from 'react'

const CustomSlider = () => {
  const [value, setValue] = useState(0) // initial state=0

  const handleSliderChange = (_, newValue) => {
    setValue(newValue)
  }

  const handleInputChange = (event) => {
    const inputValue = Number(event.target.value)
    // Check if input is a number
    if (!Number.isNaN(inputValue)) {
      setValue(inputValue)
    }
  }

  return (
    // Width of both items (slider and text box)
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
      <Slider
        value={value}
        onChange={handleSliderChange}
        min={0}
        max={10}
        step={1}
        valueLabelDisplay="auto"
        size="small"
        color="secondary.light"
        sx={{ flexGrow: 1 }}
      />
      <TextField
        value={value}
        onChange={handleInputChange}
        type="number"
        inputProps={{ min: 0, max: 10, step: 1 }}
        size="small"
        sx={{ width: 100 }}
      />
    </Box>
  )
}

export default CustomSlider
