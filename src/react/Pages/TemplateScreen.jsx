import React from 'react'
import {
  Stack,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper
} from '@mui/material'

import CustomSlider from '../Components/Slider'

const TemplateScreen = () => (
  <Stack
    sx={{
      width: '100%',
      height: '100%',
      padding: 2,
      backgroundColor: theme => theme.palette.background.default,
      color: theme => theme.palette.text.primary,
      fontFamily: theme => theme.typography.fontFamily,
      overflowY: 'auto'
    }}
  >
    {/* Typography */}
    <Stack spacing={2}>
      <Typography variant="h4">Überschrift 1</Typography>
      <Typography variant="h5">Überschrift 2</Typography>
      <Typography variant="body1">Das ist normaler Text.</Typography>
      <Typography variant="body2" color="text.secondary">Das ist sekundärer Text.</Typography>
    </Stack>
    {/* Buttons */}
    <Stack direction="row" spacing={2} my={2}>
      <Button variant="contained" size="medium" color="primary">Normaler Button</Button>
      <Button variant="outlined" size="medium" color="secondary">Sekundärer Button</Button>
    </Stack>
    {/* Inputs */}
    <Stack spacing={2} maxWidth={400}>
      <TextField label="Text input" variant="outlined" fullWidth />
      <TextField label="Zahl input" type="number" variant="outlined" fullWidth />
    </Stack>
    {/* Checkboxes */}
    <Stack spacing={2}>
      <FormControlLabel control={<Checkbox color="secondary" />} label="Stress" />
    </Stack>
    {/* Text Highlight */}
    <Stack spacing={2} my={2}>
      <Typography variant="h6">Notiz</Typography>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: theme => theme.palette.primary.dark,
          color: theme => theme.palette.secondary.contrastText,
          padding: 2,
          borderRadius: 2,
          fontSize: '1rem',
          lineHeight: 1.5
        }}
      >
        Das ist ein hervorgehobener Text oder eine Text-Box.
      </Paper>
    </Stack>
    {/* Slider */}
    <Stack spacing={2} my={2}>
      <Typography variant="h6">Schmerz Intensität</Typography>
      <CustomSlider />
    </Stack>
  </Stack>
)

export default TemplateScreen
