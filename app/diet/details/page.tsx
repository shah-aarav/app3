'use client'

import { useState } from 'react'
import { NavigationBar } from '@/components/navigation-bar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Meal {
  name: string
  calories: number
}

export default function DietDetailsPage() {
  const [calorieGoal, setCalorieGoal] = useState(2000)
  const [meals, setMeals] = useState<Meal[]>([
    { name: 'Breakfast', calories: 400 },
    { name: 'Lunch', calories: 600 },
    { name: 'Dinner', calories: 800 },
  ])

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)

  const handleCalorieGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalorieGoal(Number(e.target.value))
  }

  return (
    <div className="flex flex-col h-full bg-[#ffffff]">
      <main className="flex-grow px-6 pb-6 pt-12 overflow-y-auto">
        <div className="max-w-md mx-auto w-full flex flex-col gap-8">
          <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight text-center">
            <span className="border-b-2 border-[#0f172a] pb-1">
              Diet Details
            </span>
          </h1>

          <div className="space-y-4">
            <div>
              <label htmlFor="calorieGoal" className="block text-sm font-medium text-[#0f172a]">Calorie Goal</label>
              <Input
                id="calorieGoal"
                type="number"
                value={calorieGoal}
                onChange={handleCalorieGoalChange}
                min={0}
                className="mt-1"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Meals</h2>
              {meals.map((meal, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle>{meal.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#0f172a]">{meal.calories} calories</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <p className="text-lg font-semibold text-[#0f172a]">Total Calories: {totalCalories}</p>
              <p className="text-lg font-semibold text-[#0f172a]">Remaining: {calorieGoal - totalCalories}</p>
            </div>

            <Button className="w-full">Add Meal</Button>
          </div>
        </div>
      </main>
      <NavigationBar />
    </div>
  )
}

