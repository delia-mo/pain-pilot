import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  modalContent: {
    backgroundColor: '#1b1a55',
    padding: '20px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '400px',
    color: '#cac7fc',
    fontFamily: 'Roboto'
  },
  title: {
    marginBottom: '20px',
    fontWeight: 'bold'
  },
  input: {
    marginBottom: '15px'
  },
  button: {
    backgroundColor: '#3e5094',
    color: '#cac7fc',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    margin: '5px',
    cursor: 'pointer'
  },
  skipButton: {
    backgroundColor: '#626d99',
    color: '#cac7fc',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    fontSize: '14px',
    margin: '5px',
    cursor: 'pointer'
  }
}

const MigraineForm = ({ defaultData = {}, onSave, onSkip }) => {
  const [form, setForm] = useState({
    schmerzen: 0,
    aura: false,
    uebelkeit: false,
    taubheit: false,
    sprechen: false,
    muskel: false,
    ...defaultData
  })

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }))
  }

  return (
    <div style={styles.modalContent}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="button" style={styles.skipButton} onClick={onSkip}>
          Skip
        </button>
      </div>

      <h3 style={styles.title}>Migräne Logging</h3>

      <div style={styles.input}>
        <label htmlFor="schmerzen">
          Schmerzen (1–10):
          <br />
          {form.schmerzen}
        </label>
        <input
          type="range"
          id="schmerzen"
          min="0"
          max="10"
          name="schmerzen"
          value={form.schmerzen}
          onChange={handleChange}
        />
      </div>

      {['aura', 'uebelkeit', 'taubheit', 'sprechen', 'muskel'].map((field) => (
        <div key={field} style={styles.input}>
          <label htmlFor={field}>
            <input
              id={field}
              type="checkbox"
              name={field}
              checked={form[field]}
              onChange={handleChange}
            />
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
        </div>
      ))}

      <button type="button" style={styles.button} onClick={() => onSave(form)}>
        Speichern
      </button>
    </div>
  )
}

MigraineForm.propTypes = {
  defaultData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onSkip: PropTypes.func
}

const TrackingForm = ({ defaultData = {}, onSave }) => {
  const [form, setForm] = useState({
    stress: 0,
    schlaf: 0,
    psychisch: 0,
    alkohol: false,
    nikotin: false,
    hydration: 0,
    meals: 0,
    reize: 0,
    ...defaultData
  })

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : Number(value)
    }))
  }

  const sliderFields = [
    { name: 'stress', label: 'Stress (0–5)', min: 0, max: 5 },
    { name: 'psychisch', label: 'Psychisch (0–5)', min: 0, max: 5 },
    { name: 'reize', label: 'Reize (0–5)', min: 0, max: 5 },
    { name: 'schlaf', label: 'Schlaf (0–12)', min: 0, max: 12 },
    { name: 'hydration', label: 'Hydration (0–2)', min: 0, max: 2 },
    { name: 'meals', label: 'Meals (0–2)', min: 0, max: 2 }
  ]

  return (
    <div style={styles.modalContent}>
      <h3 style={styles.title}>Trigger Tracking</h3>

      {sliderFields.map(({ name, label, min, max }) => (
        <div key={name} style={styles.input}>
          <label htmlFor={name}>
            {label}
            :
            <br />
            {form[name]}
          </label>
          <input
            type="range"
            id={name}
            name={name}
            min={min}
            max={max}
            value={form[name]}
            onChange={handleChange}
          />
        </div>
      ))}

      {['alkohol', 'nikotin'].map((field) => (
        <div key={field} style={styles.input}>
          <label htmlFor={field}>
            <input
              id={field}
              type="checkbox"
              name={field}
              checked={form[field]}
              onChange={handleChange}
            />
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
        </div>
      ))}

      <button type="button" style={styles.button} onClick={() => onSave(form)}>
        Speichern
      </button>
    </div>
  )
}

TrackingForm.propTypes = {
  defaultData: PropTypes.object,
  onSave: PropTypes.func.isRequired
}

const calculateStatus = (s) => {
  if (s === 0) return 1
  if (s <= 3) return 2
  if (s <= 6) return 3
  if (s <= 8) return 4
  if (s <= 10) return 5
  return 6
}

const DailyLogModal = ({ date, open, onClose }) => {
  const [step, setStep] = useState(0)
  const [migraineData, setMigraineData] = useState(null)
  const [trackingData, setTrackingData] = useState(null)

  useEffect(() => {
    if (!open) return
    const migraine = JSON.parse(localStorage.getItem(`migraine-${date}`) || 'null')
    const tracking = JSON.parse(localStorage.getItem(`tracking-${date}`) || 'null')
    setMigraineData(migraine)
    setTrackingData(tracking)
    setStep(0)
  }, [date, open])

  const handleMigraineAnswer = (answer) => {
    setStep(answer ? 1 : 2)
  }

  const handleSaveMigraine = (data) => {
    const status = calculateStatus(data.schmerzen)
    const fullData = { ...data, date, status }
    localStorage.setItem(`migraine-${date}`, JSON.stringify(fullData))
    setMigraineData(fullData)
    setStep(2)
  }

  const handleSaveTracking = (data) => {
    const fullData = { ...data, date }
    localStorage.setItem(`tracking-${date}`, JSON.stringify(fullData))
    setTrackingData(fullData)
    onClose()
  }

  if (!open) return null

  return (
    <div style={styles.modal}>
      {step === 0 && (
        <div style={styles.modalContent}>
          <p>Hattest du heute Migräne?</p>
          <button type="button" style={styles.button} onClick={() => handleMigraineAnswer(true)}>
            Ja
          </button>
          <button type="button" style={styles.button} onClick={() => handleMigraineAnswer(false)}>
            Nein
          </button>
        </div>
      )}
      {step === 1 && (
        <MigraineForm
          defaultData={migraineData}
          onSave={handleSaveMigraine}
          onSkip={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <TrackingForm
          defaultData={trackingData}
          onSave={handleSaveTracking}
        />
      )}
    </div>
  )
}

DailyLogModal.propTypes = {
  date: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default DailyLogModal
