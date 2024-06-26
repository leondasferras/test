import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import '@gravity-ui/uikit/styles/styles.scss'
import { ThemeProvider } from '@gravity-ui/uikit'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme='dark'>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
