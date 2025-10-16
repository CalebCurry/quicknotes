import { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import SDK from '../sdk/api'

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    return (
        <div className="p-6 flex flex-col gap-2 max-w-sm mx-auto">
            <h1 className="text-xl font-semibold mb-4">Login</h1>
            <input className="border p-2" placeholder="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
            <input type="password" className="border p-2" placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <button className="btn btn-ok mt-2" onClick={async () => {
                try {
                    await SDK.login({username, password});
                    navigate('/');
                } catch (err){
                    console.log("Login failed", err);
                }
            }}>Login</button>
            <p>Need an account? <Link className="underline text-gray-400 hover:text-gray-600" to="/register">Register</Link></p>
        </div>
    )
}