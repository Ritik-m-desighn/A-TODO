"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Trash2, Edit, Save, Loader2, ListTodo } from 'lucide-react'; 

export default function TodosPage() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true); 
  const [editingId, setEditingId] = useState(null); 
  const [editingTitle, setEditingTitle] = useState(""); 

  const fetchTodos = async () => {
    setLoading(true); 
    try {
      const res = await fetch("http://localhost:5000/api/todos/");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      toast.error("Failed to fetch tasks. Server might be down.");
    } finally {
      setLoading(false); 
    }
  };

  const addTodo = async () => {
    if (!title.trim()) return toast.error("Task title cannot be empty!");
    try {
      const res = await fetch("http://localhost:5000/api/todos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setTitle("");
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task.");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" });
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.info("Task deleted!");
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditingTitle(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const saveEdit = async (id) => {
    if (!editingTitle.trim()) return toast.error("Task title cannot be empty!");
    
    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editingTitle }),
      });
      const updatedTodo = await res.json();
      
      setTodos(todos.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
      
      setEditingId(null);
      setEditingTitle("");
      toast.success("Task updated!");
    } catch (error) {
      toast.error("Failed to update task.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center p-10 bg-gray-800 rounded-xl w-full max-w-md shadow-2xl">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
      <p className="text-xl font-medium text-gray-400">Fetching your tasks...</p>
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center p-10 bg-gray-800 rounded-xl w-full max-w-md shadow-2xl border-2 border-gray-700">
      <ListTodo className="w-12 h-12 text-blue-500 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">You're all caught up!</h2>
      <p className="text-gray-400 text-center">Start by adding a new task above to manage your day efficiently.</p>
    </div>
  );


  return (
    <div 
      className="min-h-screen text-white flex flex-col items-center p-6"
            style={{
        backgroundImage: 'url("https://preview.redd.it/could-someone-add-this-to-wallpaper-engine-with-some-leaves-v0-pp6uwp3onzpc1.jpeg?auto=webp&s=3fd4c3eb924be7ae862afee755aa0cf36f9b682b")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ToastContainer position="top-right" autoClose={2000} />
      
      <header className="mb-8 p-4 bg-gray-800 rounded-xl shadow-2xl relative z-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-500">
              My Ultimate Task Manager
          </h1>
      </header>

      <div className="flex gap-2 mb-8 w-full max-w-md relative z-10">
        <input
          className="flex-grow p-3 rounded-lg border-2 border-gray-700 bg-gray-800 focus:border-blue-500 focus:outline-none placeholder-gray-400 text-white transition duration-300 shadow-inner"
          type="text"
          value={title}
          placeholder="What needs to be done?"
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
        >
          Add Task
        </button>
      </div>

      <div className="w-full max-w-md relative z-10">
        {loading ? (
          <LoadingState />
        ) : todos.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="space-y-4 p-4 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 bg-opacity-90">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-l-4 border-blue-500 bg-opacity-95"
              >
                {editingId === todo._id ? (
                  <div className="flex-grow flex gap-2 w-full">
                    <input
                      className="flex-grow p-2 rounded border-2 border-blue-500 bg-gray-600 text-white focus:outline-none"
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(todo._id);
                          if (e.key === 'Escape') cancelEdit();
                      }}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={() => saveEdit(todo._id)}
                            className="text-green-400 hover:text-green-300 p-1 rounded transition duration-200"
                            title="Save"
                        >
                            <Save className="w-5 h-5" />
                        </button>
                        <button
                            onClick={cancelEdit}
                            className="text-gray-400 hover:text-gray-300 p-1 rounded transition duration-200"
                            title="Cancel"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="text-lg text-gray-200 break-words pr-4 max-w-full cursor-pointer transition hover:text-white">
                      {todo.title}
                    </span>
                    <div className="flex gap-3 mt-2 sm:mt-0">
                      <button
                        onClick={() => startEdit(todo)}
                        className="text-yellow-400 hover:text-yellow-300 transition duration-200 p-1 rounded"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="text-red-500 hover:text-red-400 transition duration-200 p-1 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}