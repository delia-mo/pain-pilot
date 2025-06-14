import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Toolbar
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const NavigationMenu = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleToggleDrawer = () => setOpen(prev => !prev)

  const handleNavigate = (path) => () => {
    navigate(path)
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={() => setOpen(true)} edge="start" color="inherit">
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleToggleDrawer}
      >
        <Toolbar />
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
      </Drawer>
    </>
  )
}

export default NavigationMenu
