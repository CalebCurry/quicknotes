// src/context/AuthContext.tsx
import { createContext} from "react";

// 👇 Define what our context provides
type AuthContextType = {
  isAuthenticated: boolean;
  logout: () => void;
  login: (username: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
// login: (access: string, refresh: string) => void
};

// 👇 Create the context itself
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

