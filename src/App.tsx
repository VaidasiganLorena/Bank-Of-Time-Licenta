import React from 'react'
import { MantineProvider } from '@mantine/core'
import { Login } from './Components/login/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/register/Register'
import Homepage from './Components/homepage/Homepage'

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Gill Sans, sans-serif',
        colorScheme: 'light',
        colors: {
          primary: ['#18204a', '##28886f', '#e5dcca', '##154639'],
          background: ['#ffffff'],
        },
        headings: {
          fontFamily: 'Gill Sans, sans-serif',
        },
      }}
    >
      <div className="app-light">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<Homepage />}></Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </MantineProvider>
  )
}

export default App
