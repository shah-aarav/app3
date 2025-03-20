"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TimePicker } from "@/components/time-picker"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import { addEvent, type CalendarEvent } from "@/lib/db"

const categoryColors = {
  sleep: "bg-blue-100 text-blue-800",
  diet: "bg-green-100 text-green-800",
  work: "bg-yellow-100 text-yellow-800",
  fitness: "bg-purple-100 text-purple-800",
  travel: "bg-pink-100 text-pink-800",
}

export default function AddEventPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    date: new Date().toISOString().split("T")[0],
    category: "",
    color: "",
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const dateParam = searchParams.get("date")
    if (dateParam && dateParam !== newEvent.date) {
      setNewEvent((prev) => ({ ...prev, date: dateParam }))
    }
  }, [searchParams, newEvent.date])

  const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(" ")
    let [hours, minutes] = time.split(":")
    if (hours === "12") {
      hours = "00"
    }
    if (modifier === "PM") {
      hours = (Number.parseInt(hours, 10) + 12).toString()
    }
    return `${hours.padStart(2, "0")}:${minutes}`
  }

  const handleAddEvent = async () => {
    if (
      newEvent.title &&
      newEvent.date &&
      newEvent.startTime &&
      newEvent.endTime &&
      newEvent.category &&
      newEvent.color
    ) {
      const event: Omit<CalendarEvent, "id"> = {
        ...(newEvent as Required<Omit<CalendarEvent, "id">>),
        startTime: convertTo24Hour(newEvent.startTime),
        endTime: convertTo24Hour(newEvent.endTime),
        travelTime: newEvent.travelTime || 0,
      }

      try {
        await addEvent(event)
        window.dispatchEvent(new Event("eventsUpdated"))
        router.push("/calendar")
      } catch (error) {
        console.error("Error adding event:", error)
        setErrorMessage("Failed to add event. Please try again.")
      }
    } else {
      setErrorMessage("Please fill in all required fields")
    }
  }

  const handleCategoryChange = (category: string) => {
    setNewEvent((prev) => ({
      ...prev,
      category: category as CalendarEvent["category"],
      color: categoryColors[category as keyof typeof categoryColors],
    }))
  }

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc]">
      <motion.div
        className="sticky top-0 z-10 bg-white border-b border-gray-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" onClick={() => router.push("/calendar")}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-[#0f172a]">Add Event</h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </div>
      </motion.div>

      <div className="flex-grow overflow-y-auto">
        <motion.div
          className="p-4 pb-32" // Increased bottom padding to account for fixed button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="max-w-md mx-auto space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Input
                className="w-full"
                placeholder="Event Title"
                value={newEvent.title || ""}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Input
                className="w-full"
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <TimePicker
                value={newEvent.startTime || ""}
                onChange={(value) => setNewEvent({ ...newEvent, startTime: value })}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <TimePicker
                value={newEvent.endTime || ""}
                onChange={(value) => setNewEvent({ ...newEvent, endTime: value })}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <Select value={newEvent.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category">
                    {newEvent.category && (
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${categoryColors[newEvent.category].split(" ")[0]}`}
                        />
                        {newEvent.category.charAt(0).toUpperCase() + newEvent.category.slice(1)}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryColors).map(([category, color]) => (
                    <SelectItem key={category} value={category}>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${color.split(" ")[0]}`} />
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              <Input
                className="w-full"
                type="number"
                placeholder="Travel Time (minutes)"
                value={newEvent.travelTime || ""}
                onChange={(e) => setNewEvent({ ...newEvent, travelTime: Number.parseInt(e.target.value) || 0 })}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {errorMessage && <div className="text-red-500 text-sm mb-2">{errorMessage}</div>}
        <Button className="w-full" onClick={handleAddEvent}>
          Add Event
        </Button>
      </motion.div>

      <NavigationBar />
    </div>
  )
}

