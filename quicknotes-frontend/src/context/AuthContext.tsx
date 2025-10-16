import { createContext } from 'react'
import type { User } from '../sdk/api'

type AuthContextType = {
  isAuthenticated: boolean,
  logout: () => void,
  login: (user: User) => void,
  register: (user: User) => void
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined)