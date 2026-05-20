import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RootProvider } from 'fumadocs-ui/provider/base'
import { FumadocsFrameworkProvider } from '@/components/fumadocs-framework'
import { applyTheme, getTheme } from '@/lib/theme'
import App from '@/App'
import './index.css'

applyTheme(getTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FumadocsFrameworkProvider>
      <RootProvider theme={{ enabled: false }} search={{ enabled: false }}>
        <App />
      </RootProvider>
    </FumadocsFrameworkProvider>
  </StrictMode>,
)
