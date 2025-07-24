import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Box, Typography, Slider, FormGroup,
  FormControlLabel, Checkbox, Button
} from '@mui/material'

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

const MigraineForm = ({ defaultData = {}, onSave, onSkip, hideSaveButton = false }) => {
  const [form, setForm] = useState({
    schmerzen: 0,
    aura: false,
    uebelkeit: false,
    taubheit: false,
    sprechen: false,
    muskel: false,
    ...defaultData
  })

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }))
  }

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
      {!hideSaveButton && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={onSkip}>
            Skip
          </Button>
        </Box>
      )}

      <Typography variant="h6" gutterBottom>
        Migräne Logging
      </Typography>

      <Box sx={{ my: 2 }}>
        <Typography gutterBottom>
          Schmerzen (0–10):
          <br />
          {form.schmerzen}
        </Typography>
        <Slider
          name="schmerzen"
          value={form.schmerzen}
          onChange={handleChange}
          min={0}
          max={10}
          sx={{ color: 'white' }}
        />
      </Box>

      <FormGroup>
        {['aura', 'uebelkeit', 'taubheit', 'sprechen', 'muskel'].map((field) => (
          <FormControlLabel
            key={field}
            control={
              <Checkbox
                name={field}
                checked={form[field]}
                onChange={handleChange}
              />
            }
            label={{
              aura: 'Aura',
              uebelkeit: 'Übelkeit',
              taubheit: 'Taubheit',
              sprechen: 'Schwierigkeiten beim Sprechen',
              muskel: 'Muskelschmerzen oder -zucken'
            }[field]}
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

MigraineForm.propTypes = {
  defaultData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onSkip: PropTypes.func,
  hideSaveButton: PropTypes.bool
}

export default MigraineForm
