import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div style={{ textAlign: "center", paddingTop: 60 }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Welcome to React Demo</h1>
      <p style={{ color: "#666", marginBottom: 32, fontSize: 16 }}>
        A task manager built with React + TypeScript + React Router
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <div style={{ background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", width: 200 }}>
          <h3 style={{ marginBottom: 8 }}>&#9881; React 18</h3>
          <p style={{ fontSize: 13, color: "#666" }}>Hooks + TypeScript</p>
        </div>
        <div style={{ background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", width: 200 }}>
          <h3 style={{ marginBottom: 8 }}>&#127759; React Router</h3>
          <p style={{ fontSize: 13, color: "#666" }}>Navigation + Routing</p>
        </div>
        <div style={{ background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", width: 200 }}>
          <h3 style={{ marginBottom: 8 }}>&#128203; CRUD</h3>
          <p style={{ fontSize: 13, color: "#666" }}>Create / Edit / Delete tasks</p>
        </div>
      </div>
      <Link to="/tasks">
        <button style={{ marginTop: 32, background: "#1677ff", color: "#fff", fontSize: 16, padding: "12px 32px" }}>
          Get Started &rarr;
        </button>
      </Link>
    </div>
  )
}
