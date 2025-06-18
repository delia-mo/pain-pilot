import React, { useContext, useEffect, useRef } from 'react'

import {
  Stack,
  Box,
  Typography
} from '@mui/material'

import { DateContext } from '../Context/DateContext'
import DayCard from '../Components/Home/DayCard'

const dayData = [
  { date: '2025-06-17' },
  { date: '2025-06-16' },
  { date: '2025-06-01' }
]

const Home = () => {
  const { todayStr } = useContext(DateContext)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }, [])

  return (
    <Stack
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
      <Typography variant="h5" sx={{ mb: 2 }}>
        Heute ist:
        {todayStr}
      </Typography>

      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 1,
          paddingBottom: 1
        }}
      >
        {dayData.map(day => (
          <DayCard
            date={day.date}
            todayStr={todayStr}
          />
        ))}
      </Box>
    </Stack>
  )
}

export default Home
