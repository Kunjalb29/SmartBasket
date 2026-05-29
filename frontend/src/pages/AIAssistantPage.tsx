import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, Trash2, Sparkles, Mic, Image, RefreshCw, BookOpen, TrendingUp, ShoppingCart, Heart } from 'lucide-react'
import { useAIStore } from '@/store/aiStore'
import { useCartStore } from '@/store/cartStore'
import { aiRecommendations, products } from '@/data/mockData'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { RatingStars } from '@/components/ui/Display'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import toast from 'react-hot-toast'

const QUICK_PROMPTS = [
  { icon: '🥗', text: "What should I eat for more fiber?", category: 'nutrition' },
  { icon: '💰', text: "Help me stay within my $100 weekly budget", category: 'budget' },
  { icon: '🛒', text: "Build me a healthy grocery list for the week", category: 'shopping' },
  { icon: '📊', text: "Compare avocados vs. olive oil for healthy fats", category: 'compare' },
  { icon: '🏃', text: "Best pre-workout snacks from the catalog?", category: 'fitness' },
  { icon: '🌱', text: "Show me organic alternatives to my cart items", category: 'organic' },
]

const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const parts = content.split(/(\*\*[^*]+\*\*)/g)
  return (
    <span>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
          : <span key={i}>{part}</span>
      )}
    </span>
  )
}

export const AIAssistantPage: React.FC = () => {
  const { messages, isTyping, sendMessage, clearMessages } = useAIStore()
  const { addItem } = useCartStore()
  const [input, setInput] = React.useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return
    const msg = input.trim()
    setInput('')
    await sendMessage(msg)
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto h-[calc(100vh-4rem)] flex gap-6">
      {/* Left: Chat */}
      <div className="flex-1 flex flex-col glass-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-display text-slate-100">Basket AI</h1>
              <p className="text-xs text-emerald-400">Smart Shopping Assistant • Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="violet" dot>AI Powered</Badge>
            <Button variant="ghost" size="xs" icon={<RefreshCw className="w-3.5 h-3.5" />} onClick={clearMessages}>Reset</Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {messages.length <= 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-violet-400" />
              </div>
              <h2 className="text-lg font-bold font-display text-slate-200 mb-2">Ask me anything!</h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto">I can help with product recommendations, nutrition advice, budget planning, and more.</p>
            </motion.div>
          )}

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {msg.role === 'assistant' ? (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0 text-sm font-bold text-white">
                  You
                </div>
              )}
              <div className={`max-w-lg ${msg.role === 'assistant' ? 'chat-bubble-ai' : 'chat-bubble-user'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  <SimpleMarkdown content={msg.content} />
                </p>
                <p className={`text-[10px] mt-1.5 ${msg.role === 'assistant' ? 'text-slate-500' : 'text-white/50'}`}>
                  {formatRelativeTime(msg.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="chat-bubble-ai flex items-center gap-1 py-3">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
                <span className="text-xs text-slate-400 ml-1">AI is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-violet-400 transition-colors" title="Voice input">
              <Mic className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-violet-400 transition-colors" title="Image analysis">
              <Image className="w-4 h-4" />
            </button>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
              placeholder="Ask about nutrition, budget, products, or recipes..."
              className="flex-1 input-glass"
              disabled={isTyping}
            />
            <Button icon={<Send className="w-4 h-4" />} onClick={handleSend} disabled={!input.trim() || isTyping}>
              Send
            </Button>
          </div>
          <p className="text-[10px] text-slate-600 text-center mt-2">
            Basket AI provides smart suggestions based on your profile and shopping history
          </p>
        </div>
      </div>

      {/* Right Panel: Quick Actions & Recommendations */}
      <div className="w-72 space-y-4 overflow-y-auto no-scrollbar">
        {/* Quick Prompts */}
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" /> Quick Prompts
          </h3>
          <div className="space-y-2">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p.text}
                onClick={() => { setInput(p.text); inputRef.current?.focus() }}
                className="w-full text-left flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.05] hover:border-violet-500/20 transition-all"
              >
                <span className="text-base">{p.icon}</span>
                <span className="text-xs text-slate-300">{p.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Product Suggestions */}
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" /> AI Top Picks
          </h3>
          <div className="space-y-3">
            {aiRecommendations.slice(0, 3).map((rec) => (
              <div key={rec.id} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:border-violet-500/20 transition-all">
                <img src={rec.product.thumbnail} alt={rec.product.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-200 truncate">{rec.product.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{rec.reason}</p>
                  <p className="text-xs text-emerald-400 font-bold">{formatCurrency(rec.product.price)}</p>
                </div>
                <button onClick={() => { addItem(rec.product); toast.success('Added to cart!') }} className="w-7 h-7 rounded-lg bg-violet-500/20 hover:bg-violet-500/40 text-violet-400 flex items-center justify-center">
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className="glass-card p-4">
          <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" /> What I can do
          </h3>
          <div className="space-y-1.5">
            {[
              { icon: '🥗', text: 'Nutrition analysis' },
              { icon: '💰', text: 'Budget optimization' },
              { icon: '🛒', text: 'Smart grocery lists' },
              { icon: '📊', text: 'Product comparison' },
              { icon: '🌱', text: 'Healthy alternatives' },
              { icon: '🍳', text: 'Recipe suggestions' },
            ].map(c => (
              <div key={c.text} className="flex items-center gap-2 text-xs text-slate-400">
                <span>{c.icon}</span>{c.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
