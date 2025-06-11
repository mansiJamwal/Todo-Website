// Todo.js
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Todo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [])

    async function addTodo() {
        if (!title.trim()) return;
        
        try {
            const response = await fetch("https://todo-website-dm1i.onrender.com/todo", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, description })
            });
            const data = await response.json();
            console.log(data);
            setTitle('');
            setDescription('');
            setTodos([...todos, data.todo]);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const fetchTodos = async () => {
            const responseTodos = await fetch("https://todo-website-dm1i.onrender.com/todo", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const todoData = await responseTodos.json();
            setTodos(todoData.todos);
        }
        fetchTodos();
    }, []);

    function deleteaccount() {
        navigate('/deleteaccount');
    }

    function logout() {
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <div className="bg-gray-800 shadow-lg">
                <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">My Todos</h1>
                    <div className="space-x-3">
                        <button
                            onClick={logout}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200"
                        >
                            Logout
                        </button>
                        <button
                            onClick={deleteaccount}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Add Todo Form */}
                <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={title}
                            placeholder="Todo title"
                            className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            value={description}
                            placeholder="Description (optional)"
                            className="w-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button
                            onClick={addTodo}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Add Todo
                        </button>
                    </div>
                </div>

                {/* Todos List */}
                <div className="space-y-4">
                    {todos.length === 0 ? (
                        <div className="text-center py-12 text-gray-400">
                            <p className="text-lg">No todos yet!</p>
                            <p>Add your first todo above to get started.</p>
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <TodoItem key={todo._id} todo={todo} todos={todos} setTodos={setTodos} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

function TodoItem({ todo, todos, setTodos }) {
    async function deletetodo() {
        try {
            const response = await fetch(`https://todo-website-dm1i.onrender.com/todo/${todo._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json();
            console.log(data);
            setTodos(todos.filter(t => t._id !== todo._id));
        } catch (e) {
            console.log(e);
        }
    }

    async function markasDone() {
        try {
            const response = await fetch(`https://todo-website-dm1i.onrender.com/todo/${todo._id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: !todo.completed })
            })
            const data = await response.json();
            console.log(data);
            setTodos(todos.map(t =>
                t._id === todo._id ? { ...t, completed: !t.completed } : t
            ));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={`bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-200 ${todo.completed ? 'opacity-75' : ''}`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={markasDone}
                            className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                            {todo.title}
                        </h3>
                    </div>
                    {todo.description && (
                        <p className={`ml-8 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                            {todo.description}
                        </p>
                    )}
                </div>
                <button
                    onClick={deletetodo}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 ml-4"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Todo;