import React from 'react'
import { Grid2, Paper, Typography, Box } from '@mui/material'
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from '@mui/material/styles'

import StatisticCard from '../Components/StatisticCard'

import useMigraineData from '../../hooks/useMigraineData'
import useMonthLabels from '../../hooks/useMonthLabels'
import useSymptomLabels from '../../hooks/useSymptomLabels'

const Statistics = () => {
  const { entries, trackings, loggings } = useMigraineData()
  const currentMonth = new Date().getMonth()
  const migraineDays = loggings.filter(e => new Date(e.date).getMonth() === currentMonth)
  const lastMigraineDate = [...loggings].sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date
  // Abrunden zum vollen Tag. Berechnung: Millisekunden * Sekunden * Minuten * Stunden für einen Tag
  const daysSinceMigraine = lastMigraineDate ? Math.floor((Date.now() - new Date(lastMigraineDate)) / (1000 * 60 * 60 * 24)) : '-'

  const avgPain = loggings.length ? (loggings.reduce((sum, entry) => sum + (entry.schmerzen || 0), 0) / loggings.length).toFixed(1) : 0

  const symptomLabels = useSymptomLabels()
  const months = useMonthLabels()
  const theme = useTheme()
  const currentMonthName = months[currentMonth]

  const symptomCounts = {}
  loggings.forEach(entry => {
    Object.keys(symptomLabels).forEach(symptom => {
      if (entry[symptom]) {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1
      }
    })
  })
  const symptomData = Object.entries(symptomCounts).map(([key, count]) => ({ name: symptomLabels[key] || key, count }))

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: 2,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        overflowY: 'auto'
      }}
    >
      <Typography variant="h4" gutterBottom>Migräne Statistik</Typography>
      {/* Überblick */}
      <Grid2 container spacing={2} mb={2}>
        <StatisticCard title={`Migräne-Tage ${currentMonthName}`} value={migraineDays.length} />
        <StatisticCard title="Tage seit letzter Attacke" value={daysSinceMigraine} />
        <StatisticCard title="Ø Migräne-Tage / Monat" value={migraineDays.length} />
        <StatisticCard title="Ø Schmerzstärke" value={avgPain} />
      </Grid2>

      {/* Symptome-Diagramm */}
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          mb: 2
        }}
      >
        <Typography variant="h6">Häufigste Symptome</Typography>
        {symptomData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={symptomData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <XAxis type="number" allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={110}
              />
              <Tooltip />
              <Bar dataKey="count" fill={theme.palette.secondary.main} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2">Keine Symptome getrackt.</Typography>
        )}
      </Paper>
    </Box>
  )
}

export default Statistics
