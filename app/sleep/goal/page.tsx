'use client'

import { useState } from 'react'
import { NavigationBar } from '@/components/navigation-bar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function SleepGoalPage() {
  const [sleepGoal, setSleepGoal] = useState(8)
  const [actualSleep, setActualSleep] = useState(7)

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSleepGoal(Number(e.target.value))
  }

  const handleActualSleepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActualSleep(Number(e.target.value))
  }

  const progress = Math.min((actualSleep / sleepGoal) * 100, 100)

  return (
    <div className="flex flex-col h-full bg-[#ffffff]">
      <main className="flex-grow px-6 pb-6 pt-12 overflow-y-auto">
        <div className="max-w-md mx-auto w-full flex flex-col gap-8">
          <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight text-center">
            <span className="border-b-2 border-[#0f172a] pb-1">
              Sleep Goal
            </span>
          </h1>

          <div className="space-y-4">
            <div>
              <label htmlFor="sleepGoal" className="block text-sm font-medium text-[#0f172a]">Sleep Goal (hours)</label>
              <Input
                id="sleepGoal"
                type="number"
                value={sleepGoal}
                onChange={handleGoalChange}
                min={1}
                max={24}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="actualSleep" className="block text-sm font-medium text-[#0f172a]">Actual Sleep (hours)</label>
              <Input
                id="actualSleep"
                type="number"
                value={actualSleep}
                onChange={handleActualSleepChange}
                min={0}
                max={24}
                className="mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-2">Progress</label>
              <Progress value={progress} className="w-full" />
            </div>

            <Button className="w-full">Save</Button>
          </div>
        </div>
      </main>
      <NavigationBar />
    </div>
  )
}

