"use client"

import * as React from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface TimePickerProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const [hours, minutes, period] = value.split(/[:\s]/)
  const [localHours, setLocalHours] = useState(Number(hours))
  const [localMinutes, setLocalMinutes] = useState(Number(minutes))
  const [localPeriod, setLocalPeriod] = useState(period || "AM")

  const incrementHours = () => {
    const newHours = (localHours % 12) + 1
    setLocalHours(newHours)
    onChange(`${newHours.toString().padStart(2, "0")}:${localMinutes.toString().padStart(2, "0")} ${localPeriod}`)
  }

  const decrementHours = () => {
    const newHours = ((localHours - 2 + 12) % 12) + 1
    setLocalHours(newHours)
    onChange(`${newHours.toString().padStart(2, "0")}:${localMinutes.toString().padStart(2, "0")} ${localPeriod}`)
  }

  const incrementMinutes = () => {
    const newMinutes = (localMinutes + 15) % 60
    setLocalMinutes(newMinutes)
    onChange(`${localHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")} ${localPeriod}`)
  }

  const decrementMinutes = () => {
    const newMinutes = (localMinutes - 15 + 60) % 60
    setLocalMinutes(newMinutes)
    onChange(`${localHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")} ${localPeriod}`)
  }

  const togglePeriod = () => {
    const newPeriod = localPeriod === "AM" ? "PM" : "AM"
    setLocalPeriod(newPeriod)
    onChange(`${localHours.toString().padStart(2, "0")}:${localMinutes.toString().padStart(2, "0")} ${newPeriod}`)
  }

  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      <div className="flex flex-col items-center">
        <Button variant="outline" size="sm" onClick={incrementHours}>
          <ChevronUp className="h-4 w-4" />
        </Button>
        <div className="text-2xl font-semibold my-2 no-zoom">{localHours.toString().padStart(2, "0")}</div>
        <Button variant="outline" size="sm" onClick={decrementHours}>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-2xl font-semibold">:</div>
      <div className="flex flex-col items-center">
        <Button variant="outline" size="sm" onClick={incrementMinutes}>
          <ChevronUp className="h-4 w-4" />
        </Button>
        <div className="text-2xl font-semibold my-2 no-zoom">{localMinutes.toString().padStart(2, "0")}</div>
        <Button variant="outline" size="sm" onClick={decrementMinutes}>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
      <Button variant="outline" size="sm" onClick={togglePeriod}>
        {localPeriod}
      </Button>
    </div>
  )
}

