import axios from 'axios';

const BASE_URL = 'https://todo-hosting-97bg.onrender.com';

// GET all todos
export const getTodos = () => axios.get(BASE_URL);

// CREATE a todo
export const createTodo = (newTodo) => axios.post(BASE_URL, newTodo);

// UPDATE a todo
export const updateTodo = (id, updatedTodo) => axios.put(`${BASE_URL}/${id}`, updatedTodo);

// DELETE a todo
export const deleteTodo = (id) => axios.delete(`${BASE_URL}/${id}`);
