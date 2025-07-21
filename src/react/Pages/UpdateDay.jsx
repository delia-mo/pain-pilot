import React, { useState, useEffect } from 'react'
import { Stack, Typography, Paper, Alert } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import MigraineForm from '../Components/MigraineForm'
import TrackingForm from '../Components/TrackingForm'
import calculateStatus from '../utils/calculateStatus'

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return ` ${day}.${month}.${year} `
}

const UpdateDay = () => {
  const { date } = useParams()
  const navigate = useNavigate()
  const [migraineData, setMigraineData] = useState(null)
  const [trackingData, setTrackingData] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const migraine = JSON.parse(localStorage.getItem(`migraine-${date}`) || 'null')
    const tracking = JSON.parse(localStorage.getItem(`tracking-${date}`) || 'null')
    setMigraineData(migraine)
    setTrackingData(tracking)
  }, [date])

  useEffect(() => {
    if (saved) {
      const timeout = setTimeout(() => navigate('/'), 1500)
      return () => clearTimeout(timeout)
    }
  }, [saved, navigate])

  const handleSaveMigraine = (data) => {
    const status = calculateStatus(data.schmerzen)
    const fullData = { ...data, date, status }
    localStorage.setItem(`migraine-${date}`, JSON.stringify(fullData))
    setMigraineData(fullData)
    setSaved(true)
  }

  const handleSaveTracking = (data) => {
    const fullData = { ...data, date }
    localStorage.setItem(`tracking-${date}`, JSON.stringify(fullData))
    setTrackingData(fullData)
    setSaved(true)
  }

  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        height: '100%',
        padding: 2,
        backgroundColor: theme => theme.palette.background.default,
        color: theme => theme.palette.text.primary,
        fontFamily: theme => theme.typography.fontFamily,
        overflowY: 'auto'
      }}
    >
      <Typography variant="h5">
        Eintrag vom
        {formatDate(date)}
        bearbeiten
      </Typography>

      {saved && <Alert severity="success">Änderung gespeichert! Weiterleitung…</Alert>}

      <Paper sx={{ padding: 2 }}>
        {migraineData !== null && (
          <>
            <Typography variant="h6">Migräne</Typography>
            <MigraineForm
              defaultData={migraineData}
              onSave={handleSaveMigraine}
              onSkip={() => setMigraineData(null)}
            />
          </>
        )}

        {trackingData !== null && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>Tracking</Typography>
            <TrackingForm
              defaultData={trackingData}
              onSave={handleSaveTracking}
            />
          </>
        )}

        {migraineData === null && trackingData === null && (
          <Typography color="text.secondary">
            Für diesen Tag wurden keine Daten gefunden.
          </Typography>
        )}
      </Paper>
    </Stack>
  )
}

export default UpdateDay
