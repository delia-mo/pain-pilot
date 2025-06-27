import { useState, useEffect } from 'react'

const parseEntry = (entryString) => {
  const parts = entryString.replace('[ ', '').replace(' ]', '').split(';')
  const type = parts[0].trim()
  const data = {}
  for (let i = 1; i < parts.length; i++) {
    const [key, value] = parts[i].split(':')
    data[key.trim()] = value.trim()
  }

  return { type, ...data }
}

const useMigrainData = () => {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const rawData = JSON.parse(localStorage.getItem('migraineData') || '[]')
    const parsed = rawData.map(parseEntry)
    setEntries(parsed)
  }, [])

  const refresh = () => {
    const rawData = JSON.parse(localStorage.getItem('migraineData') || '[]')
    const parsed = rawData.map(parseEntry)
    setEntries(parsed)
  }

  const addEntry = (entry) => {
    const current = JSON.parse(localStorage.getItem('migraineData') || '[]')
    current.push(entry)
    localStorage.setItem('migraineData', JSON.stringify(current))
    refresh()
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
