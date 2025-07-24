import useMigraineData from './useMigraineData'

const useMigraineAnalysis = () => {
  const { loggings } = useMigraineData()
  const symptomFields = ['schmerzen', 'aura', 'uebelkeit', 'taubheit', 'sprechen', 'muskel']
  const loggingsWithMigraine = loggings.filter(entry => symptomFields.some(field => field in entry))

  const migraineDays = new Set(loggingsWithMigraine.map(e => e.date))

  // Gruppierung nach Monat
  const migraineDaysPerMonth = {}
  migraineDays.forEach(dateStr => {
    const monthKey = dateStr.slice(0, 7) // YYYY-MM
    if (!migraineDaysPerMonth[monthKey]) {
      migraineDaysPerMonth[monthKey] = 0
    }
    migraineDaysPerMonth[monthKey] += 1
  })

  // Durchschnitt berechnen
  const totalMonths = Object.keys(migraineDaysPerMonth).length
  const totalMigraineDays = Object.values(migraineDaysPerMonth).reduce((sum, val) => sum + val, 0)
  const avgMigraineDaysPerMonth = totalMonths > 0
    ? (totalMigraineDays / totalMonths).toFixed(1)
    : 0

  return {
    avgMigraineDaysPerMonth
  }
}

export default useMigraineAnalysis
