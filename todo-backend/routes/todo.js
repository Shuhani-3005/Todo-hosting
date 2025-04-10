const express = require('express');
const router = express.Router();
const { z } = require('zod');

let todos = [];

// Zod Schema
const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

// CREATE
router.post('/', (req, res) => {
  const validation = todoSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }
  const newTodo = { id: Date.now(), ...req.body };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// READ
router.get('/', (req, res) => {
  res.json(todos);
});

// UPDATE
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const validation = todoSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  todos = todos.map(todo => todo.id == id ? { ...todo, ...req.body } : todo);
  res.json({ message: 'Todo updated' });
});

// DELETE
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id != id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;


