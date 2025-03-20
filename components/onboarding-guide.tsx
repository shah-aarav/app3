"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const steps = [
  { id: "welcome", title: "Welcome to Your Lifestyle App" },
  { id: "personal", title: "Personal Information" },
  { id: "sleep", title: "Sleep Goal" },
  { id: "diet", title: "Diet Goal" },
  { id: "work", title: "Work Goal" },
]

interface OnboardingGuideProps {
  onComplete: (userData: UserData) => void
}

interface UserData {
  name: string
  gender: string
  age: number
  sleepGoal: number
  dietGoal: number
  workGoal: number
}

export function OnboardingGuide({ onComplete }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState<UserData>({
    name: "",
    gender: "",
    age: 0,
    sleepGoal: 8,
    dietGoal: 0,
    workGoal: 8,
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      localStorage.setItem("onboardingComplete", "true")
      localStorage.setItem("userData", JSON.stringify(userData))
      onComplete(userData)
    }
  }

  const handleInputChange = (key: keyof UserData, value: string | number) => {
    setUserData((prevData) => ({ ...prevData, [key]: value }))
  }

  const renderStepContent = (step: string) => {
    switch (step) {
      case "welcome":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to Your Lifestyle App</h2>
            <p className="mb-4">Let's set up your personal profile and goals for a healthier lifestyle.</p>
          </div>
        )
      case "personal":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={userData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={userData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={userData.age || ""}
                onChange={(e) => handleInputChange("age", Number.parseInt(e.target.value))}
                placeholder="Enter your age"
              />
            </div>
          </div>
        )
      case "sleep":
        return (
          <div className="space-y-4">
            <Label>How many hours of sleep do you want to get each night?</Label>
            <Slider
              value={[userData.sleepGoal]}
              onValueChange={(value) => handleInputChange("sleepGoal", value[0])}
              min={4}
              max={12}
              step={0.5}
            />
            <p className="text-center">{userData.sleepGoal} hours</p>
          </div>
        )
      case "diet":
        return (
          <div className="space-y-4">
            <Label htmlFor="dietGoal">How many pounds do you want to lose?</Label>
            <Input
              id="dietGoal"
              type="number"
              value={userData.dietGoal || ""}
              onChange={(e) => handleInputChange("dietGoal", Number.parseInt(e.target.value))}
              placeholder="Enter weight loss goal in lbs"
            />
          </div>
        )
      case "work":
        return (
          <div className="space-y-4">
            <Label htmlFor="workGoal">How many hours do you want to work each day?</Label>
            <Input
              id="workGoal"
              type="number"
              value={userData.workGoal || ""}
              onChange={(e) => handleInputChange("workGoal", Number.parseInt(e.target.value))}
              placeholder="Enter daily work hours goal"
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent(steps[currentStep].id)}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
          <Button onClick={handleNext}>{currentStep === steps.length - 1 ? "Finish" : "Next"}</Button>
        </div>
      </div>
    </div>
  )
}

