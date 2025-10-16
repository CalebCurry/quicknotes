import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Edit from './pages/Edit.tsx'
import {
  BrowserRouter, Routes, Route, 
  //Link
} from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route path='/' element={<App />}/>
          <Route path='/edit/:id' element={<Edit />}/>
          <Route path='/edit' element={<Edit />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
