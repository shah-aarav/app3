'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { NavigationBar } from '@/components/navigation-bar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getSleepAdvice } from './actions'
import { Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
}

export default function SleepChatPage() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'assistant',
      content: "Hi, I'm your sleep assistant. I understand you're having trouble sleeping. Let's talk about it. Have there been any recent changes in your schedule?"
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input
    setInput('')
    const newUserMessage = { id: Date.now(), role: 'user' as const, content: userMessage }
    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)

    try {
      const response = await getSleepAdvice(userMessage)
      const newAssistantMessage = { id: Date.now(), role: 'assistant' as const, content: response }
      setMessages(prev => [...prev, newAssistantMessage])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const chatBubbleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc]">
      <div className="flex-grow overflow-y-auto pb-24">
        <div className="min-h-full p-4 sm:p-6 flex flex-col justify-end">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={chatBubbleVariants}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] sm:max-w-[70%] ${
                    message.role === 'assistant'
                      ? 'bg-white text-[#0f172a] shadow-sm'
                      : 'bg-[#0f172a] text-white'
                  }`}
                >
                  <p className="text-sm sm:text-base">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={chatBubbleVariants}
              className="flex justify-start mb-4"
            >
              <div className="bg-white text-[#0f172a] rounded-2xl px-4 py-2 shadow-sm">
                <p className="text-sm sm:text-base">Thinking...</p>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-white px-4 py-4 sm:py-6">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-3xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-gray-100 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="bg-[#0f172a] hover:bg-[#1e293b] text-white">
            <Send size={18} />
          </Button>
        </form>
      </div>

      <NavigationBar />
    </div>
  )
}

