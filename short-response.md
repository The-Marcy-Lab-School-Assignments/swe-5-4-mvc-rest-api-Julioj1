# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:

URLs represent resources, not actions.

This communicates to a developer:

- `/api/todos` represents the collection of todo items.

- `/api/todos/:id` represents a single todo resource.

A **RESTful** API uses **HTTP** methods to describe the type of operation being performed on a resource.
GET `/api/todos`
POST `/api/todos`
PATCH `/api/todos/:id`
DELETE `/api/todos/:id`

Each method communicates a specific intention:

1. GET → Retrieve data

2. POST → Create a new resource

3. PATCH → Update part of an existing resource

4. DELETE → Remove a resource

What this communicates to a developer is that the action being performed is clear without needing special endpoint names.

**RESTful** APIs return standard **HTTP** status codes to indicate the result of a request.

For example:

- **200** Good
- **201** Created
- **404** Not Found
- **400** Bad Request
- **500** Internal Server Error

This communicates to the developer that the status codes tell the client exactly what happened.

**200 Good** → The request succeeded and data is returned

**201 Created** → A new todo was successfully created

**404 Not Found** → The requested todo does not exist

**400 Bad Request** → The client sent invalid data

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:

When data logic and request/response logic are mixed in the same file, the code becomes tightly coupled and harder to manage as the application grows.
The problem with mixing them

In a single file, you might see something like:

- Handling the HTTP request

- Validating input

- Querying the database

- Formatting the response

- Error handling

all in the same place.

Consecuensos:

1. The code becomes harder to read and understand

2. Reusing data logic becomes difficult.

3. Testing becomes harder

4. Maintaining and scaling the codebase becomes harder

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

1. Extract the from the route parameter

2. Extract the updated field from the request body

3. Call the model function

4. Model updates the database

5. Controller sends the response

6. Frontend updates the UI

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task)
    return res.status(400).send({ message: "task is required" });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

1. Belongs in: Controller

This line reads data from the HTTP request (`req.body`). Only the controller should deal with request objects because it is responsible for handling client input before passing the data to the model.

2. Belongs in: Controller

This is input validation and HTTP response handling. The controller checks whether the client sent valid data and sends a proper HTTP response (400 Bad Request) if something is wrong.

3. Belongs in: Model

This line is creating a data entity. Generating IDs and defining the structure of a todo item is part of the data layer.

The model should be responsible for:

- Creating records

- Defining data structure

4. Belongs in: Model

This line modifies the application's data store (in this case, an in-memory array). Any operation that:

- Writes data

- Updates data

5. Belongs in: Controller

This is part of the HTTP response lifecycle. The controller decides:

- The status code (201 Created)

- What data to return to the client
