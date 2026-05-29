import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '../store/uiStore'
import {
  Zap, Bot, ShoppingCart, Heart, BarChart3, Scan,
  Star, ArrowRight, CheckCircle, Shield, Truck, Clock,
  TrendingUp, Brain, Sparkles, ChevronRight, Play, Users, Package,
  ChevronLeft, Calendar, Plus, Check, Info, ArrowUpRight, Award, Lock,
  Sun, Moon
} from 'lucide-react'

// Tab definitions for smooth scrolling or action triggers
const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Cart Optimizer', href: '#optimizer' },
  { name: 'Testimonials', href: '#testimonials' },
]

export const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useUIStore()

  // SEO Setup
  useEffect(() => {
    document.title = "SmartBasket - AI-Powered Smart Grocery shopping & Nutrition Tracker"
  }, [])

  // Interactive Calorie Diary States (Browser Mockup)
  const [breakfastItems, setBreakfastItems] = useState([
    { id: 'item-1', name: 'Greek Yogurt, Plain, 0% Fat', weight: '227g', calories: 100, checked: true },
    { id: 'item-2', name: 'Banana, raw', weight: '1 medium (118g)', calories: 89, checked: true },
    { id: 'item-3', name: 'Organic Raw Honey', weight: '1 tbsp (21g)', calories: 64, checked: false },
    { id: 'item-4', name: 'Chia Seeds', weight: '1 tbsp (12g)', calories: 60, checked: false }
  ])

  // Calculate calories based on checked state
  const goalCalories = 2000
  const baseEaten = 1324
  const activeEaten = baseEaten + breakfastItems
    .filter(item => item.checked)
    .reduce((sum, item) => sum + item.calories, 0)
  const remainingCalories = goalCalories - activeEaten

  const toggleBreakfastItem = (id: string) => {
    setBreakfastItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  // Before/After Cart Optimizer Slider States
  const [sliderPos, setSliderPos] = useState(50)
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return
    const rect = sliderContainerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }

  const handleMouseDown = () => {
    isDragging.current = true
  }

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return
      handleSliderMove(e.clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return
      if (e.touches.length > 0) {
        handleSliderMove(e.touches[0].clientX)
      }
    }

    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchend', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchend', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // Testimonials Slider/Carousel State
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const sliderTestimonials = [
    { name: 'Sarah Chen', role: 'Fitness Coach', rating: 5, text: 'SmartBasket completely changed how I shop. The AI health scoring helped me cut down on processed foods and saved me $80 last month!', tag: 'Saved $80/mo' },
    { name: 'Marcus Williams', role: 'Software Engineer', rating: 5, text: "The nutrition tracking is insane. I just scan products and instantly know if they fit my macros. It's like having a dietitian in my pocket.", tag: 'Macro Tracker' },
    { name: 'Priya Patel', role: 'Mom of 3', rating: 5, text: 'Managing grocery budgets for a family of 5 was chaos. SmartBasket\'s AI recommendations and budget tracking saved us $200/month!', tag: 'Saved $200/mo' },
    { name: 'Jake Torres', role: 'Nutritionist', rating: 5, text: 'I recommend SmartBasket to all my clients. The product health scores are accurate, and the AI meal planning is genuinely helpful.', tag: 'Dietitian Approved' }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % sliderTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + sliderTestimonials.length) % sliderTestimonials.length)
  }

  return (
    <div className="min-h-screen bg-base text-primary overflow-x-hidden selection:bg-emerald-500/20 selection:text-white">
      
      {/* Dynamic Background Glow Layer */}
      <div className="absolute top-0 inset-x-0 h-[1000px] bg-gradient-to-b from-emerald-950/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[800px] -left-[200px] w-[500px] h-[500px] rounded-full blur-[160px] bg-emerald-900/10 dark:bg-emerald-900/10 light:bg-emerald-500/5 pointer-events-none" />
      <div className="absolute top-[1600px] -right-[200px] w-[600px] h-[600px] rounded-full blur-[200px] bg-emerald-800/8 dark:bg-emerald-800/8 light:bg-emerald-500/3 pointer-events-none" />

      {/* ============ NAVIGATION ============ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] dark:border-white/[0.05] border-black/[0.05]" style={{ background: 'rgba(var(--bg-base), 0.85)', backdropFilter: 'blur(24px)' }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl font-display tracking-tight text-primary">
              Smart<span className="text-emerald-500">Basket</span>
            </span>
          </Link>

          {/* Navigation Links with pill hover effects */}
          <div className="hidden md:flex items-center gap-1.5 bg-black/[0.03] dark:bg-white/[0.03] p-1.5 rounded-full border border-black/[0.05] dark:border-white/[0.05]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm text-secondary hover:text-primary rounded-full hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-4">
            
            {/* Elegant Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              id="theme-toggle-btn"
              className="w-10 h-10 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] text-slate-400 hover:text-slate-200 dark:hover:text-white flex items-center justify-center transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-emerald-400" /> : <Moon className="w-5 h-5 text-emerald-600" />}
            </button>

            <Link to="/login" id="nav-btn-signin" className="text-sm font-semibold text-secondary hover:text-primary transition-colors px-4 py-2">
              Sign in
            </Link>
            <Link 
              to="/signup" 
              id="nav-btn-getstarted"
              className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section className="relative pt-36 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
        
        {/* Decorative Grid Overlays */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-h-[800px] dot-pattern opacity-[0.06] pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Content (Left) */}
          <div className="lg:col-span-6 flex flex-col text-left">
            
            {/* Announcement Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-fit inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-semibold mb-8 hover:bg-emerald-500/10 transition-colors"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>100% Free Forever</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] mb-6 text-primary tracking-tight"
            >
              The shopping assistant that doesn't turn into a
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-300">
                subscription.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-secondary max-w-xl mb-10 leading-relaxed font-normal"
            >
              Track prices, nutrition, and budget using 300,000+ verified grocery items. Start in 30 seconds — no account, no credit card, no paywall.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link 
                to="/signup" 
                id="hero-btn-primary"
                className="btn-primary text-base px-8 py-4 font-bold rounded-xl flex items-center justify-center gap-2 group"
              >
                Start Shopping Smarter
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/login" 
                id="hero-btn-demo"
                className="btn-secondary text-base px-8 py-4 font-bold rounded-xl flex items-center justify-center gap-2 text-primary border-white/10 dark:border-white/10 bg-white/[0.02] dark:bg-white/[0.02] hover:bg-white/[0.06] dark:hover:bg-white/[0.06]"
              >
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                Watch Demo
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-500 font-medium"
            >
              {['No credit card required', 'Immediate value', '10,000+ happy shoppers', 'GDPR secure'].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Interactive Browser Preview Mockup (Right) */}
          <div className="lg:col-span-6 relative">
            
            {/* Custom Background Glow */}
            <div className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 blur-2xl opacity-70 pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative rounded-[2rem] border border-black/[0.08] dark:border-white/[0.08] bg-card shadow-2xl overflow-hidden p-6"
            >
              
              {/* Browser Window Header Controls */}
              <div className="flex items-center justify-between pb-6 border-b border-black/[0.04] dark:border-white/[0.04] mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80 block" />
                  <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80 block" />
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 block" />
                </div>
                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] rounded-lg px-6 py-1.5 text-xs text-slate-500 font-mono tracking-tight flex items-center justify-center">
                  smartbasket.ai/diary
                </div>
                <div className="w-12 h-2" />
              </div>

              {/* Mock App Content */}
              <div className="space-y-6">
                
                {/* Diary Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block mb-1">TODAY</span>
                    <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                      Friday, May 29
                      <Calendar className="w-4 h-4 text-emerald-400" />
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 font-medium block">Remaining</span>
                    <span className="text-2xl font-black text-emerald-400 font-mono">
                      {remainingCalories} <span className="text-xs font-semibold">cal</span>
                    </span>
                  </div>
                </div>

                {/* Calorie Stats Card */}
                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] rounded-2xl p-4">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-2.5">
                    <span className="font-semibold">{activeEaten} cal eaten</span>
                    <span className="text-slate-500 font-medium">Goal: {goalCalories} cal</span>
                  </div>
                  
                  {/* Custom Progress Bar */}
                  <div className="w-full h-3 bg-black/[0.04] dark:bg-white/[0.04] rounded-full overflow-hidden mb-5">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                      animate={{ width: `${Math.min(100, (activeEaten / goalCalories) * 100)}%` }}
                      transition={{ type: 'spring', stiffness: 60 }}
                    />
                  </div>

                  {/* Macro Progress Rings */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'Protein', g: '112g', barColor: 'bg-sky-400', progress: '75%' },
                      { name: 'Carbs', g: '148g', barColor: 'bg-amber-400', progress: '62%' },
                      { name: 'Fat', g: '52g', barColor: 'bg-rose-400', progress: '48%' }
                    ].map((m) => (
                      <div key={m.name} className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.03] dark:border-white/[0.03] rounded-xl p-3 text-center">
                        <span className="text-[10px] text-slate-500 font-bold block mb-1">{m.name}</span>
                        <span className="text-sm font-bold text-primary block mb-2">{m.g}</span>
                        <div className="w-full h-1 bg-black/[0.04] dark:bg-white/[0.04] rounded-full overflow-hidden">
                          <div className={`h-full ${m.barColor} rounded-full`} style={{ width: m.progress }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Breakfast Section (Interactive Checklist) */}
                <div>
                  <span className="text-xs text-slate-500 font-bold tracking-wider uppercase block mb-3">BREAKFAST</span>
                  <div className="space-y-2">
                    {breakfastItems.map((item) => (
                      <div 
                        key={item.id}
                        id={`breakfast-item-${item.id}`}
                        onClick={() => toggleBreakfastItem(item.id)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                          item.checked 
                            ? 'bg-emerald-500/[0.03] border-emerald-500/20' 
                            : 'bg-black/[0.01] dark:bg-white/[0.01] border-black/[0.04] dark:border-white/[0.04] hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all duration-200 ${
                            item.checked 
                              ? 'bg-emerald-500 border-emerald-500 text-black' 
                              : 'border-black/10 dark:border-white/10'
                          }`}>
                            {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <span className={`text-sm font-bold block transition-all ${
                              item.checked ? 'text-slate-200 dark:text-slate-200 light:text-slate-700' : 'text-slate-400'
                            }`}>
                              {item.name}
                            </span>
                            <span className="text-[11px] text-slate-500 block mt-0.5">{item.weight}</span>
                          </div>
                        </div>
                        <span className={`text-sm font-mono font-bold ${
                          item.checked ? 'text-emerald-400' : 'text-slate-500'
                        }`}>
                          {item.calories} cal
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Widget 1: Health Score */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-card border border-black/[0.06] dark:border-white/[0.06] shadow-xl rounded-2xl p-4 flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">HEALTH SCORE</span>
                  <span className="text-lg font-black text-primary">94/100</span>
                </div>
              </motion.div>

              {/* Floating Widget 2: Budget Saved */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-8 -left-6 bg-card border border-black/[0.06] dark:border-white/[0.06] shadow-xl rounded-2xl p-4 flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block">BUDGET SAVED</span>
                  <span className="text-lg font-black text-emerald-400">$124<span className="text-xs font-semibold text-slate-400">/mo</span></span>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ "THREE MOMENTS" FEATURES SECTION ============ */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="rounded-[2.5rem] bg-surface border border-black/[0.04] dark:border-white/[0.04] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 grid-pattern opacity-[0.03] pointer-events-none" />

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 relative">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest block mb-4">THE EXPERIENCE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-primary mb-6 tracking-tight">
              Three moments that change everything.
            </h2>
            <p className="text-secondary text-lg leading-relaxed">
              These aren't features. They're the moments when the numbers turn into decisions.
            </p>
          </div>

          {/* Stacked Moments */}
          <div className="space-y-8 relative">
            
            {/* Moment 1 */}
            <div className="bg-card border border-black/[0.04] dark:border-white/[0.04] rounded-3xl p-8 grid md:grid-cols-12 gap-8 items-center hover:border-emerald-500/20 transition-all duration-300">
              <div className="md:col-span-1 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold font-display text-lg">
                  1
                </span>
              </div>
              <div className="md:col-span-8 space-y-3">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">THE CALORIE BLIND SPOT</span>
                <h3 className="text-xl md:text-2xl font-extrabold text-primary">
                  “I barely ate today. Why am I over my calories?”
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  You log the day and find out your lunch salad dressing was 280 cal, the oat milk latte was 340, and the “light snack” was 220. You weren't overeating on purpose — you were flying blind. Now you're not.
                </p>
              </div>
              <div className="md:col-span-3 flex justify-start md:justify-end">
                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-4 w-full md:max-w-[200px] text-center">
                  <span className="text-[28px] font-black text-emerald-400 block font-mono">840</span>
                  <span className="text-[11px] text-slate-500 font-bold block uppercase mt-1">hidden calories found</span>
                </div>
              </div>
            </div>

            {/* Moment 2 */}
            <div className="bg-card border border-black/[0.04] dark:border-white/[0.04] rounded-3xl p-8 grid md:grid-cols-12 gap-8 items-center hover:border-emerald-500/20 transition-all duration-300">
              <div className="md:col-span-1 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold font-display text-lg">
                  2
                </span>
              </div>
              <div className="md:col-span-8 space-y-3">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">THE PROTEIN GAP</span>
                <h3 className="text-xl md:text-2xl font-extrabold text-primary">
                  “I work out but I'm not building muscle. Why?”
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  You check your protein log. Your target is 150g. You're averaging 72g. You were leaving gains on the table every single day — not because you weren't trying, but because you couldn't see the gap.
                </p>
              </div>
              <div className="md:col-span-3 flex justify-start md:justify-end">
                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-4 w-full md:max-w-[200px] text-center">
                  <span className="text-[28px] font-black text-sky-400 block font-mono">78g</span>
                  <span className="text-[11px] text-slate-500 font-bold block uppercase mt-1">protein left behind</span>
                </div>
              </div>
            </div>

            {/* Moment 3 */}
            <div className="bg-card border border-black/[0.04] dark:border-white/[0.04] rounded-3xl p-8 grid md:grid-cols-12 gap-8 items-center hover:border-emerald-500/20 transition-all duration-300">
              <div className="md:col-span-1 flex items-center justify-center">
                <span className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold font-display text-lg">
                  3
                </span>
              </div>
              <div className="md:col-span-8 space-y-3">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest block">THE BUDGET LEAK</span>
                <h3 className="text-xl md:text-2xl font-extrabold text-primary">
                  “I buy high quality, but my grocery bill is soaring. Why?”
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  Our price matching logs show that name-brand alternatives are priced 40% higher than equivalent premium store brands. By shopping with SmartBasket AI optimized switches, you unlock immediate, non-compromised discount pricing.
                </p>
              </div>
              <div className="md:col-span-3 flex justify-start md:justify-end">
                <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] rounded-2xl p-4 w-full md:max-w-[200px] text-center">
                  <span className="text-[28px] font-black text-emerald-400 block font-mono">$124</span>
                  <span className="text-[11px] text-slate-500 font-bold block uppercase mt-1">saved on groceries</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ BEFORE/AFTER CART OPTIMIZER SLIDER SECTION ============ */}
      <section id="optimizer" className="py-24 px-6 md:px-12 bg-[#0c0d10]/40 dark:bg-[#0c0d10]/40 light:bg-black/[0.01] border-y border-black/[0.03] dark:border-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest block mb-4">AI CART OPTIMIZER</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-primary mb-6 tracking-tight">
              Slide to optimize. Watch prices drop.
            </h2>
            <p className="text-secondary text-lg leading-relaxed">
              Drag the divider below to compare a typical brand-heavy grocery basket with our AI-optimized Healthy & Economical SmartBasket alternative.
            </p>
          </div>

          {/* Interactive Split Comparison Card */}
          <div 
            ref={sliderContainerRef}
            className="relative h-[560px] w-full max-w-5xl mx-auto rounded-[2rem] border border-black/[0.08] dark:border-white/[0.08] overflow-hidden select-none bg-card shadow-2xl"
          >
            
            {/* Split Screen 1: Standard Cart (Left side, underneath the top-clipped layered item) */}
            <div className="absolute inset-0 w-full h-full p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-[#1c1416] dark:from-[#1c1416] light:from-rose-50/50 via-card to-card text-primary">
              <div>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <span className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider block w-fit mb-2">
                      Standard Basket
                    </span>
                    <h4 className="text-2xl font-extrabold text-primary">Unoptimized Cart</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Estimated Cost</span>
                    <span className="text-3xl font-black text-rose-500 font-mono">$142.50</span>
                  </div>
                </div>

                {/* List of unoptimized items */}
                <div className="space-y-3.5 max-w-lg">
                  {[
                    { name: 'Kellogg\'s Organic Cereal Oats', price: '$8.49', issue: 'Overpriced Name Brand', health: 'Health Score: 45' },
                    { name: 'Sugary Strawberry Whole Milk Yogurt', price: '$6.99', issue: 'High Fructose Corn Syrup', health: 'Health Score: 38' },
                    { name: 'Premium Imported Salted Butter', price: '$9.99', issue: 'Expensive Import Markup', health: 'Health Score: 40' },
                    { name: 'Name Brand Extra Virgin Olive Oil (500ml)', price: '$18.99', issue: 'High Brand Premium', health: 'Health Score: 78' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-rose-950/5 border border-rose-500/10 rounded-xl p-4 flex justify-between items-center">
                      <div>
                        <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200 block">{item.name}</span>
                        <div className="flex gap-4 mt-1">
                          <span className="text-[10px] text-rose-400 font-bold">{item.issue}</span>
                          <span className="text-[10px] text-slate-500 font-semibold">{item.health}</span>
                        </div>
                      </div>
                      <span className="text-sm font-mono font-extrabold text-rose-400">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-6 border-t border-black/[0.04] dark:border-white/[0.04] pt-4">
                <Info className="w-4 h-4 text-rose-500" />
                <span>Low nutrition scores, high marketing markup, zero price audits.</span>
              </div>
            </div>

            {/* Split Screen 2: Smart Cart (Right side, styled as top layer with slider-controlled width clipPath) */}
            <div 
              className="absolute inset-0 w-full h-full p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-[#0f1f18] dark:from-[#0f1f18] light:from-emerald-50/50 via-card to-card text-primary overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <div className="min-w-[900px]"> {/* Keeps items layout fixed from shifting when slider drags */}
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider block w-fit mb-2">
                      Smart Basket
                    </span>
                    <h4 className="text-2xl font-extrabold text-primary">AI-Optimized Alternative</h4>
                  </div>
                  <div className="text-right pr-[400px]"> {/* Prevent overflow content cover */}
                    <span className="text-xs text-slate-500 block">Optimized Cost</span>
                    <span className="text-3xl font-black text-emerald-400 font-mono">$94.20</span>
                  </div>
                </div>

                {/* List of optimized items */}
                <div className="space-y-3.5 max-w-lg">
                  {[
                    { name: 'Organic Store Brand Cereal Oats', price: '$4.29', benefit: 'Identical Ingredients', health: 'Health Score: 85' },
                    { name: 'Greek Plain Yogurt 0% Fat', price: '$3.99', benefit: 'Zero Added Sugar', health: 'Health Score: 94' },
                    { name: 'Grass-fed Domestic Butter', price: '$4.99', benefit: 'Premium Local Sourced', health: 'Health Score: 78' },
                    { name: 'Cold-pressed Store Organic Olive Oil (500ml)', price: '$10.99', benefit: 'Premium Quality, Zero Brand Markup', health: 'Health Score: 88' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-emerald-950/5 border border-emerald-500/10 rounded-xl p-4 flex justify-between items-center">
                      <div>
                        <span className="text-sm font-extrabold text-slate-700 dark:text-slate-200 block">{item.name}</span>
                        <div className="flex gap-4 mt-1">
                          <span className="text-[10px] text-emerald-400 font-bold">{item.benefit}</span>
                          <span className="text-[10px] text-slate-500 font-semibold">{item.health}</span>
                        </div>
                      </div>
                      <span className="text-sm font-mono font-extrabold text-emerald-400">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-6 border-t border-black/[0.04] dark:border-white/[0.04] pt-4">
                <Info className="w-4 h-4 text-emerald-400" />
                <span>Audited dietary profiles, certified source matching, overall budget cut of 34%.</span>
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div 
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              className="absolute top-0 bottom-0 w-1.5 bg-emerald-500 cursor-ew-resize z-30"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-emerald-500 border-4 border-[#121418] dark:border-[#121418] light:border-white flex items-center justify-center shadow-lg shadow-emerald-500/30 text-black font-extrabold">
                <span className="flex items-center gap-0.5 select-none drag-handle">
                  <ChevronLeft className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest block mb-4">FEATURES</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-primary mb-6 tracking-tight">
            Everything you need to shop brilliantly.
          </h2>
          <p className="text-secondary text-lg leading-relaxed">
            SmartBasket combines state-of-the-art AI filters, barcode scanners, and spend logs to automate healthy eating.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Brain, title: 'AI-Powered Recommendations', desc: 'Get personalized product alternatives based on allergies, custom macronutrient targets, and spending caps.' },
            { icon: Heart, title: 'Smart Nutrition Metrics', desc: 'Instantly view integrated health scores out of 100 for your entire shopping cart. Know exactly what you consume.' },
            { icon: BarChart3, title: 'Spending & Price Analytics', desc: 'Monitor your weekly bills with beautiful Recharts displays and receive alerts whenever your normal products drop in price.' },
            { icon: Scan, title: 'Camera Barcode Scanner', desc: 'Use your phone to scan labels. Read processed food content, additive alerts, sugar contents, and healthy swap recommendations.' },
            { icon: Bot, title: 'Smart AI Assistant Chat', desc: 'Talk to Basket AI about ingredients, recipe combinations, personalized budget limits, and smart cooking swaps.' },
            { icon: ShoppingCart, title: 'Cart Optimization System', desc: 'Automatically substitute low-scoring brand items for store alternatives to cut expenses without sacrificing quality.' }
          ].map((feat, idx) => {
            const Icon = feat.icon
            return (
              <div 
                key={idx}
                className="glass-card p-8 group border-black/[0.04] dark:border-white/[0.04] bg-card hover:border-emerald-500/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-3 font-display">{feat.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{feat.desc}</p>
                </div>
                <div className="mt-8 flex items-center gap-1 text-xs font-bold text-emerald-400 tracking-wider uppercase opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ============ HOW IT WORKS SECTION ============ */}
      <section id="how-it-works" className="py-24 px-6 md:px-12 bg-white/[0.01] dark:bg-white/[0.01] light:bg-black/[0.01] border-y border-black/[0.03] dark:border-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest block mb-4">METHODOLOGY</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-primary mb-6 tracking-tight">
              Get optimized in three steps.
            </h2>
          </div>

          {/* Simple Steps */}
          <div className="grid md:grid-cols-3 gap-12 relative">
            
            {/* Visual Linking Connector lines */}
            <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-px bg-black/[0.04] dark:bg-white/[0.04]" />

            {[
              { idx: '01', title: 'Set Dietary Profile', text: 'Select custom wellness milestones, budget metrics, and dietary sensitivities. Your personalized assistant handles rest.' },
              { idx: '02', title: 'Add or Scan Grocery Items', desc: 'Browse AI-vetted inventory catalogs or barcode scan local packages using your camera widget. View immediate outputs.' },
              { idx: '03', title: 'Audit & Substitute Cart', desc: 'Check the optimizer recommendation panel. Toggle healthy, discount matches to instantly optimize nutrition scores.' }
            ].map((step, index) => (
              <div key={index} className="text-center space-y-4 relative">
                <div className="w-16 h-16 rounded-2xl bg-card border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center text-emerald-400 font-black font-mono text-xl mx-auto shadow-md">
                  {step.idx}
                </div>
                <h3 className="text-lg font-bold text-primary font-display mt-4">{step.title}</h3>
                <p className="text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                  {step.text || step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SLIDING TESTIMONIALS SECTION ============ */}
      <section id="testimonials" className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest block mb-4">TESTIMONIALS</span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-primary tracking-tight">
            Loved by 2.4 million shoppers.
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-card border border-black/[0.05] dark:border-white/[0.05] rounded-[2rem] p-8 md:p-12 shadow-xl">
          
          {/* Layout Content wrapper with AnimatePresence for transitions */}
          <div className="min-h-[220px] flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                
                {/* Stars and tag */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    {Array(sliderTestimonials[currentTestimonial].rating).fill(0).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    ))}
                  </div>
                  <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {sliderTestimonials[currentTestimonial].tag}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-lg md:text-xl text-primary leading-relaxed font-medium font-display">
                  "{sliderTestimonials[currentTestimonial].text}"
                </p>

                {/* User Author info */}
                <div className="flex items-center gap-4 border-t border-black/[0.04] dark:border-white/[0.04] pt-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-400 border border-emerald-500/20 text-sm">
                    {sliderTestimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <span className="text-sm font-extrabold text-primary block">
                      {sliderTestimonials[currentTestimonial].name}
                    </span>
                    <span className="text-xs text-slate-500 block mt-0.5">
                      {sliderTestimonials[currentTestimonial].role}
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Slider Actions Indicator / Arrows */}
            <div className="flex justify-between items-center mt-10 pt-4 border-t border-black/[0.02] dark:border-white/[0.02]">
              
              {/* Indicator dots */}
              <div className="flex items-center gap-2">
                {sliderTestimonials.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentTestimonial === idx 
                        ? 'w-6 bg-emerald-500' 
                        : 'w-2 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Button triggers */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={prevTestimonial}
                  className="w-11 h-11 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] text-slate-400 hover:text-primary flex items-center justify-center transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="w-11 h-11 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.05] dark:border-white/[0.05] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] text-slate-400 hover:text-primary flex items-center justify-center transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============ PRICING SECTION ============ */}
      <section className="py-24 px-6 md:px-12 bg-white/[0.01] dark:bg-white/[0.01] light:bg-black/[0.01] border-y border-black/[0.03] dark:border-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest block mb-4">PRICING</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-primary mb-6 tracking-tight">
              One simple level. 100% Free.
            </h2>
            <p className="text-secondary text-lg leading-relaxed">
              We believe health analytics and cost-audits should be accessible to everyone. SmartBasket is open-source and free forever.
            </p>
          </div>

          {/* Single Simple Premium Plan Card */}
          <div className="max-w-xl mx-auto bg-card border border-black/[0.08] dark:border-white/[0.08] rounded-[2rem] p-8 md:p-12 shadow-2xl relative">
            <div className="absolute top-0 right-12 -translate-y-1/2 bg-emerald-500 text-black text-[11px] font-black uppercase px-4 py-1.5 rounded-full tracking-wider shadow-lg">
              Active Tier
            </div>
            
            <div className="text-center space-y-4 mb-8">
              <h4 className="text-2xl font-black font-display text-primary">Universal Plan</h4>
              <span className="text-xs text-slate-500 font-semibold block uppercase">Unlimited access, no restrictions</span>
              <div className="pt-4">
                <span className="text-5xl font-black font-mono text-emerald-400">$0</span>
                <span className="text-slate-500 text-sm font-semibold">/forever</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 border-y border-black/[0.04] dark:border-white/[0.04] py-8">
              {[
                'Unlimited AI barcode scanning and label translation',
                'Comprehensive macro diary and nutrient scoring',
                'Advanced budget analytics & store comparison algorithms',
                'Zustand powered local list caching',
                'Smart grocery cost-cut optimizer suggestions',
                'Real-time price drop notifications'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>

            <Link 
              to="/signup"
              id="pricing-btn-primary"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Get Started Instantly</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CALL-TO-ACTION (CTA) CARD ============ */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="glass-card border-black/[0.06] dark:border-white/[0.06] bg-card rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          
          {/* Glow effects inside CTA */}
          <div className="absolute inset-0 bg-aurora opacity-[0.08] pointer-events-none" />

          <div className="relative space-y-8 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-primary tracking-tight">
              Start shopping smarter today.
            </h2>
            <p className="text-secondary text-base leading-relaxed">
              Join 2.4 million health-conscious shoppers already bypassing subscription fees and inflated grocery receipts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                id="cta-btn-primary"
                className="btn-primary text-base px-8 py-4 font-bold rounded-xl flex items-center justify-center gap-2"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/login" 
                id="cta-btn-secondary"
                className="btn-secondary text-base px-8 py-4 font-bold rounded-xl flex items-center justify-center gap-2 text-primary border-white/10 dark:border-white/10 bg-white/[0.02] dark:bg-white/[0.02]"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-black/[0.05] dark:border-white/[0.05] py-16 px-6 md:px-12 bg-base">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-12">
            
            {/* Brand column */}
            <div className="col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2.5 group w-fit">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg text-primary font-display">SmartBasket</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                Open-source AI-powered retail tracking and nutritional diagnostics platform. Auditing expenditures, optimizing longevity.
              </p>
              <div className="flex items-center gap-2 pt-2">
                {['App Store', 'Play Store'].map((store) => (
                  <span key={store} className="px-3.5 py-1.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.06] dark:border-white/[0.06] text-xs font-bold text-slate-400">
                    {store}
                  </span>
                ))}
              </div>
            </div>

            {/* Link column 1 */}
            <div>
              <h5 className="text-sm font-extrabold text-primary uppercase tracking-widest mb-4">Product</h5>
              <ul className="space-y-2.5">
                {['Features', 'Optimizer', 'Barcode Scanner', 'API Access'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link column 2 */}
            <div>
              <h5 className="text-sm font-extrabold text-primary uppercase tracking-widest mb-4">Company</h5>
              <ul className="space-y-2.5">
                {['About Us', 'Health Blog', 'Careers', 'Open Source'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link column 3 */}
            <div>
              <h5 className="text-sm font-extrabold text-primary uppercase tracking-widest mb-4">Legal</h5>
              <ul className="space-y-2.5">
                {['Privacy Policy', 'Terms of Service', 'Cookie Audit', 'GDPR Specs'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom metadata */}
          <div className="border-t border-black/[0.04] dark:border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs text-slate-600">
              © {new Date().getFullYear()} SmartBasket Inc. Licensed under MIT Open Source.
            </span>
            <div className="flex items-center gap-6">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <a key={social} href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

        </div>
      </footer>

    </div>
  )
}
