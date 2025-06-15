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

// Defines the side menu that appears on click on the burger menu icon
const MenuDrawer = ({ open }) => {
  // Function to navigate in the browser
  const navigate = useNavigate()

  // Navigate to the defined path
  const handleNavigate = (path) => () => {
    navigate(path)
  }

  return (
    // Slide in from the left when `open` is true, mount on enter, unmount on exit
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'absolute',
          top: 64,
          right: 8,
          height: '91%',
          width: 240,
          bgcolor: 'background.default',
          borderLeft: '1px solid',
          borderColor: 'primary.dark',
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
        <Box sx={{ px: 1, py: 2 }}>
          <List>
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
