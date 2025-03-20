'use client'

import { useState, useEffect } from 'react'

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const month = currentDate.toLocaleString('default', { month: 'short' }).toUpperCase()
  const day = currentDate.getDate()

  return (
    <div className="w-[120px] mx-auto bg-[#ffffff] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="bg-[#0f172a] text-[#ffffff] text-center py-2">
        <span className="text-sm font-semibold tracking-wider">{month}</span>
      </div>
      <div className="text-[#0f172a] text-center py-3">
        <span className="text-4xl font-light">{day}</span>
      </div>
    </div>
  )
}

