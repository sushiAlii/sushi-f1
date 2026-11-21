import { useEffect, useState } from 'react'

const TICK_MS = 1000

export const useNow = (simulatedNow?: number) => {
  const [now, setNow] = useState(() => simulatedNow ?? Date.now())

  useEffect(() => {
    const offset = simulatedNow === undefined ? 0 : simulatedNow - Date.now()
    const tick = () => setNow(Date.now() + offset)

    tick()
    const interval = setInterval(tick, TICK_MS)

    return () => clearInterval(interval)
  }, [simulatedNow])

  return now
}
