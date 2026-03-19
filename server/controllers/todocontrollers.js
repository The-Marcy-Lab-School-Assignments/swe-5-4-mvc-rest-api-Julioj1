const todoModel = require('../models/todoModel.js');

const listTodos = (req, res) => {
  const todos = todoModel.list();
  return res.status(200).send(todos);
};

const findTodo = (req, res) => {
  const { id } = req.params;
  const todo = todoModel.find(Number(id));

  if (!todo) return res.status(404).send({ error: `No todo found with id: ${id}` });

  return res.status(200).send(todo);
};

const createTodo = (req, res) => {
  const { task } = req.body;

  if (!task) return res.status(400).send({ error: 'Task is missing!' });

  const newTodo = todoModel.create(task);
  return res.status(201).send(newTodo);
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;
  const updatedTodo = todoModel.update(Number(id), { isDone });

  if (!updatedTodo) return res.status(404).send({ error: `No todo found with id: ${id}` });

  return res.status(200).send(updatedTodo);
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  const deleted = todoModel.destroy(Number(id));

  if (!deleted) return res.status(404).send({ error: `No todo found with id: ${id}` });

  return res.sendStatus(204);
};

module.exports = { listTodos, findTodo, createTodo, updateTodo, deleteTodo };