import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PageHeader } from '@/components/layout/PageHeader'
import { StatsCard } from '@/components/ui/StatsCard'
import { Tabs } from '@/components/ui/Tabs'
import { ProgressBar } from '@/components/ui/Display'
import { SmartBarChart } from '@/components/ui/BarChart'
import { SmartPieChart } from '@/components/ui/PieChart'
import { Activity, Apple, Flame, Droplets, Dumbbell, AlertTriangle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { products } from '@/data/mockData'

const tabs = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'This Week' },
  { id: 'cart', label: 'My Cart' },
]

const DAILY_VALUES = {
  calories: 2000,
  protein: 50,
  carbs: 275,
  fat: 78,
  fiber: 28,
  sodium: 2300,
  sugar: 50,
}

const macroData = [
  { name: 'Protein', value: 22, color: '#7c3aed' },
  { name: 'Carbs', value: 55, color: '#06b6d4' },
  { name: 'Fat', value: 23, color: '#f59e0b' },
]

const weekData = [
  { day: 'Mon', calories: 1820 },
  { day: 'Tue', calories: 2100 },
  { day: 'Wed', calories: 1950 },
  { day: 'Thu', calories: 2250 },
  { day: 'Fri', calories: 1780 },
  { day: 'Sat', calories: 2400 },
  { day: 'Sun', calories: 2050 },
]

export const NutritionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today')
  const { items } = useCartStore()

  // Calculate cart nutrition
  const cartNutrition = items.reduce((acc, item) => ({
    calories: acc.calories + (item.product.nutrition.calories * item.quantity),
    protein: acc.protein + (item.product.nutrition.protein * item.quantity),
    carbs: acc.carbs + (item.product.nutrition.totalCarbs * item.quantity),
    fat: acc.fat + (item.product.nutrition.totalFat * item.quantity),
    fiber: acc.fiber + (item.product.nutrition.dietaryFiber * item.quantity),
    sodium: acc.sodium + (item.product.nutrition.sodium * item.quantity),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 })

  const todayNutrition = { calories: 1680, protein: 78, carbs: 220, fat: 54, fiber: 22, sodium: 1840, sugar: 38 }

  const display = activeTab === 'cart' ? cartNutrition : todayNutrition

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <PageHeader
        title="Nutrition Tracker"
        description="Monitor your daily nutrition intake and cart health"
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-6" />

      {/* Calorie Overview */}
      <div className="glass-card p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-slate-200 font-display">Calories</h3>
            <p className="text-xs text-slate-500">Daily goal: {DAILY_VALUES.calories.toLocaleString()} kcal</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold font-display text-slate-100">{display.calories.toLocaleString()}</p>
            <p className="text-sm text-slate-400">kcal consumed</p>
          </div>
        </div>
        <ProgressBar value={(display.calories / DAILY_VALUES.calories) * 100} size="lg" color={display.calories > DAILY_VALUES.calories ? 'rose' : 'emerald'} />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0</span>
          <span>{display.calories > DAILY_VALUES.calories ? `${display.calories - DAILY_VALUES.calories} over goal` : `${DAILY_VALUES.calories - display.calories} remaining`}</span>
          <span>{DAILY_VALUES.calories.toLocaleString()}</span>
        </div>
      </div>

      {/* Macro Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Protein', value: display.protein, goal: DAILY_VALUES.protein, unit: 'g', color: '#7c3aed', icon: <Dumbbell className="w-4 h-4" /> },
          { label: 'Carbs', value: display.carbs, goal: DAILY_VALUES.carbs, unit: 'g', color: '#06b6d4', icon: <Apple className="w-4 h-4" /> },
          { label: 'Fat', value: display.fat, goal: DAILY_VALUES.fat, unit: 'g', color: '#f59e0b', icon: <Droplets className="w-4 h-4" /> },
          { label: 'Fiber', value: display.fiber, goal: DAILY_VALUES.fiber, unit: 'g', color: '#10b981', icon: <Activity className="w-4 h-4" /> },
        ].map(m => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">{m.label}</span>
              <div className="p-1.5 rounded-lg" style={{ background: `${m.color}20`, color: m.color }}>{m.icon}</div>
            </div>
            <p className="text-xl font-bold text-slate-200 mb-0.5">{m.value.toFixed(0)}<span className="text-sm text-slate-400 ml-1">{m.unit}</span></p>
            <p className="text-xs text-slate-500 mb-2">Goal: {m.goal}{m.unit}</p>
            <ProgressBar value={(m.value / m.goal) * 100} size="sm" color={m.value / m.goal > 1 ? 'rose' : m.value / m.goal > 0.7 ? 'emerald' : 'amber'} />
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="glass-card p-5">
          <h3 className="font-semibold text-slate-200 font-display mb-1">Macro Distribution</h3>
          <p className="text-xs text-slate-500 mb-3">Today's macronutrient breakdown</p>
          <SmartPieChart data={macroData} height={220} showLegend />
        </div>
        <div className="glass-card p-5">
          <h3 className="font-semibold text-slate-200 font-display mb-1">Weekly Calories</h3>
          <p className="text-xs text-slate-500 mb-3">Daily calorie intake this week</p>
          <SmartBarChart
            data={weekData}
            dataKey="calories"
            nameKey="day"
            height={220}
            gradient
            formatTooltip={(v) => `${v} kcal`}
          />
        </div>
      </div>

      {/* Sodium Warning */}
      {display.sodium > DAILY_VALUES.sodium * 0.8 && (
        <div className="glass-card p-4 border-amber-500/20 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-400">High Sodium Alert</p>
            <p className="text-xs text-slate-400 mt-0.5">
              You're at {Math.round((display.sodium / DAILY_VALUES.sodium) * 100)}% of your daily sodium limit. Consider choosing low-sodium alternatives.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
