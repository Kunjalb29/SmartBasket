import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, Sparkles, Mic, MicOff, RefreshCw, MessageSquare } from 'lucide-react'
import { ChatMessage } from '@/components/ai/ChatMessage'
import { SuggestionChips } from '@/components/ai/SuggestionChips'
import { Button } from '@/components/ui/Button'
import { useAIStore } from '@/store/aiStore'
import { PageHeader } from '@/components/layout/PageHeader'
import toast from 'react-hot-toast'

export const AssistantPage: React.FC = () => {
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const { messages, sendMessage, clearMessages, isTyping } = useAIStore()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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

  const handleSuggestion = (suggestion: string) => {
    const stripped = suggestion.replace(/^[\u{1F000}-\u{1FFFF}]\s/u, '')
    setInput(stripped)
    inputRef.current?.focus()
  }

  const handleVoice = () => {
    if (!isListening) {
      toast('Voice input coming soon! 🎤', { icon: '🔊' })
    }
    setIsListening(!isListening)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] p-6 max-w-4xl mx-auto">
      <PageHeader
        title="AI Shopping Assistant"
        description="Powered by SmartAI — ask anything about products, nutrition, or your cart"
        actions={
          messages.length > 0 ? (
            <button onClick={clearMessages} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Clear chat
            </button>
          ) : undefined
        }
      />

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-2 custom-scrollbar">
        {messages.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold font-display text-slate-200 mb-2">SmartAI is ready!</h2>
            <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
              Ask me anything about products, nutrition facts, meal planning, budget tracking, or get personalized recommendations.
            </p>
            <SuggestionChips
              suggestions={[
                'What\'s the healthiest product under $10?',
                'Build me a high-protein shopping list',
                'Compare avocado vs olive oil for heart health',
                'What\'s my cart health score and how to improve it?',
                'Find me organic products on sale today',
                'Plan a week of healthy meals under $50',
              ]}
              onSelect={handleSuggestion}
              label="Try these:"
            />
          </motion.div>
        ) : (
          messages.map((msg, i) => (
            <ChatMessage key={msg.id} message={msg} isLatest={i === messages.length - 1} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-card p-4 mt-4 border-violet-500/10">
        {messages.length > 0 && (
          <div className="mb-3">
            <SuggestionChips
              suggestions={['Tell me more', 'Any alternatives?', 'Add to cart', 'Show nutritional info']}
              onSelect={handleSuggestion}
              label="Quick replies:"
            />
          </div>
        )}

        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask SmartAI anything... (Enter to send, Shift+Enter for new line)"
              rows={1}
              className="input-glass w-full resize-none text-sm pr-10"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-1">
              <button onClick={handleVoice} className={`p-1 rounded transition-colors ${isListening ? 'text-rose-400' : 'text-slate-500 hover:text-slate-300'}`}>
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            icon={<Send className="w-4 h-4" />}
            size="md"
          >
            Send
          </Button>
        </div>

        <div className="flex items-center justify-between mt-2 text-xs text-slate-600">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-violet-500" />
            SmartAI v2.0 · Context-aware · Nutrition-trained
          </div>
          <span>Enter ↵ to send</span>
        </div>
      </div>
    </div>
  )
}
