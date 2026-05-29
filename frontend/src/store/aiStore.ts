import { create } from 'zustand'
import type { AIMessage } from '@/types'

const MOCK_RESPONSES: Record<string, string> = {
  default: "I'm SmartBasket AI, your personal shopping assistant! I can help you find products, analyze nutrition, compare prices, and build healthy shopping lists. What can I help you with today?",
  nutrition: "Based on your health goals and current diet tracking, I recommend increasing your fiber intake. Products like **Organic Spinach**, **Whole Grain Oats**, and **Avocados** would be excellent additions to your cart. Would you like me to add them?",
  budget: "Looking at your spending this month ($287.43 of $400 budget), you have $112.57 remaining. I've found 5 products on your usual list that are currently on sale — switching to those could save you an estimated $23.40!",
  recommendation: "Based on your purchase history and health profile, I highly recommend **Wild Caught Atlantic Salmon** (96/100 AI score). It's rich in omega-3s, aligns with your heart health goal, and is currently 24% off!",
  calories: "Today you've consumed approximately 1,820 calories against your 2,000 calorie goal. You have room for a healthy snack — I'd suggest **Greek Yogurt with Berries** (~150 cal) or a handful of almonds (~165 cal).",
  compare: "Comparing **Organic Avocado** options: FreshFarm Pack of 4 ($5.99, health score 92) vs. Whole Foods 365 Pack of 3 ($4.99, health score 88). The FreshFarm option offers better value per avocado and a higher health score!",
}

function getAIResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('nutrition') || lower.includes('healthy') || lower.includes('fiber') || lower.includes('vitamin')) return MOCK_RESPONSES.nutrition
  if (lower.includes('budget') || lower.includes('spend') || lower.includes('money') || lower.includes('cheap')) return MOCK_RESPONSES.budget
  if (lower.includes('recommend') || lower.includes('suggest') || lower.includes('best')) return MOCK_RESPONSES.recommendation
  if (lower.includes('calori') || lower.includes('intake') || lower.includes('eat')) return MOCK_RESPONSES.calories
  if (lower.includes('compare') || lower.includes('vs') || lower.includes('versus') || lower.includes('difference')) return MOCK_RESPONSES.compare
  return MOCK_RESPONSES.default
}

interface AIStore {
  messages: AIMessage[]
  isOpen: boolean
  isTyping: boolean
  sendMessage: (content: string) => Promise<void>
  toggleChat: () => void
  openChat: () => void
  closeChat: () => void
  clearMessages: () => void
}

const initialMessages: AIMessage[] = [
  {
    id: 'msg-000',
    role: 'assistant',
    content: "👋 Hi! I'm **Basket AI**, your personal smart shopping assistant. I can help you:\n\n• 🛒 Find the best products\n• 🥗 Analyze nutrition\n• 💰 Track your budget\n• 📊 Compare prices\n• 🏃 Meet health goals\n\nWhat can I help you with today?",
    timestamp: new Date().toISOString(),
  },
]

export const useAIStore = create<AIStore>((set, get) => ({
  messages: initialMessages,
  isOpen: false,
  isTyping: false,

  sendMessage: async (content: string) => {
    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    }

    set((state) => ({ messages: [...state.messages, userMsg], isTyping: true }))

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200))

    const aiResponse = getAIResponse(content)
    const aiMsg: AIMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
    }

    set((state) => ({
      messages: [...state.messages, aiMsg],
      isTyping: false,
    }))
  },

  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  clearMessages: () => set({ messages: initialMessages }),
}))
