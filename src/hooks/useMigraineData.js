import { useState, useEffect } from 'react'

const useMigrainData = () => {
  const [entries, setEntries] = useState([])

  // Alles aus localStorage laden
  const readAllEntries = () => {
    const parsed = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      if (key.startsWith('migraine-')) {
        try {
          const data = JSON.parse(localStorage.getItem(key))
          if (data) parsed.push({ type: 'logging', ...data })
        } catch (e) {
          console.warn('Fehler beim Parsing von Migräne-Daten mit Key ', key)
        }
      }

      if (key.startsWith('tracking-')) {
        try {
          const data = JSON.parse(localStorage.getItem(key))
          if (data) parsed.push({ type: 'tracking', ...data })
        } catch (e) {
          console.warn('Fehler beim Parsen von Tacking-Daten mit Key ', key)
        }
      }
    }
    return parsed
  }

  useEffect(() => {
    setEntries(readAllEntries())
  }, [])

  const refresh = () => {
    setEntries(readAllEntries())
  }

  const addEntry = (type, data) => {
    if (!data?.date) {
      console.warn('Eitrag ohne Datum kann nicht gespeichert werden.')
    }

    const key = `${type === 'logging' ? 'migraine' : 'tracking'}-${data.date}`
    localStorage.setItem(key, JSON.stringify(data))
  }

  return {
    entries,
    refresh,
    addEntry,
    trackings: entries.filter(e => e.type === 'tracking'),
    loggings: entries.filter(e => e.type === 'logging')
  }
}

export default useMigrainData
