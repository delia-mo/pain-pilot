import React from 'react'

import {
  Stack,
  Typography,
  Button
} from '@mui/material'

import { useNavigate } from 'react-router'

const AddMigraine = () => {
  const navigate = useNavigate()

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
        justifyFlowY: 'auto',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >

      <Stack spacing={4} alignItems="center">
        <Typography variant="h4" textAlign="center">
          Hast du heute Migräne?
        </Typography>
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => navigate('/migrainLog')}
            sx={{ textTransform: 'none' }}
          >
            Ja
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => navigate('/tracking')}
            sx={{ textTransform: 'none' }}
          >
            Nein
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AddMigraine
