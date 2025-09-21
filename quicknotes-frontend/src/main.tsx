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
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/login' element={<Login />} />  
            <Route path='/register' element={<Register />} />  
            <Route path='/' element={<App />}/>
            <Route path='/edit/:id' element={<Edit />}/>
            <Route path='/edit' element={<Edit />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
