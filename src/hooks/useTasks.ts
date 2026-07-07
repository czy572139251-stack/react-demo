import { useState, useReducer, useEffect, useMemo, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import type { Task } from "../types"

const STORAGE_KEY = "react-demo-tasks"

type Action =
  | { type: "ADD"; title: string; description: string }
  | { type: "UPDATE"; id: string; title: string; description: string }
  | { type: "TOGGLE"; id: string }
  | { type: "DELETE"; id: string }
  | { type: "LOAD"; tasks: Task[] }

function taskReducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD": {
      const newTask: Task = {
        id: uuidv4(),
        title: action.title,
        description: action.description,
        completed: false,
        createdAt: new Date().toLocaleString(),
      }
      return [newTask, ...state]
    }
    case "UPDATE":
      return state.map((t) =>
        t.id === action.id
          ? { ...t, title: action.title, description: action.description }
          : t
      )
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      )
    case "DELETE":
      return state.filter((t) => t.id !== action.id)
    case "LOAD":
      return action.tasks
    default:
      return state
  }
}

function loadTasks(): Task[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export type FilterStatus = "all" | "active" | "completed"

export function useTasks() {
  const [tasks, dispatch] = useReducer(taskReducer, [], loadTasks)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FilterStatus>("all")

  const addTask = useCallback((title: string, description: string) => {
    dispatch({ type: "ADD", title, description })
  }, [])

  const updateTask = useCallback((id: string, title: string, description: string) => {
    dispatch({ type: "UPDATE", id, title, description })
  }, [])

  const toggleTask = useCallback((id: string) => {
    dispatch({ type: "TOGGLE", id })
  }, [])

  const deleteTask = useCallback((id: string) => {
    dispatch({ type: "DELETE", id })
  }, [])

  const filteredTasks = useMemo(() => {
    let result = tasks
    if (filter === "active") result = result.filter((t) => !t.completed)
    if (filter === "completed") result = result.filter((t) => t.completed)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
    }
    return result
  }, [tasks, filter, search])

  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
    }),
    [tasks]
  )

  return {
    tasks: filteredTasks,
    stats,
    search,
    setSearch,
    filter,
    setFilter,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
  }
}
