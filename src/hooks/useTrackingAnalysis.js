import useMigrainData from './useMigraineData'
import useTriggerLabels from './useTriggerLabels'

const useTrackingAnalysis = () => {
  const { loggings, trackings } = useMigrainData()

  // Filtert Tage mit Migräne
  const migraineDates = new Set(loggings.map(entry => entry.date))
  const trackingWithMigraine = trackings.filter(entry => migraineDates.has(entry.date))
  const trackingWithoutMigraine = trackings.filter(entry => !migraineDates.has(entry.date))

  const avg = (arr, key) => {
    const values = arr.map(entry => entry[key]).filter(value => typeof value === 'number')
    return values.length ? values.reduce((a, b) => a + b, 0) / values.length : undefined
  }

  // Berechnet Differenz, unterschiedlich je nach Skalierung der Symptome
  const getDiff = (withVal, withoutVal, reverse = false) => (reverse ? withoutVal - withVal : withVal - withoutVal)

  const reversedScale = {
    stress: false,
    psychisch: true,
    schlaf: true,
    reize: false,
    hydration: true,
    meals: true
  }

  const triggerLabels = useTriggerLabels()
  // Setzt Objekt zusammen aus dem key, dem label und bool: reverse
  const factors = Object.keys(triggerLabels)
    .map(key => ({
      key,
      name: triggerLabels[key],
      reverse: reversedScale[key]
    }))

  // Analysiert die Factors und berechnet für alle Durchschnitte mit / ohne Migräne und DIfferenz
  const analysis = factors.map(factor => {
    const avgWith = avg(trackingWithMigraine, factor.key)
    const avgWithout = avg(trackingWithoutMigraine, factor.key)
    const diff = getDiff(avgWith, avgWithout, factor.reverse)
    return { ...factor, avgWith, avgWithout, diff }
  })

  // Filtert die relevantesten Trigger
  const topTriggers = analysis
    .filter(a => a.diff > 0.1)
    .sort((a, b) => b.diff - a.diff)

  // Zählt wie häufig die relevanten Trigger vorkommen
  const triggerCounts = {}
  const topTriggerKeys = topTriggers.map(trigger => trigger.key)
  trackingWithMigraine.forEach(entry => {
    topTriggerKeys.forEach(trigger => {
      if (entry[trigger]) {
        triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1
      }
    })
  })

  return {
    trackingWithMigraine,
    trackingWithoutMigraine,
    analysis,
    topTriggers,
    triggerCounts
  }
}

export default useTrackingAnalysis
