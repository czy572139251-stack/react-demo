import { Outlet, NavLink } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

export default function Layout() {
  const { theme, toggleTheme } = useTheme()

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontWeight: isActive ? 700 : 400,
    borderBottom: isActive ? "2px solid #fff" : "2px solid transparent",
  })

  return (
    <div className="app-layout">
      <nav className="app-nav">
        <span className="app-logo">Task Manager</span>
        <div className="app-nav-links">
          <NavLink to="/" end style={linkStyle}>
            <span style={{ color: "#fff", padding: "4px 0" }}>Home</span>
          </NavLink>
          <NavLink to="/tasks" style={linkStyle}>
            <span style={{ color: "#fff", padding: "4px 0" }}>Tasks</span>
          </NavLink>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "\uD83C\uDF19 Dark" : "\u2600\uFE0F Light"}
        </button>
      </nav>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
