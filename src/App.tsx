import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import Tasks from "./pages/Tasks"

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
