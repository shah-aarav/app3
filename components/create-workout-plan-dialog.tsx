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

interface CreateWorkoutPlanDialogProps {
  onCreatePlan: (planName: string) => void
}

export function CreateWorkoutPlanDialog({ onCreatePlan }: CreateWorkoutPlanDialogProps) {
  const [newPlanName, setNewPlanName] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleCreatePlan = () => {
    if (newPlanName.trim()) {
      onCreatePlan(newPlanName.trim())
      setNewPlanName("")
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Create Workout Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[95vw] rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Create New Workout Plan</DialogTitle>
          <DialogDescription className="text-center">Enter a name for your new workout plan.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="plan-name" className="sm:text-right">
              Name
            </Label>
            <Input
              id="plan-name"
              value={newPlanName}
              onChange={(e) => setNewPlanName(e.target.value)}
              className="sm:col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreatePlan} className="w-full">
            Create Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

