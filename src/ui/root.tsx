import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Index from './screens/Index'
import NewPatient from './screens/NewPatient'
import Profile from './screens/Profile'
import Settings from './screens/Settings'

// biome-ignore lint/style/noNonNullAssertion:
createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme="dark">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/new" element={<NewPatient />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  </MantineProvider>
)
