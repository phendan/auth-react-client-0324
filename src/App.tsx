import { FormEvent, useState } from 'react';
import http from '../utilities/http';

import './App.css';

function App() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    );
}

export default App;
