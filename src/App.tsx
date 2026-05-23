import { ModeToggle } from '@/components/mode-toggle'
import { Homepage } from '@/pages/homepage/Homepage'

function App() {
  return (
    <>
      <div className="fixed top-3 right-3 z-50 sm:top-4 sm:right-4 md:top-5 md:right-5 lg:top-6 lg:right-6 xl:top-8 xl:right-8">
        <ModeToggle variant="icon" />
      </div>
      <Homepage />
    </>
  )
}

export default App
