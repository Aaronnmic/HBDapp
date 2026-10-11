"use client"
import { useInteractive } from '../context/InteractiveProvider'

export default function AmbientAudioToggle(){
  const { ambientPlaying, toggleAmbient } = useInteractive()

  return (
    <button
      aria-label={ambientPlaying ? 'Pause music' : 'Play music'}
      onClick={toggleAmbient}
      className="fixed left-6 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#5DADE2]/50 bg-white/90 text-[#034694] shadow-glow backdrop-blur-xl transition hover:bg-white"
    >
      <span className="text-lg">{ambientPlaying ? '❚❚' : '▶'}</span>
    </button>
  )
}
