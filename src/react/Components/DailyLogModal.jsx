import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Typography, Button, Paper } from '@mui/material'
import { useNavigate } from 'react-router'

import MigraineForm from './MigraineForm'
import TrackingForm from './TrackingForm'
import { calculateStatus } from './Status'

const DailyLogModal = ({ date, open, onClose, startStep = 0 }) => {
  const [step, setStep] = useState(startStep)
  const [migraineData, setMigraineData] = useState(null)
  const [trackingData, setTrackingData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const migraine = JSON.parse(localStorage.getItem(`migraine-${date}`) || '{}')
    const tracking = JSON.parse(localStorage.getItem(`tracking-${date}`) || '{}')
    setMigraineData(migraine)
    setTrackingData(tracking)
    setStep(startStep)
  }, [date, open, startStep])

  const handleMigraineAnswer = (answer) => setStep(answer ? 1 : 2)

  const handleSaveMigraine = (data) => {
    const fullData = { ...data, date }
    const status = calculateStatus(trackingData, fullData)
    const fullWithStatus = { ...fullData, status }
    localStorage.setItem(`migraine-${date}`, JSON.stringify(fullWithStatus))
    setMigraineData(fullWithStatus)
    setStep(2)
  }

  const handleSaveTracking = (data) => {
    const fullData = { ...data, date }
    localStorage.setItem(`tracking-${date}`, JSON.stringify(fullData))
    setTrackingData(fullData)
    onClose()
    navigate('/')
  }

  if (!open) return null

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '5vh',
        bottom: '5vh',
        left: '0',
        right: '0',
        bgcolor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        zIndex: 1300
      }}
    >
      <Paper sx={{ width: '100%', maxWidth: 400, maxHeight: '100%', overflowY: 'auto', padding: 2, borderRadius: 2, boxSizing: 'border-box' }}>
        {step === 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              Hattest du heute Migräne?
            </Typography>
            <Button variant="contained" sx={{ m: 1 }} onClick={() => handleMigraineAnswer(true)}>
              Ja
            </Button>
            <Button variant="contained" sx={{ m: 1 }} onClick={() => handleMigraineAnswer(false)}>
              Nein
            </Button>
          </>
        )}
        {step === 1 && (
          <MigraineForm
            defaultData={migraineData}
            onSave={handleSaveMigraine}
            onSkip={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <TrackingForm
            defaultData={trackingData}
            onSave={handleSaveTracking}
            onSkip={onClose}
          />
        )}
      </Paper>
    </Box>
  )
}

DailyLogModal.propTypes = {
  date: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  startStep: PropTypes.number
}

DailyLogModal.defaultProps = {
  startStep: 0
}

export default DailyLogModal
