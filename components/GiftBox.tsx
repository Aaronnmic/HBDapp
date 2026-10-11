"use client"
import { useEffect, useState } from 'react'
import { useInteractive } from '../context/InteractiveProvider'
import content from '../data/content.json'

const { chapter, title, intro, buttonLabel, buttonLabelOpening, tapToOpenLabel, letterText } = content.gift

export default function GiftBox() {
  const [opened, setOpened] = useState(false)
  const [envelopeReady, setEnvelopeReady] = useState(false)
  const [letterOpened, setLetterOpened] = useState(false)
  const [text, setText] = useState('')
  const { celebrate } = useInteractive()

  useEffect(() => {
    if (!opened) return
    const timeout = window.setTimeout(() => setEnvelopeReady(true), 900)
    return () => window.clearTimeout(timeout)
  }, [opened])

  useEffect(() => {
    if (!letterOpened) return
    let i = 0
    const interval = window.setInterval(() => {
      setText(letterText.slice(0, i))
      i += 1
      if (i > letterText.length) {
        window.clearInterval(interval)
      }
    }, 28)
    return () => window.clearInterval(interval)
  }, [letterOpened])

  function handleOpen() {
    setOpened(true)
    celebrate()
  }

  return (
    <section id="gift" className="py-24">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="text-sm uppercase tracking-[0.4em] text-[#8CC8FF] mb-4">{chapter}</div>
        <h2 className="text-4xl md:text-5xl font-semibold text-gradient-romance mb-6">{title}</h2>
        <p className="mx-auto mb-12 max-w-2xl text-white/90 leading-8">{intro}</p>

        {!envelopeReady && !letterOpened && (
          <>
            <button
              onClick={handleOpen}
              disabled={opened}
              aria-label={buttonLabel}
              className="mx-auto flex h-56 w-full items-center justify-center disabled:cursor-default"
            >
              <span className={`text-[130px] leading-none ${opened ? 'animate-shake-letter' : ''}`}>🎁</span>
            </button>
            <button
              onClick={handleOpen}
              disabled={opened}
              className="mt-6 rounded-full bg-gradient-to-r from-[#5DADE2] via-[#1E6DBB] to-[#034694] px-8 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(93,173,226,0.25)] transition hover:scale-[1.02] hover:brightness-110 disabled:cursor-default disabled:hover:scale-100 disabled:hover:brightness-100"
            >
              {opened ? buttonLabelOpening : buttonLabel}
            </button>
          </>
        )}

        {envelopeReady && !letterOpened && (
          <button
            onClick={() => setLetterOpened(true)}
            aria-label={tapToOpenLabel}
            className="mx-auto flex h-56 flex-col items-center justify-center gap-3 animate-pop-up"
          >
            <span className="text-7xl animate-shake-letter">💌</span>
            <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#034694] shadow-glow">
              {tapToOpenLabel}
            </span>
          </button>
        )}

        {letterOpened && (
          <div
            className="mt-2 rounded-[1.5rem] border border-[#8CC8FF] p-10 text-left whitespace-pre-wrap font-letter text-lg leading-9 text-[#082B59] min-h-[220px] shadow-[0_30px_70px_rgba(93,173,226,0.22)] animate-pop-up"
            style={{
              background: 'repeating-linear-gradient(#F8FCFF 0px, #F8FCFF 34px, #D6ECFF 35px)',
            }}
          >
            {text}
          </div>
        )}
      </div>
    </section>
  )
}
