import { ModeToggle } from '@/components/mode-toggle'
import { Homepage } from '@/pages/homepage/Homepage'

function App() {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle variant="icon" />
      </div>
      <Homepage />
    </>
  )
}

export default App
