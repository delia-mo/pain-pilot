import React, { useContext, useEffect, useRef } from 'react'

import {
  Stack,
  Box,
  Typography,
  Button
} from '@mui/material'

import { useNavigate } from 'react-router'

import { DateContext } from '../Context/DateContext'
import DayCard from '../Components/Home/DayCard'

const dayData = [
  { date: '2025-06-17', status: 0 },
  { date: '2025-06-16', status: 1 },
  { date: '2025-06-17', status: 2 },
  { date: '2025-06-16', status: 3 },
  { date: '2025-06-17', status: 4 },
  { date: '2025-06-16', status: 5 },
  { date: '2025-06-01', status: 6 }
]

const Home = () => {
  const { todayStr } = useContext(DateContext)
  const scrollRef = useRef(null)
  const navigate = useNavigate()

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
      <Typography variant="h4" sx={{ mt: 3, mb: 3 }}>
        Hallo!
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
            status={day.status}
          />
        ))}
      </Box>

      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={() => navigate('/add-migraine')}
        sx={{
          mt: 3,
          mb: 2,
          textTransform: 'none',
          width: 'fit-content',
          alignSelf: 'center'
        }}
      >
        Wie fühlst du dich heute?
      </Button>

    </Stack>
  )
}

export default Home
