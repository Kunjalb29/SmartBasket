import { create } from 'zustand'
import type { AIMessage } from '@/types'

const MOCK_RESPONSES: Record<string, string> = {
  default: "I'm **Basket AI**, your personal smart shopping assistant! I can help you find products, check supermarket aisle locations, analyze nutrition content, retrieve 6-month price history trends, and match cheaper organic alternatives. Try asking me:\n\n• *'Where are the avocados?'*\n• *'What is the price history of eggs?'*\n• *'Compare organic honey prices'*",
  
  location: "📍 **Supermarket Aisle Directory**:\n\n• 🥑 **Organic Avocados & Fresh Produce**: Located in **Aisle 1** (Right entrance).\n• 🥬 **Organic Spinach & Fresh Herbs**: Located in **Aisle 2** (Vegetable chilled racks).\n• 🥛 **Plain Greek Yogurt & Dairy Products**: Located in **Aisle 4** (Chilled Dairy Wall).\n• 🍞 **Fresh Bakery & Healthy Sourdough**: Located in **Aisle 5** (Bakery Counter).\n• 🌾 **Whole Grain Oats & Chia Seeds**: Located in **Aisle 7** (Bulk dry bins).\n• 🍯 **Raw Organic Honey & Sweeteners**: Located in **Aisle 8** (Spreads & Baking).\n• 🐟 **Wild Caught Atlantic Salmon**: Located in **Aisle 12** (Frozen Seafood case).\n\nIf you are currently inside a SmartBasket affiliated store, I can also provide a detailed path mapping direct to the shelves!",
  
  price: "💰 **Real-time Price Scraping & Match Logs**:\n\n• 🥑 **Organic Avocados (Pack of 3)**: **$3.89** (Store Brand, Aisle 1) vs. **$4.99** (Whole Foods 365, Aisle 1). Saving: **$1.10** (22%).\n• 🥛 **Plain Greek Yogurt (0% Fat, 32oz)**: **$3.99** (Store Brand, Aisle 4) vs. **$6.49** (Chobani Name Brand, Aisle 4). Saving: **$2.50** (38%).\n• 🍯 **Organic Raw Honey (16oz)**: **$5.49** (Store Brand, Aisle 8) vs. **$8.99** (Imported Brand, Aisle 8). Saving: **$3.50** (39%).\n• 🐟 **Wild Caught Atlantic Salmon (per lb)**: **$12.99** (Aisle 12, on sale) vs. **$16.99** (Original). Saving: **$4.00** (24%).\n\nBy clicking **'Optimize Cart'**, I can instantly swap these high-priced items in your cart to save you an average of **34%** on your overall bill!",
  
  history: "📈 **6-Month Historical Pricing Index & Trends**:\n\n• 🥚 **Grade A Eggs (Dozen)**: Dropped by **12%** since February due to stabilized feed logistics. Current base price is **$2.89**.\n• 🥑 **Avocados**: Prices are seasonal. Currently at a 3-month low (down **15%**) due to summer harvest influxes. It's a great time to buy!\n• 🌾 **Organic Grains & Wheat**: Up slightly (+**4.8%** since March) due to global raw commodity indices. Buying in bulk in **Aisle 7** is recommended to hedge inflation.\n• 🥛 **Fresh Dairy Wall**: Very stable, maintaining a minor +**1.2%** index change over the past six months.\n\nSmartBasket tracks these trends daily so you can choose optimal buying windows!",
  
  nutrition: "🥗 **Smart Nutrition & Ingredient Swap Panel**:\n\n• **Protein Booster**: Swap high-sodium processed sausages (Health Score: 28) for **Wild Caught Salmon** (Health Score: 94) to get rich Omega-3 fatty acids.\n• **Sugar Reduction**: Swap strawberry-flavored yogurts (contains 18g added cane sugar) for **Plain Greek Yogurt** (Health Score: 94, 0g added sugar) and sweeten naturally with organic honey.\n• **High Fiber**: Add **Chia Seeds** (Aisle 7, 5g of prebiotic fiber per tbsp) to your morning oatmeal to optimize digestion and blood glucose responses.",
  
  budget: "📊 **Your Monthly Budget Analytics Summary**:\n\n• **Total spent this month**: **$287.43** of **$400.00** limit.\n• **Remaining balance**: **$112.57** (8.5 days left in current cycle).\n• **Price audits saved**: You have saved **$23.40** by utilizing AI-vetted brand substitutions this month alone!\n• **Optimized projection**: If you keep swapping to store brands, your projected spent for next month is only **$242.00**, saving you an extra **$45.00**!",
}

function getAIResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('location') || lower.includes('aisle') || lower.includes('where') || lower.includes('find') || lower.includes('avocado') || lower.includes('spinach') || lower.includes('salmon') || lower.includes('honey')) {
    return MOCK_RESPONSES.location
  }
  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('cheap') || lower.includes('save') || lower.includes('compare')) {
    return MOCK_RESPONSES.price
  }
  if (lower.includes('history') || lower.includes('trend') || lower.includes('past') || lower.includes('index') || lower.includes('egg') || lower.includes('inflation')) {
    return MOCK_RESPONSES.history
  }
  if (lower.includes('nutrition') || lower.includes('health') || lower.includes('fiber') || lower.includes('protein') || lower.includes('sugar') || lower.includes('diet') || lower.includes('calorie')) {
    return MOCK_RESPONSES.nutrition
  }
  if (lower.includes('budget') || lower.includes('limit') || lower.includes('spent') || lower.includes('month') || lower.includes('dollar')) {
    return MOCK_RESPONSES.budget
  }
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
    content: "👋 Hi! I'm **Basket AI**, your smart shopping co-pilot. I am fully equipped with supermarket coordinates, price matching records, and 6-month historical indices.\n\nAsk me anything like:\n\n• 📍 *'Where is the Greek yogurt located?'*\n• 💰 *'How much can I save by swapping brand-name oats?'*\n• 📈 *'Tell me the price trends of eggs and produce'*",
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

    // Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 800))

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
