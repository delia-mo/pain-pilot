import React from 'react'
import { Box, Button, Typography, Stack } from '@mui/material'

import { calculateStatus } from '../Components/Status'

// Fügt random Daten hinzu, zu Testzwecken
const insertTestData = () => {
  // Start: 1.6.2025, Ende jeweils 1 Tag vor aktuellem Datum
  const start = new Date('2025-06-01')
  const today = new Date()
  const end = new Date(today)
  end.setDate(end.getDate() - 1)
  const migraineDays = new Set()

  // 10 Tage mit Migräne im Zeitraum werden random gesetzt
  while (migraineDays.size < 10) {
    const totalDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    const randomOffset = Math.floor(Math.random() * totalDays)
    const randomDate = new Date(start.getTime())
    randomDate.setDate(randomDate.getDate() + randomOffset)
    const dateStr = randomDate.toISOString().slice(0, 10)
    migraineDays.add(dateStr)
  }

  // Geht den ganzen Zeitraum durch und setzt random Tracking Daten
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10)

    const trackingData = {
      stress: Math.floor(Math.random() * 6),
      psychisch: Math.floor(Math.random() * 6),
      reize: Math.floor(Math.random() * 6),
      schlaf: Math.floor(Math.random() * 13),
      hydration: Math.floor(Math.random() * 3),
      meals: Math.floor(Math.random() * 3),
      alkohol: Math.random() < 0.2,
      nikotin: Math.random() < 0.1,
      date: dateStr
    }
    localStorage.setItem(`tracking-${dateStr}`, JSON.stringify(trackingData))

    // Setzt random Migräne Daten, wenn das Datum für Migräne bestimmt ist
    let migraineData
    if (migraineDays.has(dateStr)) {
      migraineData = {
        schmerzen: Math.floor(Math.random() * 11),
        aura: Math.random() < 0.5,
        uebelkeit: Math.random() < 0.3,
        taubheit: Math.random() < 0.1,
        sprechen: Math.random() < 0.3,
        muskel: Math.random() < 0.2,
        date: dateStr,
        status: Math.floor(Math.random() * 4)
      }
      // localStorage.setItem(`migraine-${dateStr}`, JSON.stringify(migraineData))
    }

    // Berechnet Status (wichtig für Bilder auf Home-Screen)
    const status = calculateStatus(trackingData, migraineData || undefined)
    const loggingWithStatus = {
      ...migraineData,
      status
    }
    localStorage.setItem(`migraine-${dateStr}`, JSON.stringify(loggingWithStatus))
  }
}

// Daten löschen
const clearData = () => {
  const keysToRemove = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('tracking-') || key.startsWith('migraine-')) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key))
}

const HandleData = () => (
  <Box sx={{ padding: 4 }}>
    <Typography variant="h4" gutterBottom>Datenverwaltung</Typography>
    <Stack spacing={2}>
      <Button variant="contained" color="primary" onClick={insertTestData}>
        Testdaten für Juli einfügen
      </Button>
      <Button variant="outlined" color="error" onClick={clearData}>
        Alle Testdaten löschen
      </Button>
    </Stack>
  </Box>
)

export default HandleData
