"use client"
import { useEffect, useState } from 'react'

const PARTICLE_COUNT = 22

type Particle = {
  id: number
  left: number
  size: number
  duration: number
  delay: number
}

export default function FloatingCakes(){
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, (_, index) => {
        return {
          id: index,
          left: Math.random() * 100,
          size: 18 + Math.random() * 14,
          duration: 14 + Math.random() * 12,
          delay: Math.random() * -24,
        }
      })
    )
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute bottom-[-10%] opacity-0 animate-float-up"
          style={{
            left: `${particle.left}%`,
            fontSize: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          🎂
        </span>
      ))}
    </div>
  )
}
