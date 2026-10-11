"use client"
import { useRef, useState } from 'react'
import { useInteractive } from '../context/InteractiveProvider'
import content from '../data/content.json'

const { moonMessage: moonMessageText, heartNote: heartNoteText } = content.easterEggs

export default function EasterEggs(){
  const [moonMessage, setMoonMessage] = useState(false)
  const [heartNote, setHeartNote] = useState(false)
  const pressTimer = useRef<number | null>(null)
  const { hintTarget, markFound } = useInteractive()

  function startPress(){
    pressTimer.current = window.setTimeout(() => {
      setHeartNote(true)
      markFound('heart')
    }, 600)
  }

  function cancelPress(){
    if (pressTimer.current) {
      window.clearTimeout(pressTimer.current)
      pressTimer.current = null
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <button
        aria-label="moon"
        className={`pointer-events-auto fixed right-6 top-6 text-2xl opacity-60 transition hover:opacity-100 ${hintTarget === 'moon' ? 'animate-hint-zoom' : ''}`}
        onClick={() => {
          setMoonMessage(true)
          markFound('moon')
        }}
      >
        🌙
      </button>
      <button
        aria-label="heart"
        className={`pointer-events-auto fixed left-6 top-6 text-2xl opacity-60 transition hover:opacity-100 ${hintTarget === 'heart' ? 'animate-heart-squeeze' : ''}`}
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
      >
        ❤️
      </button>

      {moonMessage && (
        <div className="pointer-events-auto fixed inset-0 flex items-center justify-center bg-black/70 p-6">
          <div className="max-w-md rounded-[2rem] border border-white/10 bg-card p-8 text-center shadow-glow">
            <p className="text-lg leading-8 text-[#082B59]">{moonMessageText}</p>
            <button onClick={() => setMoonMessage(false)} className="mt-6 rounded-full border border-[#5DADE2]/40 bg-white/90 px-6 py-2 text-sm text-[#034694] hover:bg-white">Close</button>
          </div>
        </div>
      )}

      {heartNote && (
        <div className="pointer-events-auto fixed inset-0 flex items-center justify-center bg-black/70 p-6">
          <div className="max-w-md rounded-[2rem] border border-white/10 bg-card p-8 text-center shadow-glow">
            <p className="text-lg leading-8 text-[#082B59]">{heartNoteText}</p>
            <button onClick={() => setHeartNote(false)} className="mt-6 rounded-full border border-[#5DADE2]/40 bg-white/90 px-6 py-2 text-sm text-[#034694] hover:bg-white">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
