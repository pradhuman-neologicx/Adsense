'use client'

import { useState, useEffect, useCallback } from 'react'

export type Region = 'US' | 'IN'

export const REGION_STORAGE_KEY = 'comparegrid_region_preference'
const REGION_EVENT = 'comparegrid_region_changed'

/**
 * Synchronous client-side heuristic detection:
 * - Checks if manual preference is stored in localStorage.
 * - Otherwise inspects browser timezone (e.g. Asia/Kolkata or Asia/Calcutta -> India).
 * - Otherwise inspects browser language (e.g. en-IN, hi -> India).
 * - Default for all other locations worldwide: 'US' (Dollar).
 */
export function detectClientRegion(): Region {
  if (typeof window === 'undefined') return 'IN'

  try {
    const saved = localStorage.getItem(REGION_STORAGE_KEY)
    if (saved === 'IN' || saved === 'US') {
      return saved
    }
  } catch {
    // LocalStorage might be disabled in private browsing
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') {
      return 'IN'
    }

    const langs = navigator.languages || [navigator.language || '']
    const isIndianLocale = langs.some(l => {
      const lower = (l || '').toLowerCase()
      return (
        lower === 'en-in' ||
        lower === 'hi' ||
        lower.startsWith('hi-') ||
        lower.endsWith('-in')
      )
    })
    if (isIndianLocale) {
      return 'IN'
    }
  } catch {
    // Heuristics error fallback
  }

  // Any other country in the world defaults to USD ($)
  return 'US'
}

/**
 * Save manual preference so auto-detection never overwrites user's deliberate choice
 */
export function saveRegionPreference(region: Region) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(REGION_STORAGE_KEY, region)
    window.dispatchEvent(new CustomEvent(REGION_EVENT, { detail: region }))
  } catch {
    // Ignore storage errors
  }
}

/**
 * React hook to access and toggle the current region across all pages.
 * - Automatically detects India vs elsewhere on first visit.
 * - Supports manual switching anytime with permanent persistence.
 * - Keeps all components and browser tabs synchronized in real time.
 */
export function useRegion(defaultRegion?: Region) {
  const [region, setRegionState] = useState<Region>(defaultRegion || 'IN')
  const [isReady, setIsReady] = useState(false)

  // Sync with client-side detection & localStorage on mount
  useEffect(() => {
    const detected = detectClientRegion()
    setRegionState(detected)
    setIsReady(true)

    // If user hasn't manually set a preference yet, optionally refine with edge geo-headers
    try {
      const hasManualChoice = localStorage.getItem(REGION_STORAGE_KEY)
      if (!hasManualChoice) {
        fetch('/api/detect-region')
          .then(res => res.json())
          .then(data => {
            if (data?.region && (data.region === 'IN' || data.region === 'US')) {
              setRegionState(data.region)
            }
          })
          .catch(() => {
            // Silently retain timezone detection result
          })
      }
    } catch {
      // Storage unavailable
    }

    // Listen for manual region change in other components or tabs
    const handleRegionChange = (e: Event) => {
      const customEvent = e as CustomEvent<Region>
      if (customEvent.detail === 'IN' || customEvent.detail === 'US') {
        setRegionState(customEvent.detail)
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === REGION_STORAGE_KEY && (e.newValue === 'IN' || e.newValue === 'US')) {
        setRegionState(e.newValue as Region)
      }
    }

    window.addEventListener(REGION_EVENT, handleRegionChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener(REGION_EVENT, handleRegionChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const setRegion = useCallback((newRegion: Region) => {
    setRegionState(newRegion)
    saveRegionPreference(newRegion)
  }, [])

  return { region, setRegion, isReady }
}

