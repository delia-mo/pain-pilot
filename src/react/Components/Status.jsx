function painToStatus(schmerzen) {
  if (schmerzen <= 3) return 2
  if (schmerzen <= 6) return 3
  if (schmerzen <= 8) return 4
  return 5
}

function calculateStatus(tracking, logging) {
  // 4: Kein Eintrag
  if (!tracking && !logging) return 6

  // 3: Nur Logging vorhanden
  if (!tracking && logging) return painToStatus(logging.schmerzen || 1)

  // 2: Nur Tracking vorhanden
  if (tracking && !logging) {
    const {
      stress = 0,
      psychisch = 0,
      reize = 0,
      schlaf = 5,
      alkohol,
      nikotin,
      hydration = 2,
      meals = 2
    } = tracking

    const belastung = (stress + psychisch + reize) / 3
    const schlechteGewohnheiten = (alkohol === 'y' ? 1 : 0) + (nikotin === 'y' ? 1 : 0)
    const mangel = (2 - hydration) + (2 - meals)
    const schlafWert = schlaf < 4 ? 1 : 0

    const score = belastung + schlechteGewohnheiten + mangel + schlafWert

    if (score <= 2) return 1
    if (score <= 4) return 2
    if (score <= 6) return 3
    return 4
  }

  // 1: wenn tracking und loggin, dann loggin priorisieren
  const statusFromLogging = painToStatus(logging.schmerzen || 1)
  return Math.max(statusFromLogging, 2) // nicht unter 2, da Migräne vorhanden
}

export { painToStatus, calculateStatus }
