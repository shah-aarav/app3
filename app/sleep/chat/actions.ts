'use server'

import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

const SLEEP_ASSISTANT_PROMPT = `You are a sleep therapist assistant. Your role is to help users improve their sleep habits through a structured conversation. Follow this outline:

1. First, ask about any recent changes in their schedule
2. Then, explore ways they can create more free time for sleep
3. Finally, remind them about their fitness goals and how proper sleep is crucial for achieving them

Be empathetic, professional, and focused on helping them develop better sleep habits.`

export async function getSleepAdvice(userMessage: string) {
  const response = await generateText({
    model: openai('gpt-4o'),
    prompt: userMessage,
    system: SLEEP_ASSISTANT_PROMPT,
  })

  return response.text
}

