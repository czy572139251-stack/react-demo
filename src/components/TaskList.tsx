import type { Task } from "../types"

interface Props {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: Props) {
  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: 48, color: "#999", background: "#fff", borderRadius: 8 }}>
        <p style={{ fontSize: 16 }}>No tasks yet. Add one!</p>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {tasks.map((task) => (
        <div key={task.id} style={{
          display: "flex", alignItems: "flex-start", gap: 12,
          background: "#fff", padding: 16, borderRadius: 8,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          opacity: task.completed ? 0.6 : 1,
        }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            style={{ width: 18, height: 18, marginTop: 2, cursor: "pointer" }}
          />
          <div style={{ flex: 1 }}>
            <h4 style={{
              fontSize: 16,
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "#999" : "#333",
              marginBottom: 4,
            }}>
              {task.title}
            </h4>
            {task.description && (
              <p style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>{task.description}</p>
            )}
            <span style={{ fontSize: 11, color: "#bbb" }}>{task.createdAt}</span>
          </div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button onClick={() => onEdit(task)} style={{ background: "#e6f4ff", color: "#1677ff", padding: "4px 10px", fontSize: 12 }}>
              Edit
            </button>
            <button onClick={() => onDelete(task.id)} style={{ background: "#fff2f0", color: "#ff4d4f", padding: "4px 10px", fontSize: 12 }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
