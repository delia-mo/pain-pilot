import React from 'react'
import PropTypes from 'prop-types'
import { Grid2, Paper, Typography } from '@mui/material'

const StatisticCard = ({ title, value }) => (
  <Grid2 xs={12} sm={4} md={3}>
    <Paper
      elevation={0}
      sx={{
        padding: 2,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        wordBreak: 'break-word'
      }}
    >
      <Typography variant="h4">{value}</Typography>
      <Typography variant="body">{title}</Typography>
    </Paper>
  </Grid2>
)

StatisticCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default StatisticCard
