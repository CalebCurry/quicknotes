import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Edit from './Edit.tsx'
import {
  BrowserRouter, Routes, Route, 
  //Link
} from 'react-router-dom'
import Layout from './components/Layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<App />}/>
          <Route path='/edit/:id' element={<Edit />}/>
          <Route path='/edit' element={<Edit />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
