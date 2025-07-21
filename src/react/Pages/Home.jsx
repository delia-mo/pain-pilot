import React, { useContext, useEffect, useRef, useState } from 'react'

import {
  Stack,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

import { useNavigate } from 'react-router'

import { DateContext } from '../Context/DateContext'
import DayCard from '../Components/Home/DayCard'

function getDaysBeforeDate(dateStr, n) {
  const date = new Date(dateStr)
  date.setDate(date.getDate() - n)
  return date.toISOString().slice(0, 10) // 'YYYY-MM-DD'
}

function getStatusForDate(date) {
  for (let i = 0; i < localStorage.length; i++) {
    const value = localStorage.getItem(localStorage.key(i))
    if (value?.startsWith('logging;')) {
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
  return 6
}

const Home = () => {
  const { todayStr } = useContext(DateContext)
  const scrollRef = useRef(null)
  const navigate = useNavigate()
  const [logData, setLogData] = useState([])
  const [showSplash, setShowSplash] = useState(false)

  // Aktualisieren der Anzeige wg Datum
  useEffect(() => {
    const daysToShow = 7
    const data = []

    const todayStatus = getStatusForDate(todayStr)
    const includeToday = todayStatus !== 6 

    for (let i = daysToShow - 1; i >= 0; i--) {
      const offset = includeToday ? i : i + 1
      const day = getDaysBeforeDate(todayStr, offset)
      const status = getStatusForDate(day)
      data.push({ date: day, status })
    }

    if (includeToday) {
      data.push({ date: todayStr, status: todayStatus })
    }

    setLogData(data)
  }, [todayStr])

  // Scrollen von rechts
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
    }
  }, [logData])

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    const alreadyShown = localStorage.getItem(`splash-shown-${today}`)
    if (!alreadyShown) {
      setShowSplash(true)
      localStorage.setItem(`splash-shown-${today}`, 'true')
    }
  }, [])

  // wetter
  const [weatherData, setWeatherData] = useState(null)
  const [weatherWarning, setWeatherWarning] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?lat=52.52&lon=13.405&appid=DEIN_API_KEY&units=metric&lang=de'
        )
        const data = await response.json()
        setWeatherData(data)

        const weatherMain = data.weather?.[0]?.main
        if (weatherMain === 'Thunderstorm') {
          setWeatherWarning('Achtung: Gewitter – Migränegefahr möglich')
        } else {
          setWeatherWarning(null)
        }
      } catch (err) {
        console.error('Fehler beim Laden des Wetters:', err)
      }
    }

    fetchWeather()
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
          '&::-webkit-scrollbar': {
            height: 6
          },
          '&::-webkit-scrollbar-track': {
            background: '#222'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: 4
          }
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
        color="secondary"
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

      {weatherData && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2">
            Wetter:
            {weatherData.weather?.[0]?.description ?? '–'}
          </Typography>
          <Typography variant="body2">
            Luftdruck:
            {weatherData.main?.pressure ?? '–'}
            hPa
          </Typography>

          {weatherWarning && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: 'warning.light',
                color: 'warning.contrastText',
                borderRadius: 2
              }}
            >
              <Typography variant="body1">{weatherWarning}</Typography>
            </Box>
          )}
        </Box>
      )}

      <Dialog
        open={showSplash}
        onClose={() => setShowSplash(false)}
        aria-labelledby="splash-dialog-title"
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            pr: 7,
            position: 'relative'
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setShowSplash(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              mt: 2
            }}
          >
            <Typography variant="h5">Willkommen zurück!</Typography>
            <Typography>Wie geht es dir heute?</Typography>

            <Button
              variant="contained"
              onClick={() => {
                setShowSplash(false)
                navigate('/add-migraine')
              }}
              sx={{
                mt: 2,
                textTransform: 'none'
              }}
            >
              Jetzt eintragen
            </Button>
          </Box>
        </DialogContent>

      </Dialog>

    </Stack>
  )
}

export default Home
