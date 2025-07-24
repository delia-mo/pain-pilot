import React from 'react'
import { Grid2, Paper, Typography, Box, List, ListItem } from '@mui/material'
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useTheme } from '@mui/material/styles'

import StatisticCard from '../Components/StatisticCard'

import useMigraineAnalysis from '../../hooks/useMigraineAnalysis'
import useMigraineData from '../../hooks/useMigraineData'
import useMonthLabels from '../../hooks/useMonthLabels'
import useSymptomLabels from '../../hooks/useSymptomLabels'
import useTrackingAnalysis from '../../hooks/useTrackingAnalysis'
import useTriggerLabels from '../../hooks/useTriggerLabels'

const Statistics = () => {
  const { loggings } = useMigraineData()
  const symptomFields = ['schmerzen', 'aura', 'uebelkeit', 'taubheit', 'sprechen', 'muskel']
  const loggingsWithMigraine = loggings.filter(entry => symptomFields.some(field => field in entry))
  const currentMonth = new Date().getMonth()
  const migraineDaysMonth = loggingsWithMigraine.filter(e => new Date(e.date).getMonth() === currentMonth)
  const lastMigraineDate = [...loggingsWithMigraine].sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date
  // Abrunden zum vollen Tag. Berechnung: Millisekunden * Sekunden * Minuten * Stunden für einen Tag
  const daysSinceMigraine = lastMigraineDate ? Math.floor((Date.now() - new Date(lastMigraineDate)) / (1000 * 60 * 60 * 24)) : '-'
  const avgPain = loggingsWithMigraine.length ? (loggingsWithMigraine.reduce((sum, entry) => sum + (entry.schmerzen || 0), 0) / loggingsWithMigraine.length).toFixed(1) : 0
  const { avgMigraineDaysPerMonth } = useMigraineAnalysis()

  const symptomLabels = useSymptomLabels()
  const months = useMonthLabels()
  const theme = useTheme()
  const triggerLabels = useTriggerLabels()
  const currentMonthName = months[currentMonth]

  const symptomCounts = {}
  loggingsWithMigraine.forEach(entry => {
    Object.keys(symptomLabels).forEach(symptom => {
      if (entry[symptom]) {
        symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1
      }
    })
  })
  const topSymptoms = Object.entries(symptomCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key, count]) => ({
      name: symptomLabels[key] || key,
      count
    }))

  const { topTriggers, triggerCounts } = useTrackingAnalysis()

  const chartData = Object.entries(triggerCounts).map(([key, count]) => ({
    name: triggerLabels[key] || key,
    count
  }))
  chartData.sort((a, b) => b.count - a.count)

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: 2,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      <Typography variant="h4" gutterBottom>Migräne Statistik</Typography>

      {/* Überblick */}
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 6 }}>
          <StatisticCard title={`Migräne-Tage ${currentMonthName}`} value={migraineDaysMonth.length} />
          <StatisticCard title="Ø Migräne-Tage / Monat" value={avgMigraineDaysPerMonth} />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <StatisticCard title="Tage seit letzter Attacke" value={daysSinceMigraine} />
          <StatisticCard title="Ø Schmerzstärke" value={avgPain} />
        </Grid2>
      </Grid2>

      {/* Trigger-Diagramm */}
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          mb: 1
        }}
      >
        <Typography variant="h6">Häufigste Trigger</Typography>
        {topTriggers.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height={Math.max(chartData.length * 40, 200)}
          >
            <BarChart
              layout="vertical"
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <XAxis
                type="number"
                allowDecimals={false}
                stroke={theme.palette.secondary.light}
                tick={{
                  fontSize: 14,
                  fill: theme.palette.primary.contrastText
                }}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={110}
                stroke={theme.palette.secondary.light}
                tick={{
                  fontSize: 14,
                  fill: theme.palette.primary.contrastText
                }}
              />
              <Tooltip />
              <Bar dataKey="count" fill={theme.palette.secondary.main} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2">Keine Trigger getrackt.</Typography>
        )}
      </Paper>

      {/* Top 3 Symptome */}
      <Paper
        elevation={0}
        sx={{
          padding: 2,
          mb: 1
        }}
      >
        <Typography variant="h6">Top 3 Symptome</Typography>
        {topSymptoms.length > 0 ? (
          <List dense disablePadding>
            {topSymptoms.map(s => (
              <ListItem key={s.name} sx={{ py: 0.3, px: 2 }}>
                {s.name}
                (
                {s.count}
                )
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2">Keine Symptome getrackt.</Typography>
        )}
      </Paper>
    </Box>
  )
}

export default Statistics
