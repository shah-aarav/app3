'use client'

import { NavigationBar } from '@/components/navigation-bar'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function DietPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-[#ffffff]"
    >
      <main className="flex-grow px-6 pb-6 pt-12 overflow-y-auto">
        <div className="max-w-md mx-auto w-full flex flex-col justify-center items-center gap-12">
          <Link href="/diet/details" className="relative w-[300px] h-[300px] group">
            <svg width="300" height="300" viewBox="0 0 125 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M65.676 108.786C38.8967 108.786 17.1877 87.077 17.1877 60.2976C17.1877 33.5182 38.8967 11.8092 65.676 11.8092C92.4554 11.8092 114.164 33.5182 114.164 60.2976C114.164 87.077 92.4554 108.786 65.676 108.786Z" 
                  stroke="#0f172a" 
                  strokeWidth="20.806"
                />
                <path 
                  d="M20.4113 42.0834C23.3229 34.5024 28.092 27.7741 34.2808 22.516C40.4697 17.2579 47.88 13.6384 55.8318 11.9897C63.7836 10.341 72.0222 10.7158 79.7914 13.0799C87.5606 15.444 94.6116 19.7215 100.297 25.5199" 
                  stroke="#0f172a" 
                  strokeWidth="20.806" 
                  strokeLinecap="round"
                />
                <path 
                  d="M21.36 39.7905C26.5352 28.1353 36.0937 18.9882 47.965 14.3302C59.8363 9.67221 73.0648 9.8784 84.7852 14.9041C96.5055 19.9298 105.774 29.3704 110.584 41.1812C115.393 52.9919 115.356 66.2219 110.481 78.0057C105.606 89.7894 96.2844 99.1781 84.5361 104.138C72.7879 109.099 59.5585 109.231 47.7133 104.507C35.8682 99.7826 26.361 90.5823 21.2508 78.8985C16.1407 67.2147 15.8391 53.988 20.4113 42.0834" 
                  stroke="#0f172a" 
                  strokeWidth="20.806" 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[#0f172a] text-2xl font-bold">
                    <span className="border-b-2 border-[#0f172a] pb-1">
                      Click to<br />see more
                    </span>
                  </p>
                </div>
              </div>
          </Link>

          <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight text-center">
            <span className="border-b-2 border-[#0f172a] pb-1">
              Diet Tracker
            </span>
          </h1>
        </div>
      </main>
      <NavigationBar />
    </motion.div>
  )
}

