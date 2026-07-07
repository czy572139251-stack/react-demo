const express = require("express")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// In-memory task storage
let tasks = [
  {
    id: "1",
    title: "Learn React",
    description: "Study hooks, context, and routing",
    completed: false,
    createdAt: new Date().toLocaleString(),
  },
  {
    id: "2",
    title: "Build a project",
    description: "Create a full-stack app with Express",
    completed: false,
    createdAt: new Date().toLocaleString(),
  },
]

// GET /api/tasks
app.get("/api/tasks", (req, res) => {
  const { search, filter } = req.query
  let result = [...tasks]

  if (filter === "active") result = result.filter((t) => !t.completed)
  if (filter === "completed") result = result.filter((t) => t.completed)

  if (search) {
    const q = search.toLowerCase()
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
    )
  }

  res.json({ success: true, data: result })
})

// GET /api/tasks/:id
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id)
  if (!task) return res.status(404).json({ success: false, message: "Task not found" })
  res.json({ success: true, data: task })
})

// POST /api/tasks
app.post("/api/tasks", (req, res) => {
  const { title, description } = req.body
  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, message: "Title is required" })
  }
  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    description: (description || "").trim(),
    completed: false,
    createdAt: new Date().toLocaleString(),
  }
  tasks.unshift(newTask)
  res.status(201).json({ success: true, data: newTask })
})

// PUT /api/tasks/:id
app.put("/api/tasks/:id", (req, res) => {
  const { title, description } = req.body
  const index = tasks.findIndex((t) => t.id === req.params.id)
  if (index === -1) return res.status(404).json({ success: false, message: "Task not found" })

  tasks[index] = {
    ...tasks[index],
    title: title !== undefined ? title.trim() : tasks[index].title,
    description: description !== undefined ? (description || "").trim() : tasks[index].description,
  }
  res.json({ success: true, data: tasks[index] })
})

// PATCH /api/tasks/:id/toggle
app.patch("/api/tasks/:id/toggle", (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id)
  if (!task) return res.status(404).json({ success: false, message: "Task not found" })
  task.completed = !task.completed
  res.json({ success: true, data: task })
})

// DELETE /api/tasks/:id
app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id)
  if (index === -1) return res.status(404).json({ success: false, message: "Task not found" })
  tasks.splice(index, 1)
  res.json({ success: true, message: "Deleted" })
})

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT)
})
