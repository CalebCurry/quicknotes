import { Outlet } from 'react-router-dom'

export default function Layout() {

  return (
    <div>
    <header className="bg-blue-900">
      <nav className="mx-auto max-w-7xl flex items-center justify-between p-6">
        <div>
          <a href="/">
           <svg width="24" height="24"
            fill="none" stroke="white" strokeWidth="1.8">
            <path d="M6 3h7l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
            <path d="M13 3v4a1 1 0 0 0 1 1h4"/>
            <path d="M8 12h8M8 16h8M8 20h6"/>
          </svg>
          </a>
        </div>
    
        <a href="/account" className="font-semibold text-white">
          Log in →
        </a>
        
      </nav>
    </header>
    <Outlet/>
    </div>
  )
}
