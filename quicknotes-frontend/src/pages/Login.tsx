import { useContext, useState } from 'react'
import {  Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const auth = useContext(AuthContext);

    return (
        <div className="p-6 flex flex-col gap-2 max-w-sm mx-auto">
            <h1 className="text-xl font-semibold mb-4">Login</h1>
            <input className="border p-2" placeholder="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
            <input type="password" className="border p-2" placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <button className="btn btn-ok mt-2" onClick={() => {auth?.login({username, password})}}>Login</button>
            <p>Need an account? <Link className="underline text-gray-400 hover:text-gray-600" to="/register">Register</Link></p>
        </div>
    )
}