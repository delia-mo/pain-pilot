const calculateStatus = (s) => {
  if (s === 0) return 1
  if (s <= 3) return 2
  if (s <= 6) return 3
  if (s <= 8) return 4
  if (s <= 10) return 5
  return 6
}

export default calculateStatus
