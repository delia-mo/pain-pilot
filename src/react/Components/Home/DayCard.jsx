import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Typography
} from '@mui/material'

import bild0 from '../../../assets/bild-0.svg'
import bild1 from '../../../assets/bild-1.svg'
import bild2 from '../../../assets/bild-2.svg'
import bild3 from '../../../assets/bild-3.svg'
import bild4 from '../../../assets/bild-4.svg'
import bild5 from '../../../assets/bild-5.svg'
import bild6 from '../../../assets/bild-6.svg'

const images = {
  0: bild0,
  1: bild1,
  2: bild2,
  3: bild3,
  4: bild4,
  5: bild5,
  6: bild6
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  return `${day}.${month}.`
}

const DayCard = ({ date, status, onClick }) => {
  const safeStatus = [0, 1, 2, 3, 4, 5].includes(status) ? status : 6

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        minWidth: 100,
        minHeight: 350,
        backgroundImage: `url(${images[safeStatus]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#cac7fc',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'relative',
        paddingBottom: 1
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

DayCard.propTypes = {
  date: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  onClick: PropTypes.func
}

export default DayCard
