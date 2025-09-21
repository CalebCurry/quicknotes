
// src/context/AuthContext.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

// AuthContext.tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access")
  );


  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext>
  );
}
