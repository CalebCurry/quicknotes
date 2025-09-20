import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SDK from '../sdk/api'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleRegister() {
    try {
      await SDK.register({username, email, password})
      navigate('/login')
    } catch (err) {
      console.log("Registration failed", err)
    }
  }

  return (
    <div className="p-6 flex flex-col gap-2 max-w-sm mx-auto">
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      <input
        className="border p-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-ok mt-2" onClick={handleRegister}>
        Register
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Already have an account?{' '}
        <Link to="/login" className="underline text-gray-400 hover:text-gray-600">
          Login
        </Link>
      </p>
    </div>
  )
}
