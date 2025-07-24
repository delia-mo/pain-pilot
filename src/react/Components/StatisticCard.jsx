import React from 'react'
import PropTypes from 'prop-types'
import { Grid2, Paper, Typography } from '@mui/material'

// Definiert eine "Karte" auf der ein Element der Statistik steht
const StatisticCard = ({ title, value }) => (
  <Grid2>
    <Paper
      elevation={0}
      sx={{
        padding: 2,
        mb: 1,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        wordBreak: 'break-word'
      }}
    >
      <Typography variant="h4" sx={{ lineHeight: 1 }}>{value}</Typography>
      <Typography variant="body">{title}</Typography>
    </Paper>
  </Grid2>
)

StatisticCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default StatisticCard
