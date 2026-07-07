import { useState, useReducer, useEffect, useMemo, useCallback } from "react"
import { taskApi } from "../api/tasks"
import type { ApiTask } from "../api/tasks"

type Action =
  | { type: "SET"; tasks: ApiTask[] }
  | { type: "ADD"; task: ApiTask }
  | { type: "UPDATE"; task: ApiTask }
  | { type: "TOGGLE"; task: ApiTask }
  | { type: "DELETE"; id: string }

function taskReducer(state: ApiTask[], action: Action): ApiTask[] {
  switch (action.type) {
    case "SET":
      return action.tasks
    case "ADD":
      return [action.task, ...state]
    case "UPDATE":
      return state.map((t) => (t.id === action.task.id ? action.task : t))
    case "TOGGLE":
      return state.map((t) => (t.id === action.task.id ? action.task : t))
    case "DELETE":
      return state.filter((t) => t.id !== action.id)
    default:
      return state
  }
}

export type FilterStatus = "all" | "active" | "completed"

export function useTasks() {
  const [tasks, dispatch] = useReducer(taskReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FilterStatus>("all")

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await taskApi.getAll({ search, filter })
      dispatch({ type: "SET", tasks: data })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [search, filter])

  // Fetch tasks when search or filter changes
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const addTask = useCallback(async (title: string, description: string) => {
    try {
      setError(null)
      const task = await taskApi.create(title, description)
      dispatch({ type: "ADD", task })
    } catch (err: any) {
      setError(err.message)
    }
  }, [])

  const updateTask = useCallback(async (id: string, title: string, description: string) => {
    try {
      setError(null)
      const task = await taskApi.update(id, title, description)
      dispatch({ type: "UPDATE", task })
    } catch (err: any) {
      setError(err.message)
    }
  }, [])

  const toggleTask = useCallback(async (id: string) => {
    try {
      setError(null)
      const task = await taskApi.toggle(id)
      dispatch({ type: "TOGGLE", task })
    } catch (err: any) {
      setError(err.message)
    }
  }, [])

  const deleteTask = useCallback(async (id: string) => {
    try {
      setError(null)
      await taskApi.delete(id)
      dispatch({ type: "DELETE", id })
    } catch (err: any) {
      setError(err.message)
    }
  }, [])

  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      pending: tasks.filter((t) => !t.completed).length,
    }),
    [tasks]
  )

  return {
    tasks,
    stats,
    loading,
    error,
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
