import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  Zap, Bot, ShoppingCart, Heart, BarChart3, Scan,
  Star, ArrowRight, CheckCircle, Shield, Truck, Clock,
  TrendingUp, Brain, Sparkles, ChevronRight, Play, Users, Package
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
}

// Animated counter hook
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = React.useState(0)
  const ref = useRef(false)
  const inView = useInView(useRef(null) as React.RefObject<Element>)

  useEffect(() => {
    if (inView && !ref.current) {
      ref.current = true
      let start = 0
      const step = target / (duration / 16)
      const timer = setInterval(() => {
        start += step
        if (start >= target) { setCount(target); clearInterval(timer) }
        else setCount(Math.floor(start))
      }, 16)
    }
  }, [inView, target, duration])

  return count
}

const features = [
  { icon: Brain, title: 'AI-Powered Recommendations', description: 'Get personalized product suggestions based on your health goals, preferences, and purchase history — powered by advanced ML.', color: 'violet', gradient: 'from-violet-600/20 to-violet-600/5' },
  { icon: Heart, title: 'Smart Nutrition Tracking', description: 'Analyze calories, macros, and micronutrients in real-time. Get health scores for every product and your entire cart.', color: 'rose', gradient: 'from-rose-600/20 to-rose-600/5' },
  { icon: BarChart3, title: 'Spending Analytics', description: 'Track your grocery budget with beautiful charts. Get AI insights to optimize spending and maximize savings.', color: 'cyan', gradient: 'from-cyan-600/20 to-cyan-600/5' },
  { icon: Scan, title: 'Product Scanner', description: 'Scan any barcode or product label with your camera. Instantly get nutrition facts, AI analysis, and healthier alternatives.', color: 'amber', gradient: 'from-amber-600/20 to-amber-600/5' },
  { icon: Bot, title: 'Smart AI Assistant', description: 'Chat with Basket AI about anything — recipes, nutrition advice, budget tips, product comparisons, and more.', color: 'violet', gradient: 'from-violet-600/20 to-violet-600/5' },
  { icon: ShoppingCart, title: 'Intelligent Cart Optimization', description: 'Your cart gets smarter as you shop. AI suggests substitutions, finds deals, and optimizes for health and budget.', color: 'emerald', gradient: 'from-emerald-600/20 to-emerald-600/5' },
]

const testimonials = [
  { name: 'Sarah Chen', role: 'Fitness Coach', avatar: 'SC', rating: 5, text: 'SmartBasket completely changed how I shop. The AI health scoring helped me cut down on processed foods and saved me $80 last month!', gradient: 'from-violet-600 to-cyan-600' },
  { name: 'Marcus Williams', role: 'Software Engineer', avatar: 'MW', rating: 5, text: "The nutrition tracking is insane. I just scan products and instantly know if they fit my macros. It's like having a dietitian in my pocket.", gradient: 'from-cyan-600 to-emerald-600' },
  { name: 'Priya Patel', role: 'Mom of 3', avatar: 'PP', rating: 5, text: 'Managing grocery budgets for a family of 5 was chaos. SmartBasket\'s AI recommendations and budget tracking saved us $200/month!', gradient: 'from-emerald-600 to-violet-600' },
  { name: 'Jake Torres', role: 'Nutritionist', avatar: 'JT', rating: 5, text: 'I recommend SmartBasket to all my clients. The product health scores are accurate, and the AI meal planning is genuinely helpful.', gradient: 'from-amber-600 to-rose-600' },
]

const pricingPlans = [
  { name: 'Free', price: 0, period: 'forever', description: 'Perfect for individual shoppers', color: 'slate', features: ['Basic AI recommendations (5/day)', 'Nutrition tracking', 'Product scanner (10/month)', 'Basic spending analytics', 'Standard support'] },
  { name: 'Pro', price: 9.99, period: 'month', description: 'For health-conscious households', color: 'violet', popular: true, features: ['Unlimited AI recommendations', 'Advanced nutrition dashboard', 'Unlimited product scanning', 'Full spending analytics', 'Smart cart optimization', 'AI meal planning', 'Priority support'] },
  { name: 'Family', price: 19.99, period: 'month', description: 'For families of up to 6 members', color: 'cyan', features: ['Everything in Pro', 'Up to 6 user profiles', 'Family budget tracker', 'Shared shopping lists', 'Family health dashboard', 'Custom dietary profiles', 'Dedicated support'] },
]

const stats = [
  { value: '2.4M+', label: 'Active Users', icon: Users },
  { value: '$47M', label: 'Saved by Users', icon: TrendingUp },
  { value: '8.2M+', label: 'Products Scanned', icon: Package },
  { value: '4.9★', label: 'App Store Rating', icon: Star },
]

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ============ NAVIGATION ============ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(10,14,26,0.9)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg font-display gradient-text">SmartBasket</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Pricing', 'Testimonials'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-xl hover:bg-white/5">
              Sign in
            </Link>
            <Link to="/signup" className="btn-primary text-sm px-5 py-2.5">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 bg-violet-600 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 bg-cyan-600 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl opacity-8 bg-emerald-600 animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Announcement Badge */}
          <motion.div {...fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Introducing SmartBasket AI v2.0 — Now with GPT-4 powered nutrition analysis</span>
            <ChevronRight className="w-4 h-4" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6"
          >
            Shop Smarter with
            <br />
            <span className="gradient-text">AI-Powered</span>
            <br />
            Intelligence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            SmartBasket combines AI recommendations, real-time nutrition tracking, and budget intelligence
            to transform how you shop — saving you time, money, and improving your health.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link to="/signup" className="btn-primary text-base px-8 py-4 group">
              Start Shopping Smarter
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="btn-secondary text-base px-8 py-4 group">
              <Play className="w-4 h-4" />
              Watch Demo
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
          >
            {['No credit card required', 'Free plan available', '10,000+ 5-star reviews', 'GDPR compliant'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {item}
              </span>
            ))}
          </motion.div>

          {/* Hero App Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-20 relative"
          >
            <div className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden border border-violet-500/20 shadow-2xl" style={{ background: 'rgba(26,31,53,0.9)' }}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              {/* Mock Dashboard Preview */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <div className="flex-1 mx-4 h-6 rounded-lg bg-white/5 flex items-center px-3">
                    <span className="text-xs text-slate-500">app.smartbasket.ai/dashboard</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Health Score', value: '78', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { label: 'This Month', value: '$287', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                    { label: 'Saved', value: '$43', color: 'text-violet-400', bg: 'bg-violet-500/10' },
                    { label: 'AI Score', value: '94', color: 'text-amber-400', bg: 'bg-amber-500/10' },
                  ].map((s) => (
                    <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center border border-white/5`}>
                      <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-[10px] text-slate-500">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Organic Avocado $5.99', 'Greek Yogurt $6.49', 'Wild Salmon $12.99'].map((p, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="w-full h-16 rounded-lg bg-gradient-to-br from-violet-600/20 to-cyan-600/20 mb-2" />
                      <p className="text-[10px] text-slate-300 font-medium">{p.split(' $')[0]}</p>
                      <p className="text-xs text-emerald-400 font-bold">${p.split('$')[1]}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(10,14,26)] via-transparent to-transparent pointer-events-none" style={{ top: '60%' }} />
            </div>
            {/* Glow under preview */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full blur-3xl bg-violet-600/20" />
          </motion.div>
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section className="py-16 border-y border-white/[0.06]" style={{ background: 'rgba(26,31,53,0.4)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <Icon className="w-6 h-6 text-violet-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold font-display gradient-text">{stat.value}</p>
                  <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-violet text-sm mb-4 inline-block">Features</span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
              Everything you need to shop
              <span className="gradient-text"> brilliantly</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              SmartBasket combines cutting-edge AI with beautiful design to create the ultimate smart shopping experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              const colorMap: Record<string, string> = {
                violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
                rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
                cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
                amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
              }
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 group hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className={`p-3 rounded-xl border w-fit mb-4 ${colorMap[feature.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-100 mb-2 font-display">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how-it-works" className="py-24 px-6" style={{ background: 'rgba(26,31,53,0.3)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-cyan text-sm mb-4 inline-block">How It Works</span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
              Get started in <span className="gradient-text-cyan">3 simple steps</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-px bg-gradient-to-r from-violet-500/50 to-cyan-500/50" />
            {[
              { step: '01', title: 'Create Your Profile', desc: 'Tell us your dietary preferences, health goals, allergies, and budget. Our AI personalizes everything instantly.', icon: '👤' },
              { step: '02', title: 'Shop & Scan Products', desc: 'Browse AI-curated recommendations, scan barcodes, or search for products. Every item gets an instant health score.', icon: '🛒' },
              { step: '03', title: 'Save & Stay Healthy', desc: 'Get AI optimized cart suggestions, track nutrition, monitor your budget, and keep getting smarter recommendations.', icon: '✨' },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/30 to-cyan-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-6 text-2xl">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-violet-500 tracking-widest mb-2 block">{step.step}</span>
                <h3 className="text-xl font-semibold text-slate-100 mb-3 font-display">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-emerald text-sm mb-4 inline-block">Testimonials</span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
              Loved by <span className="gradient-text">2.4 million</span> shoppers
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="py-24 px-6" style={{ background: 'rgba(26,31,53,0.4)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-amber text-sm mb-4 inline-block">Pricing</span>
            <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
              Simple, transparent <span className="gradient-text">pricing</span>
            </h2>
            <p className="text-slate-400 text-lg">Start free. Upgrade when you're ready.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-6 relative ${plan.popular ? 'border-violet-500/40 shadow-glow-violet' : ''}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-violet text-xs px-4 py-1">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold text-slate-100 font-display mb-1">{plan.name}</h3>
                <p className="text-xs text-slate-500 mb-4">{plan.description}</p>
                <div className="mb-6">
                  {plan.price === 0 ? (
                    <span className="text-3xl font-bold text-slate-100">Free</span>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold text-slate-100">${plan.price}</span>
                      <span className="text-slate-400 text-sm mb-1">/{plan.period}</span>
                    </div>
                  )}
                </div>
                <Link
                  to="/signup"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm mb-6 transition-all duration-300 ${
                    plan.popular
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                >
                  {plan.price === 0 ? 'Start Free' : 'Get Started'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 border-violet-500/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-aurora opacity-50" />
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl font-bold font-display mb-4">
                Start shopping smarter
                <span className="gradient-text"> today</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Join 2.4 million people who have transformed their shopping experience with SmartBasket AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup" className="btn-primary text-base px-8 py-4">
                  Create Free Account
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/login" className="btn-secondary text-base px-8 py-4">
                  Sign In
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-white/[0.06] py-12 px-6" style={{ background: 'rgba(10,14,26,0.8)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg font-display gradient-text">SmartBasket</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                AI-powered smart shopping platform that helps you shop healthier, save money, and make better food choices.
              </p>
              <div className="flex gap-2">
                {['🏬 App Store', '🤖 Play Store'].map((btn) => (
                  <span key={btn} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400">{btn}</span>
                ))}
              </div>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookie Policy', 'GDPR'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-slate-300 mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="section-divider mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">© 2024 SmartBasket Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {['🐦 Twitter', '💼 LinkedIn', '🐙 GitHub'].map((s) => (
                <a key={s} href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
