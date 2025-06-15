import React from 'react'
import { AppBar, Toolbar, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import PropTypes from 'prop-types'

const TopMenuBar = ({ onMenuClick }) => (
  <AppBar
    position="absolute"
    sx={{
      top: 16,
      left: 8,
      width: '96.4%',
      zIndex: 1,
      backgroundColor: 'transparent',
      elevation: 0,
      overflow: 'hidden',
      borderTopLeftRadius: (theme) => theme.spacing(6),
      borderTopRightRadius: (theme) => theme.spacing(6) }}
  >
    <Toolbar variant="dense">
      <IconButton edge="end" color="inherit" onClick={onMenuClick} sx={{ marginLeft: 'auto' }}>
        <MenuIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
)

TopMenuBar.propTypes = {
  onMenuClick: PropTypes.func.isRequired
}

export default TopMenuBar
