export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-white flex items-center justify-center px-6">
      <div className="max-w-xl rounded-[2rem] border border-white/10 bg-card p-10 text-center shadow-glow">
        <p className="text-sm uppercase tracking-[0.4em] text-[#8CC8FF] mb-4">Page not found</p>
        <h1 className="text-4xl font-semibold mb-4 text-[#034694]">This chapter is missing.</h1>
        <p className="text-[#D6ECFF] leading-8">The story still continues—head back to the home screen and start from the beginning.</p>
      </div>
    </div>
  )
}
