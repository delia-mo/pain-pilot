import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Box, Typography, Slider, FormGroup,
  FormControlLabel, Checkbox, Button
} from '@mui/material'

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

const TrackingForm = ({ defaultData = {}, onSave, hideSaveButton = false }) => {
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
    { name: 'stress', label: 'Stress (0–5)', min: 0, max: 5 },
    { name: 'psychisch', label: 'Psychisch (0–5)', min: 0, max: 5 },
    { name: 'reize', label: 'Reize (0–5)', min: 0, max: 5 },
    { name: 'schlaf', label: 'Schlaf (0–12)', min: 0, max: 12 },
    { name: 'hydration', label: 'Hydration (0–2)', min: 0, max: 2 },
    { name: 'meals', label: 'Meals (0–2)', min: 0, max: 2 }
  ]

  useEffect(() => {
    setForm(prev => ({ ...prev, ...defaultData }))
  }, [defaultData])

  const previousFormRef = useRef(form)

  useEffect(() => {
    if (hideSaveButton && !deepEqual(previousFormRef.current, form)) {
      previousFormRef.current = form
      onSave(form)
    }
  }, [form, hideSaveButton])

  return (
    <Box sx={{ padding: 2 }}>
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

      {!hideSaveButton && (
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => onSave(form)}>
          Speichern
        </Button>
      )}
    </Box>
  )
}

TrackingForm.propTypes = {
  defaultData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  hideSaveButton: PropTypes.bool
}

export default TrackingForm
