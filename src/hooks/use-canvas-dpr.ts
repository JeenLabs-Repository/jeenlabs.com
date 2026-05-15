"use client"

import { useEffect, useState } from "react"

/** Cap WebGL DPR for performance on high-density mobile screens. */
export function useCanvasDpr() {
  const [dpr, setDpr] = useState(1)

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth
      const deviceRatio = window.devicePixelRatio || 1
      if (width < 640) {
        setDpr(1)
      } else if (width < 1024) {
        setDpr(Math.min(deviceRatio, 1.5))
      } else {
        setDpr(Math.min(deviceRatio, 2))
      }
    }
    update()
    window.addEventListener("resize", update, { passive: true })
    return () => window.removeEventListener("resize", update)
  }, [])

  return dpr
}
