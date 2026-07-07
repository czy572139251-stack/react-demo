import { useState } from "react"
import type { Task } from "../types"
import { useTasks } from "../hooks/useTasks"
import type { FilterStatus } from "../hooks/useTasks"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"

export default function Tasks() {
  const {
    tasks, stats, search, setSearch,
    filter, setFilter,
    addTask, updateTask, toggleTask, deleteTask,
  } = useTasks()

  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filters: { label: string; value: FilterStatus }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ]

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, marginBottom: 8 }}>Task Manager</h2>
        <div style={{ display: "flex", gap: 16, fontSize: 14, color: "#666" }}>
          <span>Total: <strong>{stats.total}</strong></span>
          <span>Done: <strong style={{ color: "#52c41a" }}>{stats.completed}</strong></span>
          <span>Pending: <strong style={{ color: "#faad14" }}>{stats.pending}</strong></span>
        </div>
      </div>

      {/* Search + Filter bar */}
      <div style={{
        display: "flex", gap: 12, marginBottom: 16,
        alignItems: "center", flexWrap: "wrap",
      }}>
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 240 }}
        />
        <div style={{ display: "flex", gap: 4 }}>
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                background: filter === f.value ? "#1677ff" : "#f0f0f0",
                color: filter === f.value ? "#fff" : "#333",
                padding: "6px 14px",
                fontSize: 13,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <TaskForm
        onSubmit={addTask}
        editingTask={editingTask}
        onUpdate={updateTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={setEditingTask}
      />
    </div>
  )
}
