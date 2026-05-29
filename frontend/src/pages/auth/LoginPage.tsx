import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, Chrome, Github, Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('alex.johnson@example.com')
  const [password, setPassword] = useState('password123')
  const [showPass, setShowPass] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const { login, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login({ email, password, rememberMe })
    if (success) {
      toast.success('Welcome back! 👋')
      navigate('/dashboard')
    } else {
      toast.error('Invalid credentials. Try the prefilled values!')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0e1a 0%, #1a0a2e 50%, #0a1a2e 100%)' }}>
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full blur-3xl bg-violet-600/20 animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full blur-3xl bg-cyan-600/15 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="relative flex flex-col justify-between p-12 w-full">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl font-display gradient-text">SmartBasket</span>
          </Link>
          <div className="my-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Shopping
              </div>
              <h2 className="text-4xl font-bold font-display text-white mb-4 leading-tight">
                Shop smarter,<br />live healthier.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Join 2.4 million people using AI to make better food choices, track nutrition, and save money every shopping trip.
              </p>
              <div className="space-y-3">
                {[
                  { icon: '🤖', text: 'AI-powered recommendations tailored to you' },
                  { icon: '💰', text: 'Save an average of $47/month on groceries' },
                  { icon: '🥗', text: 'Track nutrition with smart health scores' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-slate-300">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="glass-card p-4 flex items-center gap-4">
            <div className="flex -space-x-2">
              {['SC', 'MW', 'PP', 'JT'].map((initials, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 border-2 border-slate-900 flex items-center justify-center text-xs text-white font-bold">
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">2.4M+ happy shoppers</p>
              <div className="flex items-center gap-1">
                {Array(5).fill(0).map((_, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
                <span className="text-xs text-slate-400 ml-1">4.9 average rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8" style={{ background: 'rgb(10,14,26)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="lg:hidden flex items-center justify-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl font-display gradient-text">SmartBasket</span>
            </div>
            <h1 className="text-3xl font-bold font-display text-slate-100 mb-2">Welcome back</h1>
            <p className="text-slate-400">Sign in to your SmartBasket account</p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all">
              <Chrome className="w-4 h-4" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all">
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-slate-500">or continue with email</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-glass pl-10 w-full"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glass pl-10 pr-10 w-full"
                  placeholder="Your password"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-violet-500/30 bg-transparent accent-violet-600" />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3.5 text-base"
            >
              {isLoading ? (
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Create one free →
            </Link>
          </p>

          <div className="mt-8 p-3 rounded-xl bg-violet-500/[0.08] border border-violet-500/20">
            <p className="text-xs text-violet-400 text-center">
              💡 <strong>Demo:</strong> Use the prefilled credentials to explore the full app!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
