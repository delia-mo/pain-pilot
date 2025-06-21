import React, { useContext, useEffect, useRef, useState } from 'react'

import {
  Stack,
  Box,
  Typography,
  Button
} from '@mui/material'

import { useNavigate } from 'react-router'

import { DateContext } from '../Context/DateContext'
import DayCard from '../Components/Home/DayCard'

function getDateNDaysBefore(dateStr, n) {
  const date = new Date(dateStr)
  date.setDate(date.getDate() - n)
  return date.toISOString().slice(0, 10) // 'YYYY-MM-DD'
}

function getStatusForDate(date) {
  for (let i = 0; i < localStorage.length; i++) {
    const value = localStorage.getItem(localStorage.key(i))
    if (value?.startsWith('loggin;')) {
      const parts = value.split(';')
      const datePart = parts.find(p => p.startsWith('date:'))
      const statusPart = parts.find(p => p.startsWith('status:'))
      const entryDate = datePart?.split(':')[1]
      if (entryDate === date) {
        const status = parseInt(statusPart?.split(':')[1], 10)
        if (!Number.isNaN(status)) return status
      }
    }
  }
  return 6 // Standard-Status, wenn kein Eintrag gefunden
}

const Home = () => {
  const { todayStr } = useContext(DateContext)
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const [logData, setLogData] = useState([])

  useEffect(() => {
    const daysToShow = 7
    const data = []

    for (let i = daysToShow; i >= 1; i--) {
      const day = getDateNDaysBefore(todayStr, i)
      const status = getStatusForDate(day)
      data.push({ date: day, status })
    }

    setLogData(data)
  }, [todayStr])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }, [logData])

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
        {logData.map(day => (
          <DayCard
            key={day.date}
            date={day.date}
            status={day.status}
            onClick={() => navigate(`/updateDay/${day.date}`)}
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
