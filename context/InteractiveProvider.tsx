"use client"
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Howl } from 'howler'
import { fireConfetti } from '../utils/confetti'
import useKonami from '../hooks/useKonami'
import { initLenis } from '../lib/lenis'
import content from '../data/content.json'

type Ctx = {
  celebrate: () => void
  ambientPlaying: boolean
  toggleAmbient: () => void
  duckAmbient: () => void
  restoreAmbient: () => void
}
const C = createContext<Ctx | undefined>(undefined)

export function useInteractive(){
  const c = useContext(C)
  if (!c) throw new Error('useInteractive must be inside InteractiveProvider')
  return c
}

export default function InteractiveProvider({ children }: { children: React.ReactNode }){
  const celebrate = useCallback(()=>{ fireConfetti() }, [])
  const soundRef = useRef<Howl | null>(null)
  const wasDucked = useRef(false)
  const pauseTimeout = useRef<number | null>(null)
  const [ambientPlaying, setAmbientPlaying] = useState(false)

  useKonami(()=>{ celebrate() })
  useEffect(()=>{ initLenis() }, [])

  useEffect(() => {
    const src = content.hero.audioSrc
    if (!src) return
    const sound = new Howl({ src: [src], volume: 0, loop: true })
    soundRef.current = sound

    sound.on('play', () => setAmbientPlaying(true))
    sound.on('pause', () => setAmbientPlaying(false))
    sound.on('stop', () => setAmbientPlaying(false))

    // Browsers block non-gesture audio autoplay. Attempt immediately, then
    // fall back to starting on the visitor's first genuine click/tap/keypress.
    sound.once('play', () => {
      sound.fade(0, 0.7, 2500)
      window.removeEventListener('pointerdown', tryPlay)
      window.removeEventListener('keydown', tryPlay)
    })

    const tryPlay = () => { if (!sound.playing()) sound.play() }
    tryPlay()
    window.addEventListener('pointerdown', tryPlay)
    window.addEventListener('keydown', tryPlay)

    return () => {
      window.removeEventListener('pointerdown', tryPlay)
      window.removeEventListener('keydown', tryPlay)
      sound.unload()
    }
  }, [])

  const toggleAmbient = useCallback(() => {
    const sound = soundRef.current
    if (!sound) return
    if (pauseTimeout.current) {
      window.clearTimeout(pauseTimeout.current)
      pauseTimeout.current = null
    }
    if (sound.playing()) {
      sound.fade(sound.volume(), 0, 1000)
      pauseTimeout.current = window.setTimeout(() => sound.pause(), 1000)
    } else {
      sound.play()
      sound.fade(0, 0.7, 1200)
    }
  }, [])

  const duckAmbient = useCallback(() => {
    const sound = soundRef.current
    if (!sound || !sound.playing()) return
    wasDucked.current = true
    sound.fade(sound.volume(), 0, 400)
    window.setTimeout(() => sound.stop(), 400)
  }, [])

  const restoreAmbient = useCallback(() => {
    const sound = soundRef.current
    if (!sound || !wasDucked.current) return
    wasDucked.current = false
    sound.play()
    sound.fade(0, 0.7, 800)
  }, [])

  const value = useMemo(
    () => ({ celebrate, ambientPlaying, toggleAmbient, duckAmbient, restoreAmbient }),
    [celebrate, ambientPlaying, toggleAmbient, duckAmbient, restoreAmbient]
  )

  return (
    <C.Provider value={value}>
      {children}
    </C.Provider>
  )
}
