import React from 'react'

import {
  Card,
  Typography
} from '@mui/material'

const gradients = {
  0: ['#1e1c87', '#1b1a55'],
  1: ['#2c2a9c', '#1e1c87'],
  2: ['#4643b2', '#2c2a9c'],
  3: ['#635fc3', '#4643b2'],
  4: ['#7c77d4', '#635fc3'],
  5: ['#9994e6', '#7c77d4'],
  6: ['#364a96', '#1b1a55']
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  return `${day}.${month}.`
}


const DayCard = ({ date, status }) => {
  const gradient = gradients[status] || gradients[6]
  return (
    <Card
      sx={{
        minWidth: 100,
        minHeight: 350,
        background: `radial-gradient(circle at top left, ${gradient[0]}, ${gradient[1]}, ${gradient[0]})`,
        color: '#cac7fc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography
        variant="body1"
        sx={{
          mt: 30
        }}
      >
        {formatDate(date)}
      </Typography>

    </Card>
  )
}

export default DayCard
