import React, { createContext, useMemo } from 'react'
import PropTypes from 'prop-types'

// ein React Context, um das aktuelle Datum global verfügbar zu machen
// das aktuelle Datum wird als String zur Verfügung gestellt
// '2025-06-18'

export const DateContext = createContext({
  todayStr: new Date().toISOString().slice(0, 10)
})

// DateProvider ist eine Komponente, die das Datum für alle
// Kinder-Komponenten zur Verfügung stellt
export const DateProvider = ({ children }) => {
  // aktuelles Datum
  const todayStr = new Date().toISOString().slice(0, 10)

  // useMemo = nur neu erstellen, wenn todayStr sich ändert
  const value = useMemo(() => ({ todayStr }), [todayStr])

  return (
    // DateContext.Provider stellt aktuelles Datum zur Verfügung
    <DateContext.Provider value={value}>
      {children}
    </DateContext.Provider>
  )
}

DateProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default DateContext
