import React from 'react'
import { Grid2, Paper, Typography, Box } from '@mui/material'
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import useMigraineData from '../../hooks/useMigraineData'

const Statistics = () => {
  const { entries, trackings, loggings } = useMigraineData()
  const currentMonth = new Date().getMonth() + 1
  const migraineDays = loggings.filter(e => new Date(e.Date).getMonth() === currentMonth)
  const lastMigraineDate = [...loggings].sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date
  // Abrunden zum vollen Tag. Berechnung: Millisekunden * Sekunden * Minuten * Stunden für einen Tag
  const daysSinceMigraine = lastMigraineDate ? Math.floor((Date.now() - new Date(lastMigraineDate)) / (1000 * 60 * 60 * 24)) : '-'

  const symptomCounts = {}
  loggings.forEach(e => {
    if (Array.isArray(e.symptome)) {
      e.symptome.forEach(symptom => {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1
      })
    }
  })
  const symptomData = Object.entries(symptomCounts).map(([name, count]) => ({ name, count }))

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: 2,
        backgroundColor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        fontFamily: theme => theme.typography.fontFamily,
        overflowY: 'auto'
      }}
    >
      <Typography variant="h4" gutterBottom>Migräne Statistik</Typography>
      {/* Überblick */}
      <Grid2 container spacing={2} mb={2}>
        <StatisticCard title={`Migräne-Tage ${currentMonth}`} value={migraineDays.length} />
        <StatisticCard title="Tage seit letzter Attacke" value={daysSinceMigraine} />
        <StatisticCard title="Ø Migräne-Tage / Monat" value={migraineDays.length} />
        <StatisticCard title="Ø Schmerzstärke" value={symptomData.length} />
      </Grid2>

      {/* Symptome-Diagramm */}
      <Paper sx={{ padding: 2, mb: 2 }}>
        <Typography variant="h6">Häufigste Symptome</Typography>
        {symptomData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={symptomData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2">Keine Symptome getrackt.</Typography>
        )}
      </Paper>
    </Box>
  )
}

const StatisticCard = ({ title, value }) => (
  <Grid2 item xs={12} sm={4} md={3}>
    <Paper
      sx={{
        padding: 2,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        wordBreak: 'break-word'
      }}
    >
      <Typography variant="h4">{value}</Typography>
      <Typography variant="body">{title}</Typography>
    </Paper>
  </Grid2>
)

export default Statistics
