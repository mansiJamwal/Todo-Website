import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const navigate = useNavigate();

    async function deleteUser() {
        if (confirmation !== 'DELETE') {
            setError('Please type "DELETE" to confirm');
            return;
        }

        try {
            setError('');
            const response = await fetch("http://localhost:3000/deleteaccount", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ username, password })
            })
            
            if (response.ok) {
                localStorage.removeItem('token');
                navigate('/');
            } else {
                setError("Invalid credentials or user not found");
            }
        } catch (e) {
            setError("An error occurred. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-red-400">Delete Account</h2>
                    <p className="text-gray-400 mt-2">This action cannot be undone</p>
                </div>
                
                <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-6">
                    <p className="text-red-200 text-sm">
                        ⚠️ Warning: Deleting your account will permanently remove all your todos and data.
                    </p>
                </div>
                
                <div className="space-y-6">
                    <div>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-300 text-sm mb-2">
                            Type "DELETE" to confirm:
                        </label>
                        <input
                            type="text"
                            value={confirmation}
                            placeholder="DELETE"
                            className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            onChange={(e) => setConfirmation(e.target.value)}
                        />
                    </div>
                    
                    {error && (
                        <div className="text-red-400 text-sm text-center">{error}</div>
                    )}
                    
                    <button
                        onClick={deleteUser}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out"
                    >
                        Delete Account Permanently
                    </button>
                    
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/todo')}
                            className="text-gray-400 hover:text-gray-300 underline"
                        >
                            Cancel and go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount;