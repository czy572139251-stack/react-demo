# React Demo · Task Manager

> 全栈任务管理应用 | React 18 + TypeScript + React Router + Express

![React](https://img.shields.io/badge/React-18-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Express](https://img.shields.io/badge/Express-4.19-000000)

---

## Quick Start

Two terminals needed:

```bash
# Terminal 1: Start Express backend
cd server
npm install
npm start
# → http://localhost:3001

# Terminal 2: Start Vite frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | React 18 + TypeScript |
| Build | Vite 5 |
| Routing | React Router v6 |
| Backend | Express 4.19 |
| Styling | CSS Custom Properties (dark/light theme) |
| State | useReducer + Context API |
| Data API | Fetch + REST |

---

## Features

### React Hooks
- **useState** — form inputs, editing state
- **useEffect** — API fetching, theme persistence
- **useRef** — auto-focus input on edit
- **useReducer** — task state management with actions
- **useMemo** — filtered task list & stats caching
- **useCallback** — memoized CRUD functions

### Context API
- ThemeContext for dark/light mode toggle
- Persisted to localStorage

### React Router
- Layout route with NavLink navigation
- Nested routes (Home / Tasks)

### Express Backend (REST API)
- `GET /api/tasks` — list tasks (with search & filter)
- `POST /api/tasks` — create task
- `PUT /api/tasks/:id` — update task
- `PATCH /api/tasks/:id/toggle` — toggle completion
- `DELETE /api/tasks/:id` — delete task

### UI Features
- Add / edit / delete / toggle tasks
- Search by title or description
- Filter: All / Active / Completed
- Statistics: total / done / pending
- Dark / Light theme toggle
- Loading & error states
- Empty state placeholder
- localStorage fallback (if backend is off)

---

## Project Structure

```
react-demo/
├── server/
│   └── index.js              # Express REST API
├── src/
│   ├── api/
│   │   └── tasks.ts           # Fetch API layer
│   ├── components/
│   │   ├── Layout.tsx          # Navigation + theme toggle
│   │   ├── TaskForm.tsx        # Add / edit form
│   │   └── TaskList.tsx        # Task list with actions
│   ├── context/
│   │   └── ThemeContext.tsx    # Dark/light theme
│   ├── hooks/
│   │   └── useTasks.ts        # Custom hook (useReducer + API)
│   └── pages/
│       ├── Home.tsx            # Welcome page
│       └── Tasks.tsx           # Task manager page
├── vite.config.ts             # Vite + proxy config
└── package.json
```

---

## Screenshots

*[Home page - add screenshot here]*

*[Task Manager with dark theme - add screenshot here]*

---

## Interview Talking Points

| Concept | Implementation |
|---------|---------------|
| **useReducer** | Task CRUD actions (ADD/UPDATE/TOGGLE/DELETE) |
| **Context API** | ThemeContext with Provider + useContext |
| **Custom Hook** | useTasks encapsulates all business logic |
| **useCallback** | Prevents unnecessary child re-renders |
| **useMemo** | Caches filtered tasks and stats |
| **React Router** | Layout route with nested child routes |
| **Express** | 5 REST endpoints for full CRUD |
| **CSS Variables** | Dark/light theme via data-theme attribute |
| **TypeScript** | Generic fetch + interface types |
