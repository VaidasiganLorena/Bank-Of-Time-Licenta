import React from 'react'
import { MantineProvider } from '@mantine/core'
import { Login } from './Components/login/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/register/Register'
import Intro from './Components/intro/Intro'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Homepage from './Components/homepage/Homepage'
import PersonalData from './Components/personalData/PersonalData'
import { Activites } from './Components/activites/Activites'
import HomepageAdmin from './ComponentsAdmin/HomepageAdmin/HomepageAdmin'
import PageGainers from './ComponentsAdmin/pageGainers/PageGainers'
import PersonalDataAdmin from './ComponentsAdmin/personalDataAdmin/PersonalData'
import Appointments from './ComponentsAdmin/pageAppointments/Appointments'
import GainerAllAppointments from './ComponentsAdmin/pageGainerAllAppointments/pageGainerAllAppointments'
import { MyActivity } from './Components/myActivity/MyActivity'

const queryClient = new QueryClient()
function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Gill Sans, sans-serif',
        colors: {
          brand: [
            '#c1d2ad', //light
            '#8dae6b', //hover light
            '#f8f2ee', //background light
            '#c8c7a9', //green lighter
            '#9ab091', //green light
            '#28886f', //normal
            '#1c6350', //hover normal
            '#689983', //primary green
            '#044e3a', //green dark
            '#212529', //dark write
          ],
        },
        primaryColor: 'brand',
        primaryShade: 5,
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
            <Route path="/my-activity" element={<MyActivity />} />
            <Route path="/homepage-admin" element={<HomepageAdmin />} />
            <Route path="/gainers" element={<PageGainers />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/personal-data-admin" element={<PersonalDataAdmin />} />
            <Route path="/gainer-appointments/:gainerUuid" element={<GainerAllAppointments />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default App
