import InteractiveProvider from '../../context/InteractiveProvider'
import AmbientBackground from '../../components/AmbientBackground'
import FloatingCakes from '../../components/FloatingCakes'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <InteractiveProvider>
      <AmbientBackground />
      <FloatingCakes />
      {children}
    </InteractiveProvider>
  )
}
