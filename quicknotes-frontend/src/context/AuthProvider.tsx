
// src/context/AuthContext.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import SDK from '../sdk/api'
// AuthContext.tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access")
  );

    const login = async (username: string, password: string) => {
        try {
            const res = await SDK.login({ username, password });
            if (res.access && res.refresh) {
            localStorage.setItem("access", res.access);
            localStorage.setItem("refresh", res.refresh);
            setIsAuthenticated(true);
            navigate("/");
            }
        } catch (err) {
            console.error("Login failed", err);
            throw err;
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            const res = await SDK.register({ username, email, password });
            if (res.access && res.refresh) {
                localStorage.setItem("access", res.access);
                localStorage.setItem("refresh", res.refresh);
                setIsAuthenticated(true);
                navigate("/");
            }
        } catch (err) {
            console.error("Register failed", err);
            throw err;
        }
    };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext>
  );
}
