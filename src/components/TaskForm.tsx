import { useState, useEffect, useRef } from "react"
import type { Task } from "../types"

interface Props {
  onSubmit: (title: string, desc: string) => void
  editingTask: Task | null
  onUpdate: (id: string, title: string, desc: string) => void
  onCancelEdit: () => void
}

export default function TaskForm({ onSubmit, editingTask, onUpdate, onCancelEdit }: Props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      inputRef.current?.focus()
    } else {
      setTitle("")
      setDescription("")
    }
  }, [editingTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    if (editingTask) {
      onUpdate(editingTask.id, title.trim(), description.trim())
    } else {
      onSubmit(title.trim(), description.trim())
    }
    setTitle("")
    setDescription("")
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: "var(--card-bg)", padding: 20,
      borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      marginBottom: 20,
    }}>
      <h3 style={{ marginBottom: 12 }}>
        {editingTask ? "Edit Task" : "Add New Task"}
      </h3>
      <input
        ref={inputRef}
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        style={{ marginBottom: 12, resize: "vertical" }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" style={{
          background: editingTask ? "#52c41a" : "#1677ff",
          color: "#fff",
        }}>
          {editingTask ? "Save Changes" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" onClick={onCancelEdit} style={{
            background: "#d9d9d9", color: "#333",
          }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
