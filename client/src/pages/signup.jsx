import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/todo');
        }
    }, [])

    async function addUser() {
        try {
            setError('');
            const response = await fetch("http://localhost:3000/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                localStorage.setItem('token', data.token);
                setUsername("");
                setPassword("");
                navigate("/todo");
            } else {
                setError("Username already taken");
            }
        } catch (e) {
            setError("An error occurred. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white">Create Account</h2>
                    <p className="text-gray-400 mt-2">Join us to start organizing your tasks</p>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    {error && (
                        <div className="text-red-400 text-sm text-center">{error}</div>
                    )}
                    
                    <button
                        onClick={addUser}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        Create Account
                    </button>
                    
                    <div className="text-center">
                        <span className="text-gray-400">Already have an account? </span>
                        <a href="/signin" className="text-blue-400 hover:text-blue-300">Sign in</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;