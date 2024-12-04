import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Index from './screens/Index'
import NewPatient from './screens/NewPatient'

createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme="dark">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/new" element={<NewPatient />} />
      </Routes>
    </BrowserRouter>
  </MantineProvider>
)
