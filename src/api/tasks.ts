const API_BASE = "/api"

export interface ApiTask {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
}

interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Network error" }))
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  const json: ApiResponse<T> = await res.json()
  if (!json.success) throw new Error(json.message || "Request failed")
  return json.data
}

export const taskApi = {
  getAll(params?: { search?: string; filter?: string }) {
    const query = new URLSearchParams()
    if (params?.search) query.set("search", params.search)
    if (params?.filter && params.filter !== "all") query.set("filter", params.filter)
    const qs = query.toString()
    return request<ApiTask[]>(API_BASE + "/tasks" + (qs ? "?" + qs : ""))
  },

  getById(id: string) {
    return request<ApiTask>(API_BASE + "/tasks/" + id)
  },

  create(title: string, description: string) {
    return request<ApiTask>(API_BASE + "/tasks", {
      method: "POST",
      body: JSON.stringify({ title, description }),
    })
  },

  update(id: string, title: string, description: string) {
    return request<ApiTask>(API_BASE + "/tasks/" + id, {
      method: "PUT",
      body: JSON.stringify({ title, description }),
    })
  },

  toggle(id: string) {
    return request<ApiTask>(API_BASE + "/tasks/" + id + "/toggle", {
      method: "PATCH",
    })
  },

  delete(id: string) {
    return request<void>(API_BASE + "/tasks/" + id, {
      method: "DELETE",
    })
  },
}
