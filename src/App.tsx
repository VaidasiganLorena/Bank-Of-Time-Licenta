import React from 'react'
import { MantineProvider } from '@mantine/core'
import { Login } from './Components/login/Login'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Gill Sans, sans-serif',
        colorScheme: 'light',
        colors: {
          primary: ['#18204a', '#f9d750', '#e5dcca', '#c0cebd'],
          background: ['#eef0eb'],
        },
        headings: {
          fontFamily: 'Gill Sans, sans-serif',
        },
      }}
    >
      <div className="app-light">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </MantineProvider>
  )
}

export default App
