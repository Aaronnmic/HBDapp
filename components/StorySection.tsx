"use client"
import content from '../data/content.json'

const { chapter, title, slides } = content.story

export default function StorySection(){
  return (
    <section id="story" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-sm uppercase tracking-[0.4em] text-[#D6488F] mb-4">{chapter}</div>
        <h2 className="text-4xl md:text-5xl font-semibold text-gradient-romance mb-10">{title}</h2>
        <div className="space-y-8">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-card p-8 sm:p-10 shadow-glow transition duration-500 hover:-translate-y-1"
            >
              <div className="mb-4 text-xl font-semibold text-[#6B2247]">{slide.title}</div>
              <p className="text-[#6B2247]/80 leading-8">{slide.description}</p>
              <div className="mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-500 opacity-80" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
