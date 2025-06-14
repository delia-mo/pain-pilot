import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import {
  Stack,
  Typography,
  Container,
  Paper,
  BottomNavigation,
  BottomNavigationAction
} from '@mui/material'

import {
  Home,
  AddCircle as PlusCircle,
  BarChart as Statistics
} from '@mui/icons-material'

import AppRoutes from './AppRoutes'

import AppLogo from '../assets/favicon.svg'

const borderRadius = 6

const AppLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  let navigationIndex = 0
  if (location.pathname.startsWith('/track-migraine')) navigationIndex = 1
  if (location.pathname.startsWith('/statistics')) navigationIndex = 2

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '100%',
        paddingTop: theme => theme.spacing(5),
        paddingBottom: theme => theme.spacing(5)
      }}
    >
      <Container
        maxWidth="xs"
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginBottom={2}
        >
          <img
            src={AppLogo}
            alt="App Logo"
            style={{
              width: '40px',
              height: '40px'
            }}
          />
          <Typography variant="h5">
            My Mobile Health App
          </Typography>
        </Stack>
        <Paper
          elevation={6}
          sx={{
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 2,
            paddingRight: 1,
            paddingBottom: 2,
            paddingLeft: 1,
            overflow: 'hidden',
            borderRadius: theme => theme.spacing(borderRadius),
            background: theme => theme.palette.grey[900]
          }}
        >
          <Stack
            flex="1 1 auto"
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              overflow: 'hidden',
              borderRadius: theme => theme.spacing(borderRadius),
              background: theme => theme.palette.background.paper
            }}
          >
            <AppRoutes />
            <BottomNavigation
              showLabels
              value={navigationIndex}
              sx={{
                width: '100%',
                '& .MuiBottomNavigationAction-label': {
                  fontSize: '0.9rem'
                },
                // Label and icon color for selected
                '& .Mui-selected': {
                  color: 'secondary.main'
                },
                '& .Mui-selected .MuiSvgIcon-root': {
                  color: 'secondary.main'
                }
              }}
            >
              <BottomNavigationAction
                label="Home"
                icon={<Home />}
                onClick={() => navigate('/')}
              />
              <BottomNavigationAction
                label="Neue Attacke"
                icon={<PlusCircle />}
                onClick={() => navigate('/track-migraine')}
                sx={{
                  mt: -3,
                  height: 70,
                  '& .MuiSvgIcon-root': {
                    fontSize: 55
                  }
                }}
              />
              <BottomNavigationAction
                label="Statistik"
                icon={<Statistics />}
                onClick={() => navigate('/statistics')}
              />
            </BottomNavigation>
          </Stack>
        </Paper>
      </Container>
    </Stack>
  )
}

export default AppLayout
