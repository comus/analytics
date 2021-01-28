const express = require('express')
const _ = require('lodash')
const fetch = require('node-fetch')

const app = express()
const port = 3000

app.use(express.json())

let i = 0
const todos = []

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/todos', (req, res) => {
  res.json({
    data: todos
  })
})

app.post('/api/todos', (req, res) => {
  i++

  const todo = {
    id: i,
    ...req.body
  }

  todos.push(todo)

  res.json({
    data: todo
  })
})

app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params

  const index = _.findIndex(todos, { id: parseInt(id, 10) })
  const todo = todos[index]
  if (!todo) {
    return res.json({ error: 'not found doc' })
  }

  res.json({
    data: todo
  })
})

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params
  const { body } = req

  const index = _.findIndex(todos, { id: parseInt(id, 10) })
  const todo = todos[index]
  if (!todo) {
    return res.json({ error: 'not found doc' })
  }

  let newTodo = {
    ...todo,
    ..._.omit(body, ['id'])
  }

  newTodo = _.omitBy(newTodo, _.isNull)
  newTodo = _.omitBy(newTodo, _.isUndefined)

  todos.splice(index, 1, newTodo)

  res.json({
    data: newTodo
  })
})

app.delete('/api/todos/:id', function (req, res) {
  const { id } = req.params

  const index = _.findIndex(todos, { id: parseInt(id, 10) })
  const todo = todos[index]
  if (!todo) {
    return res.json({ error: 'not found doc' })
  }

  todos.splice(index, 1)

  res.json({
    data: todo
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// migration
setTimeout(async () => {
  for (let j = 0; j < 10; j++) {
    await fetch(`http://localhost:${port}/api/todos`, {
      method: 'post',
      body: JSON.stringify({
        name: `todo-${j + 1}`,
        isCompleted: false
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(json => console.log(json))
  }

  await fetch(`http://localhost:${port}/api/todos`)
    .then(res => res.json())
    .then(json => console.log(json))
}, 1000)
