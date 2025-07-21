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
import DailyLogModal from '../Components/DailyLogModal'

function getDaysBeforeDate(dateStr, n) {
  const date = new Date(dateStr)
  date.setDate(date.getDate() - n)
  return date.toISOString().slice(0, 10) // 'YYYY-MM-DD'
}

function getStatusForDate(date) {
  const migraineRaw = localStorage.getItem(`migraine-${date}`)
  if (migraineRaw) {
    try {
      const migraine = JSON.parse(migraineRaw)
      if (typeof migraine.status === 'number') {
        return migraine.status
      }
    } catch (e) {
      console.error('Fehler beim Parsen von migraine-Eintrag:', e)
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
  const [showLogModal, setShowLogModal] = useState(false)
  const [logModalStep, setLogModalStep] = useState(0)

  // Aktualisieren der Anzeige wg Datum
  const loadLogData = () => {
    const daysToShow = 6 // 6 Tage vor heute
    const data = []

    for (let i = daysToShow; i > 0; i--) {
      const day = getDaysBeforeDate(todayStr, i)
      const status = getStatusForDate(day)
      data.push({ date: day, status })
    }

    const todayStatus = getStatusForDate(todayStr)
    data.push({ date: todayStr, status: todayStatus })

    setLogData(data)
  }

  useEffect(() => {
    loadLogData()
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
          gap: 0.2,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
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
          <Typography variant="h6">Willkommen!</Typography>
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
          <Typography variant="body1" sx={{ mb: 2 }}>
            Hattest du heute schon Migräne?
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="small"
              sx={{ flex: 0.5 }}
              onClick={() => {
                setShowSplash(false)
                setLogModalStep(1)
                setShowLogModal(true)
              }}
            >
              Ja
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ flex: 0.5 }}
              onClick={() => {
                setShowSplash(false)
                setLogModalStep(2)
                setShowLogModal(true)
              }}
            >
              Nein
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {showLogModal && (
        <DailyLogModal
          date={todayStr}
          open
          startStep={logModalStep}
          onClose={() => {
            setShowLogModal(false)
            loadLogData()
          }}
        />
      )}

    </Stack>
  )
}

export default Home
