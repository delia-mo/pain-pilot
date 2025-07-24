import useMigraineData from './useMigraineData'
import useSymptomLabels from './useSymptomLabels'

const useMigraineAnalysis = () => {
  const { loggings } = useMigraineData()
  const symptomFields = ['schmerzen', 'aura', 'uebelkeit', 'taubheit', 'sprechen', 'muskel']
  const symptomLabels = useSymptomLabels()
  // Filtert Loggings mit Migräne, bei denen mind. 1 der Symptomfelder steht
  const migraineLoggings = loggings.filter(entry => symptomFields.some(field => entry[field]))

  // Zählt wie oft Symptome vorkommen
  const symptomCounts = {}
  migraineLoggings.forEach(entry => {
    symptomFields.forEach(field => {
      if (entry[field]) {
        symptomCounts[field] = (symptomCounts[field] || 0) + 1
      }
    })
  })

  // Top 3 Symptome aller Attacken
  const topSymptoms = Object.entries(symptomCounts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([key, count]) => ({ name: symptomLabels[key], count }))

  // Sortiert Migräne Daten und speichert das neuste
  const lastMigraineDate = [...migraineLoggings].sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date

  // Berechnet Differenz von Tagen seit letzter Attacke, wenn der Wert leer ist, dann '-'
  const daysSinceLastAttack = lastMigraineDate ? Math.floor((Date.now() - new Date(lastMigraineDate)) / (1000 * 60 * 60 * 24)) : '-'

  // Durschnittliche Schmerzen aus allen Einträgen, sonst 0
  const avgPain = migraineLoggings.length ? (migraineLoggings.reduce((sum, e) => sum + (e.schmerzen || 0), 0) / migraineLoggings.length).toFixed(1) : 0

  // Berechnet Migränetage im aktuellen Monat
  const currentMonth = new Date().getMonth()
  const migraineDaysMonth = migraineLoggings.filter(e => new Date(e.date).getMonth() === currentMonth)

  // TZählt Migräne Tage in einem Monat
  const migraineDays = new Set(migraineLoggings.map(e => e.date))
  const migraineDaysPerMonth = {}
  migraineDays.forEach(dateStr => {
    const month = dateStr.slice(0, 7) // YYYY-MM
    migraineDaysPerMonth[month] = (migraineDaysPerMonth[month] || 0) + 1
  })

  // Berechnet durchschnittliche Migräne-Tage pro Monat
  const totalMonths = Object.keys(migraineDaysPerMonth).length
  const totalMigraineDays = Object.values(migraineDaysPerMonth).reduce((sum, value) => sum + value, 0)
  const avgMigraineDaysPerMonth = totalMonths > 0 ? (totalMigraineDays / totalMonths).toFixed(1) : 0

  return {
    migraineLoggings,
    topSymptoms,
    avgPain,
    daysSinceLastAttack,
    migraineDaysMonth,
    avgMigraineDaysPerMonth
  }
}

export default useMigraineAnalysis
