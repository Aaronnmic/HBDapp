"use client"
import { useEffect, useRef } from 'react'
import content from '../data/content.json'

type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string }

const COLORS = ['#E56AB3', '#FF6B9D', '#C2185B', '#FFD37A']
const { title, line1, line2 } = content.ending

export default function Ending(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)
    let particles: Particle[] = []
    let raf = 0

    function resize(){
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    function burst(x: number, y: number){
      const count = 40
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count
        const speed = 2 + Math.random() * 3
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        })
      }
    }

    function tick(){
      if (!ctx) return
      // Fully clear (not a translucent overlay) so the shared ambient
      // background stays visible behind the fireworks, matching every
      // other chapter instead of washing out to solid pink over time.
      ctx.clearRect(0, 0, width, height)
      particles = particles.filter((p) => p.life > 0)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02
        p.life -= 0.012
        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(tick)
    }

    const interval = window.setInterval(() => {
      burst(Math.random() * width, height * (0.2 + Math.random() * 0.4))
    }, 900)

    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', resize)
      window.clearInterval(interval)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="ending" className="relative min-h-screen overflow-hidden py-24 pb-32">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="text-6xl">❤️</div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gradient-romance">{title}</h2>
        <p className="text-xl text-[#6B2247]/90">{line1}</p>
        <p className="text-lg text-[#8A6478]">{line2}</p>
      </div>
    </section>
  )
}
