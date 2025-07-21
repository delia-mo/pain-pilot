import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Stack, Typography, Button, Divider } from '@mui/material'
import MigraineForm from '../Components/MigraineForm'
import TrackingForm from '../Components/TrackingForm'
import calculateStatus from '../utils/calculateStatus'

const UpdateDay = () => {
  const { date } = useParams()
  const formateDate = new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit'
  })

  const navigate = useNavigate()

  const [migraineData, setMigraineData] = useState({})
  const [trackingData, setTrackingData] = useState({})

  useEffect(() => {
    const storedMigraine = JSON.parse(localStorage.getItem(`migraine-${date}`) || '{}')
    const storedTracking = JSON.parse(localStorage.getItem(`tracking-${date}`) || '{}')

    setMigraineData(storedMigraine)
    setTrackingData(storedTracking)
  }, [date])

  const handleSave = () => {
    const status = calculateStatus(migraineData.schmerzen ?? 0)
    const fullMigraine = { ...migraineData, date, status }
    const fullTracking = { ...trackingData, date }

    localStorage.setItem(`migraine-${date}`, JSON.stringify(fullMigraine))
    localStorage.setItem(`tracking-${date}`, JSON.stringify(fullTracking))

    navigate('/')
  }

  return (
    <Stack
      spacing={3}
      sx={{
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        py: 4,
        px: 2,
        height: '100vh',
        overflowY: 'auto'
      }}
    >
      <Typography variant="h5" align="center">
        Eintrag vom
        {` ${formateDate} `}
        bearbeiten
      </Typography>

      <MigraineForm
        defaultData={migraineData}
        onSave={(data) => setMigraineData(data)}
        onSkip={() => {}}
        hideSaveButton
      />

      <Divider />

      <TrackingForm
        defaultData={trackingData}
        onSave={(data) => setTrackingData(data)}
        hideSaveButton
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 2 }}
      >
        Alles speichern
      </Button>
    </Stack>
  )
}

export default UpdateDay
