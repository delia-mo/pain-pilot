import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Box, Typography, Slider, FormGroup,
  FormControlLabel, Checkbox, Button, TextField
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
    active: false,
    dauer: 1,
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

      <FormControlLabel
        control={
          <Checkbox
            name="active"
            checked={form.active}
            onChange={(e) => setForm(prev => ({
              ...prev,
              active: e.target.checked
            }))}
          />
        }
        label="Ist deine Attacke vorbei?"
      />

      {form.active && (
        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>
            Wie lange hat die Attacke gedauert? (in Stunden)
          </Typography>
          <TextField
            type="number"
            name="dauer"
            label="Dauer in Stunden"
            value={form.dauer}
            onChange={(e) => setForm(prev => ({
              ...prev,
              dauer: Number(e.target.value)
            }))}
            slotProps={{
              min: 0.5,
              max: 72,
              step: 0.5
            }}
            fullWidth
            sx={{ mt: 1 }}
          />
        </Box>
      )}

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
