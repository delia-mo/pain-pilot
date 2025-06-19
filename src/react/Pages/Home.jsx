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
  { date: '2025-06-17' },
  { date: '2025-06-16' },
  { date: '2025-06-01' }
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
      <Typography variant="h4" sx={{ mb: 2 }}>
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
          />
        ))}
      </Box>

      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={() => navigate('/add-migraine')}
        sx={{
          mt: 2,
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
