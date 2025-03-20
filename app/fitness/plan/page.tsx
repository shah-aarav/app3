'use client'

import { useState } from 'react'
import { NavigationBar } from '@/components/navigation-bar'
import { RandomQuote } from '@/components/random-quote'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface Exercise {
  name: string
  sets: number
  reps: number
  completed: boolean
}

export default function FitnessPlanPage() {
  const [fitnessGoal, setFitnessGoal] = useState('Lose weight')
  const [workoutPlan, setWorkoutPlan] = useState<Exercise[]>([
    { name: 'Push-ups', sets: 3, reps: 10, completed: false },
    { name: 'Squats', sets: 3, reps: 15, completed: false },
    { name: 'Plank', sets: 3, reps: 30, completed: false },
  ])
  const [newExercise, setNewExercise] = useState({ name: '', sets: 0, reps: 0 })

  const handleFitnessGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFitnessGoal(e.target.value)
  }

  const handleNewExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExercise({ ...newExercise, [e.target.name]: e.target.value })
  }

  const addExercise = () => {
    if (newExercise.name && newExercise.sets > 0 && newExercise.reps > 0) {
      setWorkoutPlan([...workoutPlan, { ...newExercise, completed: false }])
      setNewExercise({ name: '', sets: 0, reps: 0 })
    }
  }

  const toggleExercise = (index: number) => {
    const updatedWorkoutPlan = [...workoutPlan]
    updatedWorkoutPlan[index].completed = !updatedWorkoutPlan[index].completed
    setWorkoutPlan(updatedWorkoutPlan)
  }

  const completedExercises = workoutPlan.filter(exercise => exercise.completed).length
  const progress = (completedExercises / workoutPlan.length) * 100

  return (
    <div className="flex flex-col h-full bg-[#ffffff]">
      <main className="flex-grow px-6 pb-6 pt-12 overflow-y-auto">
        <div className="max-w-md mx-auto w-full flex flex-col gap-8">
          <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight text-center">
            <span className="border-b-2 border-[#0f172a] pb-1">
              Fitness Plan
            </span>
          </h1>

          <RandomQuote />

          <div className="space-y-4">
            <div>
              <label htmlFor="fitnessGoal" className="block text-sm font-medium text-[#0f172a]">Fitness Goal</label>
              <Input
                id="fitnessGoal"
                type="text"
                value={fitnessGoal}
                onChange={handleFitnessGoalChange}
                className="mt-1"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Workout Progress</h2>
              <Progress value={progress} className="w-full" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Workout Plan</h2>
              {workoutPlan.map((exercise, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Checkbox
                        id={`exercise-${index}`}
                        checked={exercise.completed}
                        onCheckedChange={() => toggleExercise(index)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`exercise-${index}`}
                        className={`${exercise.completed ? 'line-through text-gray-500' : ''}`}
                      >
                        {exercise.name}
                      </label>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-[#0f172a] ${exercise.completed ? 'line-through text-gray-500' : ''}`}>
                      {exercise.sets} sets of {exercise.reps} reps
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#0f172a]">Add New Exercise</h3>
              <div className="space-y-2">
                <Label htmlFor="exercise-name">Exercise Name</Label>
                <Input
                  id="exercise-name"
                  type="text"
                  name="name"
                  value={newExercise.name}
                  onChange={handleNewExerciseChange}
                  placeholder="e.g., Bench Press"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exercise-sets">Number of Sets</Label>
                <Input
                  id="exercise-sets"
                  type="number"
                  name="sets"
                  value={newExercise.sets}
                  onChange={handleNewExerciseChange}
                  placeholder="e.g., 3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exercise-reps">Number of Reps</Label>
                <Input
                  id="exercise-reps"
                  type="number"
                  name="reps"
                  value={newExercise.reps}
                  onChange={handleNewExerciseChange}
                  placeholder="e.g., 10"
                />
              </div>
              <Button onClick={addExercise} className="w-full">Add Exercise</Button>
            </div>
          </div>
        </div>
      </main>
      <NavigationBar />
    </div>
  )
}

