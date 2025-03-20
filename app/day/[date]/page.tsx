"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Plus } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { getEventsByDate, type CalendarEvent } from "@/lib/db"

function formatTime(time: string): { hour: number; minute: number; period: string } {
  const [hours, minutes] = time.split(":").map(Number)
  const period = hours >= 12 ? "PM" : "AM"
  const hour = hours % 12 || 12
  return { hour, minute: minutes, period }
}

function formatTimeString(time: { hour: number; minute: number; period: string }): string {
  return `${time.hour}:${time.minute.toString().padStart(2, "0")} ${time.period}`
}

export default function DayPage({ params }: { params: { date: string } }) {
  const router = useRouter()
  const [events, setEvents] = useState<CalendarEvent[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      const dayEvents = await getEventsByDate(params.date)
      setEvents(dayEvents)
    }
    fetchEvents()
  }, [params.date])

  const currentDate = new Date(params.date)
  currentDate.setMinutes(currentDate.getMinutes() + currentDate.getTimezoneOffset())

  const timeBlocks = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12
    const period = i < 12 ? "AM" : "PM"
    return `${hour}:00 ${period}`
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex flex-col h-screen bg-[#f8fafc] pb-16 overflow-y-auto">
        <motion.div
          className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-200 bg-white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Button variant="ghost" onClick={() => router.push("/calendar")}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-[#0f172a]">
            {currentDate.toLocaleDateString("default", { weekday: "long", month: "long", day: "numeric" })}
          </h1>
          <div className="w-8"></div> {/* Spacer for alignment */}
        </motion.div>

        <div className="flex-grow overflow-y-auto">
          <div className="p-4 pb-24">
            <AnimatePresence>
              {timeBlocks.map((time, index) => {
                const eventsAtTime = events.filter((event) => {
                  const eventStart = formatTime(event.startTime)
                  const eventEnd = formatTime(event.endTime)
                  const [blockHour, blockPeriod] = time.split(" ")
                  const blockHourNum = Number.parseInt(blockHour)

                  const eventStartTime =
                    eventStart.hour + (eventStart.period === "PM" && eventStart.hour !== 12 ? 12 : 0)
                  const eventEndTime = eventEnd.hour + (eventEnd.period === "PM" && eventEnd.hour !== 12 ? 12 : 0)
                  const blockTime = blockHourNum + (blockPeriod === "PM" && blockHourNum !== 12 ? 12 : 0)

                  return eventStartTime <= blockTime && eventEndTime > blockTime
                })

                return (
                  <motion.div
                    key={time}
                    className="flex mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-20 text-right pr-2 text-xs text-gray-500">{time}</div>
                    <div className="flex-grow border-l border-gray-200 pl-2">
                      <AnimatePresence>
                        {eventsAtTime.map((event) => (
                          <motion.div
                            key={event.id}
                            className={`p-2 rounded mb-1 text-xs ${event.color}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="font-semibold">{event.title}</div>
                            <div>
                              {formatTimeString(formatTime(event.startTime))} -{" "}
                              {formatTimeString(formatTime(event.endTime))}
                            </div>
                            {event.travelTime && (
                              <div className="text-xs italic mt-1">Travel time: {event.travelTime} min</div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="fixed bottom-16 left-0 right-0 p-4 border-t border-gray-200 bg-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button className="w-full" onClick={() => router.push(`/add-event?date=${params.date}`)}>
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </motion.div>

        <NavigationBar />
      </div>
    </motion.div>
  )
}

