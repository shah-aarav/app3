"use client"

import { useState } from "react"
import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CreateWorkoutPlanDialog } from "@/components/create-workout-plan-dialog"
import { AddExerciseDialog } from "@/components/add-exercise-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, ChevronDown, ChevronUp } from "lucide-react"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  completed: boolean
}

interface WorkoutPlan {
  id: string
  name: string
  exercises: Exercise[]
}

export default function FitnessPage() {
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([])
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null)
  const [planToDelete, setPlanToDelete] = useState<string | null>(null)

  const addWorkoutPlan = (planName: string) => {
    const newPlan: WorkoutPlan = {
      id: Date.now().toString(),
      name: planName,
      exercises: [],
    }
    setWorkoutPlans([...workoutPlans, newPlan])
  }

  const addExercise = (planId: string, exercise: Omit<Exercise, "id" | "completed">) => {
    setWorkoutPlans(
      workoutPlans.map((plan) => {
        if (plan.id === planId) {
          const newExercise: Exercise = {
            ...exercise,
            id: Date.now().toString(),
            completed: false,
          }
          return { ...plan, exercises: [...plan.exercises, newExercise] }
        }
        return plan
      }),
    )
  }

  const toggleExerciseCompletion = (planId: string, exerciseId: string) => {
    setWorkoutPlans(
      workoutPlans.map((plan) => {
        if (plan.id === planId) {
          return {
            ...plan,
            exercises: plan.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex)),
          }
        }
        return plan
      }),
    )
  }

  const removeWorkoutPlan = (planId: string) => {
    setWorkoutPlans(workoutPlans.filter((plan) => plan.id !== planId))
    setExpandedPlan(null) // Close the expanded view if the deleted plan was expanded
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]">
      <main className="flex-grow overflow-y-auto px-4 sm:px-6 py-8 pb-24">
        <div className="max-w-md mx-auto w-full space-y-6 sm:space-y-8">
          <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight text-center">
            <span className="border-b-2 border-[#0f172a] pb-1">Fitness Tracker</span>
          </h1>

          <CreateWorkoutPlanDialog onCreatePlan={addWorkoutPlan} />

          <AnimatePresence>
            {workoutPlans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-4 p-3 sm:p-4">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base sm:text-lg font-semibold">{plan.name}</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                      >
                        {expandedPlan === plan.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                      <AlertDialog
                        open={planToDelete === plan.id}
                        onOpenChange={(open) => !open && setPlanToDelete(null)}
                      >
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setPlanToDelete(plan.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="sm:max-w-[425px] w-[95vw] rounded-lg">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-bold text-center">
                              Are you sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-center">
                              This action cannot be undone. This will permanently delete the workout plan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <AlertDialogCancel className="rounded-md w-full sm:w-auto">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                if (planToDelete) {
                                  removeWorkoutPlan(planToDelete)
                                  setPlanToDelete(null)
                                }
                              }}
                              className="rounded-md w-full sm:w-auto"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <AnimatePresence>
                      {expandedPlan === plan.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {plan.exercises.map((exercise) => (
                            <div key={exercise.id} className="flex items-center space-x-2 mb-2">
                              <Checkbox
                                checked={exercise.completed}
                                onCheckedChange={() => toggleExerciseCompletion(plan.id, exercise.id)}
                              />
                              <span className={exercise.completed ? "line-through text-gray-500" : ""}>
                                {exercise.name} - {exercise.sets} x {exercise.reps}
                              </span>
                            </div>
                          ))}
                          <AddExerciseDialog onAddExercise={(exercise) => addExercise(plan.id, exercise)} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
      <NavigationBar />
    </div>
  )
}

