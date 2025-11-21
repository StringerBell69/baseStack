"use client"

import { useEffect, useState } from "react"
import { isMobileDevice, isTouchDevice } from "@/lib/utils/mobile"
import { useMediaQuery } from "@/lib/hooks/use-media-query"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    setIsMobile(isMobileDevice())
    setIsTouch(isTouchDevice())
  }, [])

  return {
    isMobile: isMobile || isSmallScreen,
    isTouch,
    isSmallScreen,
  }
}
