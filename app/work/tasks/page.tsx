'use client'

import { useState } from 'react'
import { NavigationBar } from '@/components/navigation-bar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'

interface Task {
  id: number
  description: string
  completed: boolean
}

export default function WorkTasksPage() {
  const [workGoal, setWorkGoal] = useState(8)
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, description: 'Complete project proposal', completed: false },
    { id: 2, description: 'Review team\'s work', completed: true },
    { id: 3, description: 'Prepare for client meeting', completed: false },
  ])
  const [newTask, setNewTask] = useState('')

  const handleWorkGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkGoal(Number(e.target.value))
  }

  const handleNewTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value)
  }

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), description: newTask.trim(), completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const completedTasks = tasks.filter(task => task.completed).length
  const progress = (completedTasks / tasks.length) * 100

  return (
    <div className="flex flex-col h-full bg-[#ffffff]">
      <main className="flex-grow px-6 pb-6 pt-12 overflow-y-auto">
        <div className="max-w-md mx-auto w-full flex flex-col gap-8">
          <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight text-center">
            <span className="border-b-2 border-[#0f172a] pb-1">
              Work Tasks
            </span>
          </h1>

          <div className="space-y-4">
            <div>
              <label htmlFor="workGoal" className="block text-sm font-medium text-[#0f172a]">Work Goal (hours)</label>
              <Input
                id="workGoal"
                type="number"
                value={workGoal}
                onChange={handleWorkGoalChange}
                min={1}
                max={24}
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-2">Task Progress</label>
              <Progress value={progress} className="w-full" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Tasks</h2>
              {tasks.map(task => (
                <div key={task.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-[#0f172a]'}`}
                  >
                    {task.description}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <Input
                type="text"
                value={newTask}
                onChange={handleNewTaskChange}
                placeholder="Add a new task"
              />
              <Button onClick={addTask}>Add</Button>
            </div>
          </div>
        </div>
      </main>
      <NavigationBar />
    </div>
  )
}

