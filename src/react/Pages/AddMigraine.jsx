import React, { useState } from 'react'
import { Stack, Button } from '@mui/material'
import DailyLogModal from '../Components/DailyLogModal'

const AddMigraine = () => {
  const [modalOpen, setModalOpen] = useState(true)
  const today = new Date().toISOString().split('T')[0]

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        padding: 2,
        backgroundColor: theme => theme.palette.background.default,
        color: theme => theme.palette.text.primary,
        fontFamily: theme => theme.typography.fontFamily,
        overflowY: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
      >
        Tägliches Logging öffnen
      </Button>

      <DailyLogModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        date={today}
      />
    </Stack>
  )
}

export default AddMigraine
