import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

interface SuggestionChipsProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
  label?: string
}

const DEFAULT_SUGGESTIONS = [
  '🥗 Healthy meal options under $5',
  '🏃 Best high-protein snacks',
  '💰 Best value organic products',
  '🍎 Top rated fresh produce',
  '🔥 Trending products this week',
  '💊 Vitamin & supplement recommendations',
  '🌿 Vegan alternatives to cheese',
  '💪 Keto-friendly breakfast ideas',
]

export const SuggestionChips: React.FC<SuggestionChipsProps> = ({
  suggestions = DEFAULT_SUGGESTIONS,
  onSelect,
  label = 'Try asking:',
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <Sparkles className="w-3 h-3 text-violet-400" />
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(suggestion)}
            className="text-xs px-3 py-1.5 rounded-full text-slate-300 hover:text-violet-300 transition-all duration-200"
            style={{
              background: 'rgba(124,58,237,0.06)',
              border: '1px solid rgba(124,58,237,0.15)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.15)'
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.06)'
              e.currentTarget.style.borderColor = 'rgba(124,58,237,0.15)'
            }}
          >
            {suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
