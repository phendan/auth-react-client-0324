import { FormEvent, useEffect, useState } from 'react';
import http from '../utilities/http';

import './App.css';

type UserData = {
    created_at: string;
    email: string;
    id: number;
    updated_at: string;
    username: string;
};

function App() {
    const [page, setPage] = useState('register');
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await http.get('/api/user');
                setUserData(response.data);
            } catch {
                console.log('not authenticated');
            }
        };

        getUser();
    }, []);

    const logout = async () => {
        try {
            await http.get('/api/logout');
            setUserData(null);
            setPage('login');
        } catch {
            //
        }
    };

    return (
        <div>
            <nav>
                <ul>
                    {userData === null ? (
                        <>
                            <li>
                                <a
                                    href="#"
                                    onClick={event => {
                                        event.preventDefault();
                                        setPage('login');
                                    }}
                                >
                                    Login
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={event => {
                                        event.preventDefault();
                                        setPage('register');
                                    }}
                                >
                                    Register
                                </a>
                            </li>
                        </>
                    ) : (
                        <li>
                            <a
                                href="#"
                                onClick={event => {
                                    event.preventDefault();
                                    logout();
                                }}
                            >
                                Logout
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
            {userData === null ? (
                page === 'register' ? (
                    <RegisterPage />
                ) : (
                    <LoginPage setUserData={setUserData} />
                )
            ) : (
                <ProfilePage userData={userData} />
            )}
        </div>
    );
}

function ProfilePage(props: { userData: UserData }) {
    return (
        <div>
            <h1>Profile Page</h1>
            {JSON.stringify(props.userData)}
        </div>
    );
}

function LoginPage(props: {
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await http.get('/sanctum/csrf-cookie');
            const response = await http.post('/api/login', {
                password,
                email
            });

            props.setUserData(response.data);
        } catch {
            //
        }
    };

    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <input type="submit" value="Register" />
            </form>
        </>
    );
}

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        return () => console.log('register component is about to unmount');
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await http.get('/sanctum/csrf-cookie');
            const response = await http.post('/api/register', {
                username,
                password,
                email
            });
        } catch {
            //
        }
    };

    return (
        <>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={event => {
                            setUsername(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <input type="submit" value="Register" />
            </form>
        </>
    );
}

export default App;
