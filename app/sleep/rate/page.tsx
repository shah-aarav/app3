'use client'

import { useState } from 'react'
import { NavigationBar } from '@/components/navigation-bar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'

const sleepReasons = [
  "didn't have time to sleep",
  "I physically could not",
  "I was distracted"
]

export default function SleepRatingPage() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [selectedReason, setSelectedReason] = useState<string | null>(null)

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason)
    router.push(`/sleep/chat?reason=${encodeURIComponent(reason)}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow px-6 pb-6 pt-12">
        <div className="max-w-md mx-auto w-full space-y-12">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Rate your sleep.
            </h1>
            
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="p-1"
                >
                  <Star
                    size={32}
                    className={`${
                      star <= (hoveredStar || rating)
                        ? 'fill-yellow-400 stroke-yellow-400'
                        : 'fill-gray-200 stroke-gray-200'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">
              Which of these statements<br />
              resonate with you the most?
            </h2>

            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold">
                I couldn't sleep<br />
                because...
              </h3>

              <div className="space-y-3">
                {sleepReasons.map((reason) => (
                  <Card
                    key={reason}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedReason === reason
                        ? 'bg-[#0f172a] text-white'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleReasonSelect(reason)}
                  >
                    <span className="text-lg sm:text-xl">{reason}</span>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <NavigationBar />
    </div>
  )
}

