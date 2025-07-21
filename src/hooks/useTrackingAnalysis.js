import useMigrainData from './useMigraineData'
import useTriggerLabels from './useTriggerLabels'

const useTrackingAnalysis = () => {
  const { loggings, trackings } = useMigrainData()
  const migraineDates = new Set(loggings.map(entry => entry.date))

  const trackingWithMigraine = trackings.filter(entry => migraineDates.has(entry.date))
  const trackingWithoutMigraine = trackings.filter(entry => !migraineDates.has(entry.date))

  const avg = (arr, key) => {
    const values = arr.map(entry => entry[key]).filter(value => typeof value === 'number')
    return values.length ? values.reduce((a, b) => a + b, 0) / values.length : undefined
  }

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
  const factors = Object.keys(triggerLabels)
    .filter(key => Object.prototype.hasOwnProperty.call(reversedScale, key))
    .map(key => ({
      key,
      name: triggerLabels[key],
      reverse: reversedScale[key]
    }))

  const analysis = factors.map(factor => {
    const avgWith = avg(trackingWithMigraine, factor.key)
    const avgWithout = avg(trackingWithoutMigraine, factor.key)
    const diff = getDiff(avgWith, avgWithout, factor.reverse)
    return { ...factor, avgWith, avgWithout, diff }
  })

  const topTriggers = analysis
    .filter(a => a.diff > 0.1)
    .sort((a, b) => b.diff - a.diff)

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
