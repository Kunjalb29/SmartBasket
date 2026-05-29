import React from 'react'
import { motion } from 'framer-motion'
import { Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Spinner } from '@/components/ui/Spinner'
import { formatDate } from '@/lib/formatters'
import type { AIMessage } from '@/types'
import toast from 'react-hot-toast'

interface ChatMessageProps {
  message: AIMessage
  isLatest?: boolean
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLatest }) => {
  const isUser = message.role === 'user'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    toast.success('Copied to clipboard')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
        isUser
          ? 'bg-gradient-to-br from-violet-600 to-purple-600'
          : 'bg-gradient-to-br from-cyan-600 to-blue-600'
      }`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'rounded-tr-sm text-white'
            : 'rounded-tl-sm text-slate-200'
        }`} style={isUser
          ? { background: 'linear-gradient(135deg, rgba(124,58,237,0.8), rgba(139,92,246,0.8))', border: '1px solid rgba(124,58,237,0.3)' }
          : { background: 'rgba(26,31,53,0.8)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }
        }>
          {message.isTyping ? (
            <div className="flex items-center gap-2">
              <Spinner variant="dots" size="xs" color="#06b6d4" />
              <span className="text-slate-400 text-xs">SmartAI is thinking...</span>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* Metadata & Actions */}
        {!message.isTyping && (
          <div className={`flex items-center gap-2 px-1 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="text-[10px] text-slate-600">
              {formatDate(message.timestamp, 'relative')}
            </span>
            {!isUser && (
              <div className="flex items-center gap-1">
                <button onClick={copyToClipboard} className="p-1 rounded-md text-slate-600 hover:text-slate-400 transition-colors">
                  <Copy className="w-3 h-3" />
                </button>
                <button className="p-1 rounded-md text-slate-600 hover:text-emerald-400 transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                </button>
                <button className="p-1 rounded-md text-slate-600 hover:text-rose-400 transition-colors">
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
