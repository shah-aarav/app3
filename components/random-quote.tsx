'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

const quotes = [
  "The only bad workout is the one that didn't happen.",
  "Fitness is not about being better than someone else. It's about being better than you used to be.",
  "Take care of your body. It's the only place you have to live.",
  "The hardest lift of all is lifting your butt off the couch.",
  "Strength does not come from the body. It comes from the will.",
  "The difference between try and triumph is a little umph.",
  "Your health is an investment, not an expense.",
  "Fitness is not a destination. It's a way of life.",
  "The only way to do great work is to love what you do.",
  "Your body can stand almost anything. It's your mind that you have to convince."
]

export function RandomQuote() {
  const [quote, setQuote] = useState('')

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <Card className="bg-[#0f172a] text-white">
      <CardContent className="p-4">
        <p className="text-lg font-semibold italic">"{quote}"</p>
      </CardContent>
    </Card>
  )
}

