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
      overflowY: 'scroll'
    }}
  >
    {/* Typography */}
    <Stack spacing={1}>
      <Typography variant="h4">Heading 1</Typography>
      <Typography variant="h5">Heading 2</Typography>
      <Typography variant="body1">This is a paragraph of normal text.</Typography>
      <Typography variant="body2" color="text.secondary">This is secondary text.</Typography>
    </Stack>

    {/* Buttons */}
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color="primary">Primary Button</Button>
      <Button variant="outlined" color="secondary">Secondary Button</Button>
    </Stack>

    {/* Inputs */}
    <Stack spacing={2} maxWidth={400}>
      <TextField label="Text input" variant="outlined" fullWidth />
      <TextField label="Number input" type="number" variant="outlined" fullWidth />
      <TextField label="Textarea" multiline rows={3} variant="outlined" fullWidth />
    </Stack>

    {/* Checkboxes */}
    <Stack spacing={1}>
      <FormControlLabel control={<Checkbox />} label="Stress" />
      <FormControlLabel control={<Checkbox />} label="Dehydration" />
    </Stack>

    {/* Text Highlight */}
    <Stack spacing={1}>
      <Typography variant="h6">Note</Typography>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: theme => theme.palette.primary.dark,
          color: theme => theme.palette.secondary.contrastText,
          padding: 2,
          borderRadius: 2,
          fontSize: '0.95rem',
          lineHeight: 1.5
        }}
      >
        This is a highlighted note or text box.
      </Paper>
    </Stack>

    {/* Slider */}
    <Stack spacing={0}>
      <Typography variant="h6">Schmerz Intensität</Typography>
      <CustomSlider />
    </Stack>
    <Stack spacing={0}>
      <Typography variant="h6">Schmerz Intensität</Typography>
      <CustomSlider />
    </Stack>
    <Stack spacing={0}>
      <Typography variant="h6">Schmerz Intensität</Typography>
      <CustomSlider />
    </Stack>
    <Stack spacing={0}>
      <Typography variant="h6">Schmerz Intensität</Typography>
      <CustomSlider />
    </Stack>
    <Stack spacing={0}>
      <Typography variant="h6">Schmerz Intensität</Typography>
      <CustomSlider />
    </Stack>
    <Stack spacing={0}>
      <Typography variant="h6">Schmerz Intensität</Typography>
      <CustomSlider />
    </Stack>
  </Stack>
)

export default TemplateScreen
