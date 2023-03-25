import React from 'react'
import { MantineProvider } from '@mantine/core'
import { Login } from './Components/login/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/register/Register'
import Intro from './Components/intro/Intro'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Homepage from './Components/homepage/Homepage'
import PersonalData from './Components/personalData/PersonalData'
import Account from './Components/account/Account'
import { Activites } from './Components/activites/Activites'
import HomepageAdmin from './ComponentsAdmin/HomepageAdmin.tsx/HomepageAdmin'
import PageGainers from './ComponentsAdmin/HomepageAdmin.tsx/pageGainers/PageGainers'

const queryClient = new QueryClient()
function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Gill Sans, sans-serif',
        colorScheme: 'light',
        colors: {
          primary: ['#28886f', '#e5dcca', '#154639'],
          background: ['#ffffff'],
        },
        headings: {
          fontFamily: 'Gill Sans, sans-serif',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <div className="app-light">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/personal-data" element={<PersonalData />} />
            <Route path="/activites" element={<Activites />} />
            <Route path="/account" element={<Account />} />
            <Route path="/homepage-admin" element={<HomepageAdmin />} />
            <Route path="/gainers" element={<PageGainers />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default App
