import React from 'react'

import {
  Card,
  CardContent,
  Typography,
  CardMedia, 
  CardActionArea
} from '@mui/material'

const DayCard = ({ date, image }) => (
  <Card sx={{ minWidth: 100, minHeight: 350 }}>
    {image ? (
      <CardMedia
        component="img"
        image={image}
        alt={date}
        sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
    ) : (
      <CardContent>
        <Typography variant="h6">{date}</Typography>
      </CardContent>
    )}
  </Card>
)

export default DayCard
