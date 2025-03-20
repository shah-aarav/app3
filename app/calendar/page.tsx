"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { getEvents, type CalendarEvent } from "@/lib/db"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
}

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.2,
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
}

const itemVariants = {
  hidden: { y: 5, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      duration: 0.2,
    },
  },
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const formattedHours = hours % 12 || 12
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`
}

function calculateLeaveTime(event: CalendarEvent): string {
  const [hours, minutes] = event.startTime.split(":").map(Number)
  const date = new Date(event.date)
  date.setHours(hours, minutes)
  date.setMinutes(date.getMinutes() - (event.travelTime || 0))
  return formatTime(date.toTimeString().slice(0, 5))
}

export default function CalendarPage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getEvents()
      setEvents(allEvents)
    }
    fetchEvents()

    const handleEventsUpdated = () => {
      fetchEvents()
    }

    window.addEventListener("eventsUpdated", handleEventsUpdated)
    return () => {
      window.removeEventListener("eventsUpdated", handleEventsUpdated)
    }
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const days = []
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + increment)
    setCurrentDate(newDate)
  }

  const daysInMonth = getDaysInMonth(currentDate)

  const handleDayClick = (date: Date) => {
    const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    router.push(`/day/${adjustedDate.toISOString().split("T")[0]}`)
  }

  const upcomingEvents = events
    .filter((event) => new Date(`${event.date}T${event.startTime}`) >= new Date())
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`)
      const dateB = new Date(`${b.date}T${b.startTime}`)
      return dateA.getTime() - dateB.getTime()
    })
    .slice(0, 5)

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="content-container bg-[#f8fafc]"
    >
      <motion.div className="sticky top-0 bg-white z-10 border-b border-gray-200" variants={itemVariants}>
        <div className="flex justify-between items-center p-4">
          <Button onClick={() => router.push("/")} variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-[#0f172a]">
            {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </h1>
          <div className="flex">
            <Button onClick={() => changeMonth(-1)} variant="ghost" size="sm" className="mr-1">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={() => changeMonth(1)} variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <motion.div className="scrollable-content px-4" variants={containerVariants} initial="hidden" animate="visible">
        <div className="p-4">
          <motion.div className="grid grid-cols-7 gap-1 mb-2 text-xs" variants={itemVariants}>
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </motion.div>

          <motion.div className="grid grid-cols-7 gap-1 mb-4" variants={itemVariants}>
            <AnimatePresence>
              {daysInMonth.map((day, index) => (
                <motion.button
                  key={index}
                  onClick={() => day && handleDayClick(day)}
                  className={`aspect-square p-1 flex flex-col items-center justify-center ${
                    day ? "hover:bg-gray-100 active:bg-gray-200" : "text-gray-300 cursor-default"
                  } ${day?.toDateString() === new Date().toDateString() ? "bg-[#0f172a] text-white rounded-full" : ""}`}
                  disabled={!day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.1 }}
                >
                  {day && (
                    <>
                      <span className="text-sm font-medium">{day.getDate()}</span>
                      {events.filter((event) => event.date === day.toISOString().split("T")[0]).length > 0 && (
                        <motion.div
                          className="w-1 h-1 bg-[#0f172a] rounded-full mt-1"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.1 }}
                        />
                      )}
                    </>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div className="mt-4 space-y-2 px-4" variants={itemVariants}>
          <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
          <div className="space-y-2">
            <AnimatePresence>
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  className={`p-2 rounded-lg mb-2 text-sm ${event.color}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.2 }}
                >
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-xs">
                    {new Date(event.date).toLocaleDateString("default", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </div>
                  {event.travelTime && event.travelTime > 0 && (
                    <div className="text-xs mt-1">Time to leave: {calculateLeaveTime(event)}</div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {upcomingEvents.length === 0 && <div className="text-sm text-gray-500">No upcoming events</div>}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.2 }}
      >
        <Button
          className="w-full"
          onClick={() => router.push(`/add-event?date=${currentDate.toISOString().split("T")[0]}`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </motion.div>

      <NavigationBar />
    </motion.div>
  )
}

