"use client"

import { Home, Moon, Utensils, Briefcase, Activity } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function NavigationBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [userGoals, setUserGoals] = useState<Record<string, string>>({})

  useEffect(() => {
    const storedGoals = localStorage.getItem("userGoals")
    if (storedGoals) {
      setUserGoals(JSON.parse(storedGoals))
    }
  }, [])

  const tabs = [
    { id: "home", icon: Home, path: "/" },
    { id: "sleep", icon: Moon, path: "/sleep" },
    { id: "diet", icon: Utensils, path: "/diet" },
    { id: "work", icon: Briefcase, path: "/work" },
    { id: "fitness", icon: Activity, path: "/fitness" },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-[#ffffff] border-t border-gray-100 py-2 px-6 shadow-lg z-50"
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.2 }}
    >
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map(({ id, icon: Icon, path }) => (
          <motion.button
            key={id}
            onClick={() => handleNavigation(path)}
            className={`p-2 rounded-full transition-colors ${
              pathname === path ? "text-[#0f172a] bg-gray-100" : "text-[#9db2ce] hover:bg-gray-50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.1 }}
            title={userGoals[id] || ""}
          >
            <Icon className="w-6 h-6" />
            {pathname === path && (
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-[#0f172a]"
                layoutId="navIndicator"
                transition={{ type: "spring", stiffness: 500, damping: 30, duration: 0.2 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  )
}

