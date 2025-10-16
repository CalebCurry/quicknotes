import { useContext, useState } from 'react'
import { Link} from 'react-router-dom' 
import { AuthContext } from '../context/AuthContext';

export default function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useContext(AuthContext);

    return (
        <div className="p-6 flex flex-col gap-2 max-w-sm mx-auto">
            <h1 className="text-xl font-semibold mb-4">Register</h1>
            <input className="border p-2" placeholder="username" value={username} onChange={(e) => {setUsername(e.target.value)}} />
            <input className="border p-2" placeholder="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
            <input type="password" className="border p-2" placeholder="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <button className="btn btn-ok mt-2" onClick={() => {auth?.register({username, email, password})}}>Register</button>
            <p>Already have an account? <Link className="underline text-gray-400 hover:text-gray-600" to="/login">Login</Link></p>
        </div>
    )
}