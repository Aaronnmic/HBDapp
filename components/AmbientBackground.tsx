export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#034694]">
      <div className="absolute -top-[10%] left-[-15%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,_rgba(93,173,226,0.65),_transparent_70%)] blur-2xl animate-drift-slow" />

      <div className="absolute top-[5%] right-[-20%] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,_rgba(0,39,93,0.7),_transparent_70%)] blur-2xl animate-drift-slower" />

      <div className="absolute bottom-[-20%] left-[10%] h-[65vh] w-[65vh] rounded-full bg-[radial-gradient(circle,_rgba(30,115,190,0.55),_transparent_70%)] blur-2xl animate-drift-slow" />

      <div className="absolute bottom-[10%] right-[5%] h-[55vh] w-[55vh] rounded-full bg-[radial-gradient(circle,_rgba(219,161,17,0.25),_transparent_70%)] blur-2xl animate-drift-slower" />
    
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(3,70,148,0.15)_0%,_rgba(3,70,148,0.05)_35%,_rgba(0,39,93,0.35)_100%)]" />
    </div>
  )
}