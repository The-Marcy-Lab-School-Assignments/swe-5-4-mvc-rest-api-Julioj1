const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

////////////////////////
// Middleware
////////////////////////
app.use(express.json());

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.get('/api/todos', (req, res) => {
  return res.status(200).send(todos)
});

app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  if(!id) res.status(404).send({ error: `No todo found with id: ${id}` });

  res.status(200).send(todos.find(todo => todo.id === Number(id)));
});

app.post('/api/todos', (req, res) => {
  const { task } = req.body;

  if(!task) res.status(400).send({ error: 'Task is missing!' });

  const newTask = { id: getId(), task, isDone: false };
  todos.push(newTask);
  res.status(201).send(newTask);
});

app.patch('/api/todos/:id', (req, res) => {
  const { isDone } = req.body;
  const { id } = req.params;

  const todo = todos.find(todo => todo.id === Number(id));

  if(!todo) res.status(404).send({ error: `No todo found with id: ${id}` })

  todo.isDone = isDone;
  res.status(200).send(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex(todo => todo.id === Number(id));

  if(todoIndex < 0) res.status(404).send({ error: `No todo found with id: ${id}` });

  todos.splice(todoIndex, 1);
  res.sendStatus(204);
});

const server404 = (req, res) => {
  res.status(404).send({ message: `Not found: ${req.originalUrl}` });
}

app.use(server404);

app.use(logRoutes);
app.use(express.static(pathToFrontend));

////////////////////////
// In-Memory Database
////////////////////////


// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

////////////////////////
// Endpoints
////////////////////////

// TODO: GET /api/todos
// Response: 200, array of all todos


// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id


// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body


// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id


// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id


// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)


const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
