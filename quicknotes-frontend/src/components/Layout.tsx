import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Layout() {
    const auth = useContext(AuthContext);
    console.log("authenticated?", auth?.isAuthenticated)

    return (
        <div>
            <header className="bg-blue-900">
                <nav
                    aria-label="Global"
                    className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
                >
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <svg
                                width="24"
                                height="24"
                                fill="none"
                                stroke="white"
                                strokeWidth="1.8"
                            >
                                <path d="M6 3h7l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
                                <path d="M13 3v4a1 1 0 0 0 1 1h4" />
                                <path d="M8 12h8M8 16h8M8 20h6" />
                            </svg>
                        </a>
                    </div>

                    {auth?.isAuthenticated ? 
                      <button className="font-semibold text-white" onClick={auth.logout}>Log out</button> :
                      <a href="/login" className="font-semibold text-white">
                          Log in →
                      </a>
                    }
                </nav>
            </header>
            <Outlet />
        </div>
    );
}
