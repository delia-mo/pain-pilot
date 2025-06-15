import React from 'react'
import {
  Box,
  Slide,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material'

import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'

const MenuDrawer = ({ open }) => {
  const navigate = useNavigate()

  const handleNavigate = (path) => () => {
    navigate(path)
  }

  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'absolute',
          top: 64,
          right: 8,
          height: '91%',
          width: 240,
          bgcolor: 'background.paper',
          boxShadow: 3,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 3
        }}
      >
        <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Menü</Typography>
        </Toolbar>
        <Box sx={{ px: 2, py: 1 }}>
          <List sx={{ width: 250 }}>
            <ListItem button onClick={handleNavigate('/home')}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={handleNavigate('/track-migraine')}>
              <ListItemText primary="Neue Attacke" />
            </ListItem>
            <ListItem button onClick={handleNavigate('/statistics')}>
              <ListItemText primary="Statistik" />
            </ListItem>
            <ListItem button onClick={handleNavigate('/settings')}>
              <ListItemText primary="Einstellungen" />
            </ListItem>
            <ListItem button onClick={handleNavigate('/info')}>
              <ListItemText primary="Informationen" />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Slide>
  )
}

// Define prop types for `open`
MenuDrawer.propTypes = {
  open: PropTypes.bool.isRequired
}

export default MenuDrawer
