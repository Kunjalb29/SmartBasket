import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, User, Globe, GitBranch, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

const passwordChecks = [
  { label: 'At least 8 characters', fn: (p: string) => p.length >= 8 },
  { label: 'Contains uppercase letter', fn: (p: string) => /[A-Z]/.test(p) },
  { label: 'Contains number', fn: (p: string) => /\d/.test(p) },
]

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPass, setShowPass] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const { register, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((p) => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match")
      return
    }
    if (!agreed) {
      toast.error('Please agree to the terms')
      return
    }
    const success = await register(formData)
    if (success) {
      toast.success("Account created! Welcome to SmartBasket 🎉")
      navigate('/dashboard')
    } else {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'rgb(10,14,26)' }}>
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl bg-violet-600/10 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full blur-3xl bg-cyan-600/10 animate-float" style={{ animationDelay: '1s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl font-display gradient-text">SmartBasket</span>
          </Link>
          <h1 className="text-3xl font-bold font-display text-slate-100 mb-2">Create your account</h1>
          <p className="text-slate-400">Start shopping smarter — it's free forever</p>
        </div>

        <div className="glass-card p-8">
          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all">
              <Globe className="w-4 h-4" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition-all">
              <GitBranch className="w-4 h-4" />
              GitHub
            </button>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-slate-500">or with email</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Full name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={formData.name} onChange={update('name')} className="input-glass pl-10 w-full" placeholder="Alex Johnson" required />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={formData.email} onChange={update('email')} className="input-glass pl-10 w-full" placeholder="you@example.com" required />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type={showPass ? 'text' : 'password'} value={formData.password} onChange={update('password')} className="input-glass pl-10 pr-10 w-full" placeholder="Create a strong password" required />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2 space-y-1">
                  {passwordChecks.map((check) => (
                    <div key={check.label} className="flex items-center gap-2">
                      <CheckCircle className={`w-3 h-3 ${check.fn(formData.password) ? 'text-emerald-400' : 'text-slate-600'}`} />
                      <span className={`text-xs ${check.fn(formData.password) ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Confirm password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="password" value={formData.confirmPassword} onChange={update('confirmPassword')} className="input-glass pl-10 w-full" placeholder="Repeat your password" required />
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-rose-400 mt-1">Passwords don't match</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 rounded accent-violet-600" />
              <span className="text-sm text-slate-400">
                I agree to the{' '}
                <a href="#" className="text-violet-400 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-violet-400 hover:underline">Privacy Policy</a>
              </span>
            </label>

            <button type="submit" disabled={isLoading} className="w-full btn-primary py-3.5 text-base">
              {isLoading ? (
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-2 justify-center">
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
            Sign in →
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
