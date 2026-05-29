import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Home, Search, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'rgb(10,14,26)' }}>
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl bg-violet-600/10 animate-float" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full blur-3xl bg-cyan-600/8 animate-float" style={{ animationDelay: '1s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md relative"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl font-display gradient-text">SmartBasket</span>
        </div>

        {/* 404 Display */}
        <div className="relative mb-6">
          <p className="text-8xl font-bold font-display gradient-text opacity-20 select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass-card p-4 border-violet-500/20">
              <p className="text-6xl">🛒</p>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold font-display text-slate-100 mb-3">
          Oops! Page not found
        </h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Looks like this page wandered off the shelves. Let's get you back to shopping!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button icon={<Home className="w-4 h-4" />} size="lg">Go to Home</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="secondary" icon={<ArrowLeft className="w-4 h-4" />} size="lg">
              Dashboard
            </Button>
          </Link>
        </div>

        {/* Easter Egg */}
        <p className="text-xs text-slate-600 mt-8">
          PS: Our AI is also confused about this page 🤖
        </p>
      </motion.div>
    </div>
  )
}
