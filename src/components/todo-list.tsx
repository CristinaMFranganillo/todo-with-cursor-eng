"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2, Check } from 'lucide-react'

interface Todo {
  id: number
  text: string
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo }])
      setNewTodo("")
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo)))
    setEditingId(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground py-4">
        <h1 className="text-2xl font-bold text-center">Todo List App</h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex mb-4">
            <Input
              type="text"
              placeholder="Add a new todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="mr-2"
            />
            <Button onClick={addTodo}>Add</Button>
          </div>

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center bg-card p-2 rounded">
                {editingId === todo.id ? (
                  <>
                    <Input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="mr-2 flex-grow"
                    />
                    <Button size="icon" onClick={() => saveEdit(todo.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="flex-grow">{todo.text}</span>
                    <Button size="icon" variant="ghost" onClick={() => startEditing(todo.id, todo.text)} className="mr-2">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => deleteTodo(todo.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="bg-muted py-4 text-center">
        <p>&copy; 2023 Todo List App. All rights reserved.</p>
      </footer>
    </div>
  )
}

