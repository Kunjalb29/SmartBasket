import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Target, TrendingUp, Flame, Droplets, Apple, Plus, Bot } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts'
import { healthTrendData } from '@/data/mockData'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/Display'
import { formatCurrency } from '@/lib/utils'

const macroData = [
  { name: 'Protein', value: 88, goal: 120, color: '#06b6d4' },
  { name: 'Carbs', value: 210, goal: 250, color: '#7c3aed' },
  { name: 'Fat', value: 62, goal: 70, color: '#f59e0b' },
  { name: 'Fiber', value: 22, goal: 30, color: '#10b981' },
]

const COLORS = ['#06b6d4', '#7c3aed', '#f59e0b', '#10b981']

const vitamins = [
  { name: 'Vitamin D', value: 72, unit: 'IU', status: 'good' },
  { name: 'Vitamin C', value: 88, unit: 'mg', status: 'great' },
  { name: 'Vitamin B12', value: 45, unit: 'mcg', status: 'low' },
  { name: 'Iron', value: 65, unit: 'mg', status: 'good' },
  { name: 'Calcium', value: 82, unit: 'mg', status: 'good' },
  { name: 'Potassium', value: 58, unit: 'mg', status: 'low' },
]

const mealLog = [
  { meal: 'Breakfast', time: '7:30 AM', calories: 420, items: ['Oatmeal', 'Berries', 'Almond Butter'] },
  { meal: 'Lunch', time: '12:15 PM', calories: 680, items: ['Salmon', 'Spinach Salad', 'Quinoa'] },
  { meal: 'Snack', time: '3:00 PM', calories: 210, items: ['Greek Yogurt', 'Banana'] },
  { meal: 'Dinner', time: '7:00 PM', calories: 510, items: ['Chicken', 'Vegetables', 'Brown Rice'] },
]

export const NutritionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'goals'>('today')
  const totalCalories = mealLog.reduce((s, m) => s + m.calories, 0)
  const calorieGoal = 2000

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-100">Nutrition & Health</h1>
          <p className="text-slate-400 mt-1">AI-powered nutrition tracking and health insights</p>
        </div>
        <div className="flex gap-2">
          {(['today', 'week', 'goals'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${activeTab === tab ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-slate-200'}`}>{tab}</button>
          ))}
        </div>
      </motion.div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Flame, label: 'Calories Today', value: `${totalCalories}`, goal: `/ ${calorieGoal}`, color: 'amber', pct: (totalCalories / calorieGoal) * 100 },
          { icon: Droplets, label: 'Hydration', value: '6 / 8', goal: 'glasses', color: 'cyan', pct: 75 },
          { icon: Heart, label: 'Health Score', value: '78', goal: '/ 100', color: 'rose', pct: 78 },
          { icon: Target, label: 'Goals Met', value: '3', goal: '/ 5 today', color: 'emerald', pct: 60 },
        ].map((s, i) => {
          const Icon = s.icon
          const colMap: Record<string, string> = { amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20', cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20', rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20', emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' }
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
              <div className={`p-2.5 rounded-xl border w-fit mb-3 ${colMap[s.color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xl font-bold text-slate-100">{s.value} <span className="text-sm text-slate-400">{s.goal}</span></p>
              <p className="text-xs text-slate-400 mt-0.5 mb-2">{s.label}</p>
              <ProgressBar value={s.pct} color={s.color as any} size="sm" />
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calorie Chart */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-slate-200 font-display">Calorie & Nutrition Trends</h3>
            <Badge variant="violet">This Week</Badge>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(26,31,53,0.95)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
                <Bar dataKey="calories" name="Calories" fill="#7c3aed" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
                <Bar dataKey="protein" name="Protein" fill="#06b6d4" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Macro Split */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-slate-200 font-display mb-5">Today's Macros</h3>
          <div className="h-36 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={macroData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                  {macroData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v: any) => `${v}g`} contentStyle={{ background: 'rgba(26,31,53,0.95)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '12px', color: '#f1f5f9', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2.5">
            {macroData.map(m => (
              <div key={m.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{m.name}</span>
                  <span className="font-semibold text-slate-200">{m.value}g / {m.goal}g</span>
                </div>
                <ProgressBar value={(m.value / m.goal) * 100} size="sm" color={m.name === 'Protein' ? 'cyan' : m.name === 'Carbs' ? 'violet' : m.name === 'Fat' ? 'amber' : 'emerald'} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Meal Log */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-200 font-display">Today's Meals</h3>
            <button className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Log Meal
            </button>
          </div>
          <div className="space-y-3">
            {mealLog.map((meal, i) => (
              <motion.div key={meal.meal} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-600/20 flex items-center justify-center text-lg flex-shrink-0">
                  {meal.meal === 'Breakfast' ? '🌅' : meal.meal === 'Lunch' ? '☀️' : meal.meal === 'Snack' ? '🍎' : '🌙'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-200">{meal.meal}</p>
                    <span className="text-sm font-bold text-amber-400">{meal.calories} kcal</span>
                  </div>
                  <p className="text-xs text-slate-500">{meal.time} · {meal.items.join(', ')}</p>
                </div>
              </motion.div>
            ))}
            <div className="flex items-center justify-between p-3 rounded-xl bg-violet-500/[0.08] border border-violet-500/20">
              <span className="text-sm text-slate-300 font-medium">Total Today</span>
              <span className="text-sm font-bold text-violet-400">{totalCalories} / {calorieGoal} kcal</span>
            </div>
          </div>
        </div>

        {/* Vitamin Tracker + AI Tips */}
        <div className="space-y-4">
          <div className="glass-card p-6">
            <h3 className="font-semibold text-slate-200 font-display mb-4">Vitamin & Mineral Tracker</h3>
            <div className="space-y-3">
              {vitamins.map((v, i) => (
                <div key={v.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{v.name}</span>
                    <Badge variant={v.status === 'great' ? 'emerald' : v.status === 'good' ? 'cyan' : 'amber'} size="sm">{v.status}</Badge>
                  </div>
                  <ProgressBar value={v.value} color={v.status === 'great' ? 'emerald' : v.status === 'good' ? 'cyan' : 'amber'} size="sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5 border-violet-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-5 h-5 text-violet-400" />
              <h3 className="font-semibold text-slate-200">AI Health Tips</h3>
            </div>
            <div className="space-y-2">
              {[
                { icon: '💊', tip: 'You\'re low on Vitamin B12 — try adding eggs or nutritional yeast this week.' },
                { icon: '🥦', tip: 'Increase fiber intake by 8g — add broccoli or beans to dinner.' },
                { icon: '💧', tip: 'You\'re slightly dehydrated. Drink 2 more glasses of water today.' },
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-base flex-shrink-0">{t.icon}</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{t.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
