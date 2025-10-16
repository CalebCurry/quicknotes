import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import SDK from '../sdk/api'
import type { User } from '../sdk/api'

export function AuthProvider(){
  const navigate = useNavigate();  
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access"));

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    navigate('/login');
  }

  const login = async (user: User) => {
    try {
        const res = await SDK.login(user);
        localStorage.setItem("access", res.access)
        localStorage.setItem("refresh", res.refresh)
        setIsAuthenticated(true);
        navigate('/');
    } catch (err){
        console.log("Login failed", err);
    }
  }

  const register = async (user: User) => {
    try {
        const res = await SDK.register(user);
        localStorage.setItem("access", res.access)
        localStorage.setItem("refresh", res.refresh)
        setIsAuthenticated(true);
        navigate('/');
    } catch (err){
        console.log("registration failed", err);
    }
  }

  return <AuthContext value={{isAuthenticated, logout, login, register}}><Outlet /></AuthContext>
}