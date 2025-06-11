 import { useNavigate } from "react-router-dom";
 import { useEffect } from "react";

function Landing() {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/todo');
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">Todo App</h1>
                    <p className="text-gray-400">Organize your tasks efficiently</p>
                </div>
                <div className="space-y-4">
                    <a href="/signup" className="block">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                            Sign Up to get started
                        </button>
                    </a>
                    <a href="/signin" className="block">
                        <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105">
                            Sign in to existing account
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Landing;