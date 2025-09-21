import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SDK from '../sdk/api'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  async function handleLogin() {
    try {
        await SDK.login({ username, password });
        auth?.setIsAuthenticated(true);
        navigate('/');
    }
     catch (err) {
      console.log("Login failed", err)
    }
  }

  return (
    <div className="p-6 flex flex-col gap-2 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <input
        className="border p-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-ok mt-2" onClick={handleLogin}>
        Login
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Don’t have an account?{' '}
        <Link to="/register" className="underline text-gray-400 hover:text-gray-600">
          Register
        </Link>
      </p>
    </div>
  )
}
