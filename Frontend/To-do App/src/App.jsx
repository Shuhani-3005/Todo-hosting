import { useEffect, useState } from 'react';
import './App.css';
import { getTodos, createTodo, deleteTodo } from './api/todoApi';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    getTodos()
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTask = () => {
    if (task.trim() !== '') {
      createTodo(task)
        .then(() => {
          fetchTodos();
          setTask('');
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteTask = (id) => {
    deleteTodo(id)
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {todos.map((item) => (
          <li key={item._id}>
            {item.task}
            <button onClick={() => deleteTask(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
