"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface Exercise {
  name: string
  sets: number
  reps: number
}

interface AddExerciseDialogProps {
  onAddExercise: (exercise: Exercise) => void
}

export function AddExerciseDialog({ onAddExercise }: AddExerciseDialogProps) {
  const [exercise, setExercise] = useState<Exercise>({ name: "", sets: 3, reps: 10 })
  const [isOpen, setIsOpen] = useState(false)

  const handleAddExercise = () => {
    if (exercise.name.trim()) {
      onAddExercise(exercise)
      setExercise({ name: "", sets: 3, reps: 10 })
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full mt-4">
          <Plus className="w-4 h-4 mr-2" />
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[95vw] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Add New Exercise</DialogTitle>
          <DialogDescription className="text-center">Enter the details for your new exercise.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="exercise-name" className="sm:text-right">
              Name
            </Label>
            <Input
              id="exercise-name"
              value={exercise.name}
              onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
              className="sm:col-span-3"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="exercise-sets" className="sm:text-right">
              Sets
            </Label>
            <Input
              id="exercise-sets"
              type="number"
              value={exercise.sets}
              onChange={(e) => setExercise({ ...exercise, sets: Number.parseInt(e.target.value) || 0 })}
              className="sm:col-span-3"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="exercise-reps" className="sm:text-right">
              Reps
            </Label>
            <Input
              id="exercise-reps"
              type="number"
              value={exercise.reps}
              onChange={(e) => setExercise({ ...exercise, reps: Number.parseInt(e.target.value) || 0 })}
              className="sm:col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddExercise} className="w-full">
            Add Exercise
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

