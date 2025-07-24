import { useEffect, useState } from 'react'

const useConfig = () => {
  const [config, setConfig] = useState(undefined)
  useEffect(() => {
    fetch('/config.json').then(res => res.json()).then(setConfig).catch(err => console.error('Fehler beim Laden der config: ', err))
  }, [])
  console.log(config)
  return config
}

export default useConfig
