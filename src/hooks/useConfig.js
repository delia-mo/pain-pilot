import { useEffect, useState } from 'react'

// Lädt config Datei und gibt Inhalt zurück
const useConfig = () => {
  const [config, setConfig] = useState(undefined)
  useEffect(() => {
    fetch('/config.json').then(res => res.json()).then(setConfig).catch(err => console.error('Fehler beim Laden der config: ', err))
  }, [])
  return config
}

export default useConfig
