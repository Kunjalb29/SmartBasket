import React, { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Trash2, Sparkles, Minimize2 } from 'lucide-react'
import { useAIStore } from '@/store/aiStore'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'

// Simple markdown renderer without the external library (fallback)
const SimpleMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const parts = content.split(/(\*\*[^*]+\*\*)/g)
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

const TypingIndicator: React.FC = () => (
  <div className="flex items-start gap-2.5">
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
      <Bot className="w-3.5 h-3.5 text-white" />
    </div>
    <div className="chat-bubble-ai flex items-center gap-1">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  </div>
)

const QUICK_SUGGESTIONS = [
  "What's healthy for dinner?",
  "Show budget tips",
  "Compare avocados",
  "Check my calories",
]

export const FloatingChatbot: React.FC = () => {
  const { messages, isOpen, isTyping, sendMessage, toggleChat, clearMessages } = useAIStore()
  const [input, setInput] = React.useState('')
  const [minimized, setMinimized] = React.useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && !minimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, minimized, isTyping])

  useEffect(() => {
    if (isOpen && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, minimized])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return
    const msg = input.trim()
    setInput('')
    await sendMessage(msg)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden border border-violet-500/30"
            style={{
              background: 'rgba(15, 20, 35, 0.97)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.15)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">Basket AI</p>
                  <p className="text-[10px] text-emerald-400">Online • Always ready</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearMessages}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setMinimized(!minimized)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!minimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                >
                  {/* Messages */}
                  <div className="h-72 overflow-y-auto p-4 space-y-3 no-scrollbar">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn('flex items-start gap-2.5', msg.role === 'user' && 'flex-row-reverse')}
                      >
                        {msg.role === 'assistant' && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                        <div className={msg.role === 'assistant' ? 'chat-bubble-ai' : 'chat-bubble-user'}>
                          <p className="text-xs leading-relaxed whitespace-pre-wrap">
                            <SimpleMarkdown content={msg.content} />
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Suggestions */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                      {QUICK_SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => sendMessage(s)}
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything about products, health..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-violet-500/50 transition-colors"
                        disabled={isTyping}
                      />
                      <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        className="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[9px] text-slate-600 text-center mt-2">
                      Powered by SmartBasket AI • Mock responses
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={toggleChat}
        className="fab"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: isOpen ? '0 8px 32px rgba(124,58,237,0.7)' : '0 8px 32px rgba(124,58,237,0.5)' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90 }} animate={{ rotate: 0 }} exit={{ rotate: -90 }}>
              <Sparkles className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
