"use client"
import { useEffect, useState, type ReactNode, type FormEvent } from 'react'
import content from '../data/content.json'

const { title, subtitle, placeholder, password, unlockLabel, wrongMessage, hintButtonLabel, hints } = content.gate
const STORAGE_KEY = 'story-unlocked'

export default function PasswordGate({ children }: { children: ReactNode }){
  const [checked, setChecked] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)
  const [hintIndex, setHintIndex] = useState(-1)

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === 'true') setUnlocked(true)
    setChecked(true)
  }, [])

  function handleSubmit(e: FormEvent){
    e.preventDefault()
    if (value.trim().toLowerCase() === password.trim().toLowerCase()) {
      window.localStorage.setItem(STORAGE_KEY, 'true')
      setUnlocked(true)
    } else {
      setWrong(true)
      setValue('')
    }
  }

  function handleHint(){
    setHintIndex((i) => (i + 1 < hints.length ? i + 1 : i))
  }

  if (!checked) return null
  if (unlocked) return <>{children}</>

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-gradient-to-br from-[#FCE4EC] via-[#FFF0F5] to-[#FCE4EC] px-6 py-16">
      <div className="pointer-events-none absolute inset-0 backdrop-blur-3xl" />
      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-sm rounded-[2rem] border border-white/10 bg-card p-8 text-center shadow-glow backdrop-blur-xl">
        <div className="mb-4 text-4xl">🔒</div>
        <h1 className="mb-2 text-2xl font-semibold text-gradient-romance">{title}</h1>
        <p className="mb-6 text-sm text-[#8A6478]">{subtitle}</p>
        <input
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setWrong(false) }}
          placeholder={placeholder}
          autoFocus
          className="w-full rounded-full border border-[#E56AB3]/30 bg-white/70 px-5 py-3 text-center text-[#6B2247] outline-none focus:border-[#E56AB3]"
        />
        {wrong && <p className="mt-3 text-xs text-[#C2185B]">{wrongMessage}</p>}
        <button type="submit" className="mt-5 w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#3D0F28] transition hover:brightness-110">
          {unlockLabel}
        </button>
        {hints.length > 0 && (
          <div className="mt-4">
            {hintIndex >= 0 && <p className="mb-2 text-xs text-[#8A6478]">{hints[hintIndex]}</p>}
            {hintIndex + 1 < hints.length && (
              <button
                type="button"
                onClick={handleHint}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D6488F] underline"
              >
                {hintButtonLabel}
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  )
}
