"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ProgressCircle } from "@/components/progress-circle"
import { CalendarWidget } from "@/components/calendar-widget"
import { NavigationBar } from "@/components/navigation-bar"
import { OnboardingGuide } from "@/components/onboarding-guide"
import { motion } from "framer-motion"

const categories = ["sleep", "diet", "work", "fitness"] as const

interface UserData {
  name: string
  gender: string
  age: number
  sleepGoal: number
  dietGoal: number
  workGoal: number
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showOnboarding, setShowOnboarding] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    const onboardingComplete = localStorage.getItem("onboardingComplete")
    const storedUserData = localStorage.getItem("userData")

    if (onboardingComplete && storedUserData) {
      setUserData(JSON.parse(storedUserData))
    } else {
      setShowOnboarding(true)
    }

    return () => clearInterval(timer)
  }, [])

  const handleCalendarClick = () => {
    router.push("/calendar")
  }

  const handleOnboardingComplete = (newUserData: UserData) => {
    setShowOnboarding(false)
    setUserData(newUserData)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
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

  return (
    <div className="content-container bg-[#ffffff]">
      {showOnboarding && <OnboardingGuide onComplete={handleOnboardingComplete} />}
      <motion.main
        className="scrollable-content px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-md mx-auto w-full flex flex-col space-y-8">
          <motion.h1 className="text-4xl font-bold text-[#0f172a] tracking-tight" variants={itemVariants}>
            Hello, {userData?.name || "User"}
          </motion.h1>

          <motion.div className="flex justify-between" variants={itemVariants}>
            {categories.map((category, index) => (
              <ProgressCircle key={category} id={index} category={category} />
            ))}
          </motion.div>

          <motion.div className="flex flex-col items-center space-y-4" variants={itemVariants}>
            <motion.button
              onClick={handleCalendarClick}
              className="focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.1 }}
            >
              <CalendarWidget />
            </motion.button>
            <motion.p className="text-xl font-medium text-[#0f172a]" variants={itemVariants}>
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </motion.p>
          </motion.div>
        </div>
      </motion.main>
      <NavigationBar />
    </div>
  )
}

