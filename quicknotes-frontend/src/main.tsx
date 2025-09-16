import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Edit from './Edit.tsx'
import {
  BrowserRouter, Routes, Route, 
  //Link
} from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/edit/:id' element={<Edit />}/>
        <Route path='/edit' element={<Edit />}/>
      </Routes>
    </div>
    </BrowserRouter>
  </StrictMode>,
)
