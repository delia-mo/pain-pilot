import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box, Typography, Slider, FormGroup,
  FormControlLabel, Checkbox, Button
} from '@mui/material'

const TrackingForm = ({ defaultData = {}, onSave, onSkip }) => {
  const [form, setForm] = useState({
    stress: 0,
    schlaf: 0,
    psychisch: 0,
    alkohol: false,
    nikotin: false,
    hydration: 0,
    meals: 0,
    reize: 0,
    ...defaultData
  })

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }))
  }

  const sliderFields = [
    { name: 'stress', label: 'Wie viel Stress? (0 = kein Stress, 5 = sehr viel)', min: 0, max: 5 },
    { name: 'psychisch', label: 'Wie fühlst du dich psychisch? (0 = sehr schlecht, 5 = sehr gut)', min: 0, max: 5 },
    { name: 'reize', label: 'Wie viele Reize? (z. B. Lärm, Licht)', min: 0, max: 5 },
    { name: 'schlaf', label: 'Wie viele Stunden hast du geschlafen?', min: 0, max: 12 },
    { name: 'hydration', label: 'Wie viel hast du getrunken? (0 = wenig, 2 = viel)', min: 0, max: 2 },
    { name: 'meals', label: 'Wie gut hast du gegessen? (0 = wenig, 2 = viel)', min: 0, max: 2 }
  ]

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={onSkip}>
          Skip
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        Trigger Tracking
      </Typography>

      {sliderFields.map(({ name, label, min, max }) => (
        <Box key={name} sx={{ my: 2 }}>
          <Typography gutterBottom>
            {label}
            :
            <br />
            {form[name]}
          </Typography>
          <Slider
            name={name}
            value={form[name]}
            onChange={handleChange}
            min={min}
            max={max}
          />
        </Box>
      ))}

      <FormGroup>
        {['alkohol', 'nikotin'].map((field) => (
          <FormControlLabel
            key={field}
            control={
              <Checkbox
                name={field}
                checked={form[field]}
                onChange={handleChange}
              />
            }
            label={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}
      </FormGroup>

      <Button variant="contained" sx={{ mt: 2 }} onClick={() => onSave(form)}>
        Speichern
      </Button>
    </Box>
  )
}

TrackingForm.propTypes = {
  defaultData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onSkip: PropTypes.func
}

export default TrackingForm
