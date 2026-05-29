import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scan, Camera, Upload, X, CheckCircle, Bot, ShoppingCart, AlertTriangle, Zap } from 'lucide-react'
import { products } from '@/data/mockData'
import { useCartStore } from '@/store/cartStore'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar, RatingStars } from '@/components/ui/Display'
import { formatCurrency, getHealthLabel } from '@/lib/utils'
import toast from 'react-hot-toast'

const mockScanResults = [
  { barcode: '012345678901', product: products[0] },
  { barcode: '012345678903', product: products[2] },
  { barcode: '012345678904', product: products[3] },
]

export const ScannerPage: React.FC = () => {
  const [scanning, setScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scannedProduct, setScannedProduct] = useState<typeof products[0] | null>(null)
  const [scanHistory, setScanHistory] = useState<typeof products>([])
  const { addItem } = useCartStore()
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const startScan = () => {
    setScanning(true)
    setScannedProduct(null)
    setScanProgress(0)
    intervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current)
          setScanning(false)
          // Pick random mock result
          const result = mockScanResults[Math.floor(Math.random() * mockScanResults.length)]
          setScannedProduct(result.product)
          setScanHistory(prev => [result.product, ...prev.slice(0, 4)])
          return 100
        }
        return prev + 3
      })
    }, 60)
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const healthLabel = scannedProduct ? getHealthLabel(scannedProduct.healthScore) : null

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold font-display text-slate-100">Product Scanner</h1>
        <p className="text-slate-400 mt-1">Scan barcodes to get instant AI nutrition analysis and health scores</p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Scanner UI */}
        <div className="lg:col-span-3 space-y-4">
          {/* Camera Viewfinder */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-6 text-center">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Viewfinder Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 aspect-[4/3]">
                {/* Corner brackets */}
                {[['top-3 left-3', 'border-t border-l'], ['top-3 right-3', 'border-t border-r'], ['bottom-3 left-3', 'border-b border-l'], ['bottom-3 right-3', 'border-b border-r']].map(([pos, border], i) => (
                  <div key={i} className={`absolute ${pos} w-8 h-8 ${border} border-violet-500 rounded-sm`} />
                ))}

                {/* Camera Grid */}
                <div className="absolute inset-0 grid-pattern opacity-20" />

                {/* Scanner Line Animation */}
                {scanning && (
                  <motion.div
                    className="absolute left-6 right-6 h-0.5 z-10 rounded-full"
                    style={{ background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)', boxShadow: '0 0 10px rgba(6,182,212,0.8)' }}
                    animate={{ top: ['10%', '90%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {!scanning && !scannedProduct && (
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <p className="text-sm text-slate-500">Camera preview</p>
                      <p className="text-xs text-slate-600">Point at a barcode</p>
                    </div>
                  )}
                  {scanning && (
                    <div className="text-center">
                      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                        <Scan className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                      </motion.div>
                      <p className="text-sm text-cyan-400 font-semibold">Scanning...</p>
                      <p className="text-xs text-slate-500">{scanProgress}%</p>
                    </div>
                  )}
                  {!scanning && scannedProduct && (
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                      <p className="text-sm text-emerald-400 font-semibold">Product Found!</p>
                    </div>
                  )}
                </div>

                {/* AI Indicator */}
                {scanning && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} />
                    <span className="text-[10px] text-cyan-400 font-medium">AI Active</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {scanning && (
                <div className="mt-3">
                  <ProgressBar value={scanProgress} color="cyan" size="sm" />
                  <p className="text-xs text-slate-500 text-center mt-1">Analyzing product barcode...</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center mt-6">
              <Button
                onClick={startScan}
                disabled={scanning}
                icon={<Scan className="w-4 h-4" />}
                size="lg"
              >
                {scanning ? 'Scanning...' : 'Start Scan'}
              </Button>
              <Button variant="secondary" icon={<Upload className="w-4 h-4" />} size="lg">
                Upload Image
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-3">Mock scanner — press "Start Scan" to simulate a barcode scan</p>
          </motion.div>

          {/* Scan History */}
          {scanHistory.length > 0 && (
            <div className="glass-card p-5">
              <h3 className="font-semibold text-slate-200 mb-3 font-display">Recent Scans</h3>
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {scanHistory.map((p, i) => (
                  <div key={i} className="flex-shrink-0 w-24 text-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setScannedProduct(p)}>
                    <img src={p.thumbnail} alt={p.name} className="w-full h-16 object-cover rounded-xl mb-1" />
                    <p className="text-[10px] text-slate-400 truncate">{p.name}</p>
                    <p className="text-[10px] text-emerald-400 font-bold">{formatCurrency(p.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Result Panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!scannedProduct && !scanning ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card p-8 text-center">
                <Scan className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-400 mb-2">No product scanned yet</h3>
                <p className="text-sm text-slate-500">Start a scan to see AI-powered product analysis here</p>
                <div className="mt-6 space-y-2">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">What you'll get:</p>
                  {['Instant nutrition facts', 'AI health score', 'Allergen alerts', 'Better alternatives', 'Price comparison'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-slate-400">
                      <Zap className="w-3 h-3 text-violet-400" /> {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : scannedProduct ? (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-4">
                {/* Product Card */}
                <div className="glass-card overflow-hidden border-emerald-500/20">
                  <div className="relative h-40 bg-gradient-to-br from-violet-600/10 to-cyan-600/10">
                    <img src={scannedProduct.thumbnail} alt={scannedProduct.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-bold text-white">{scannedProduct.name}</h3>
                      <p className="text-xs text-slate-300">{scannedProduct.brand}</p>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="emerald">✅ Scanned</Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xl font-bold text-slate-100">{formatCurrency(scannedProduct.price)}</p>
                      <RatingStars rating={scannedProduct.rating} size="sm" showValue />
                    </div>

                    {/* Health Score */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-400">AI Health Score</span>
                        <span className="font-bold" style={{ color: healthLabel?.color }}>{healthLabel?.label}</span>
                      </div>
                      <ProgressBar
                        value={scannedProduct.healthScore}
                        color={scannedProduct.healthScore >= 80 ? 'emerald' : scannedProduct.healthScore >= 60 ? 'cyan' : 'amber'}
                        size="md"
                      />
                      <p className="text-xs text-right text-slate-400 mt-0.5">{scannedProduct.healthScore}/100</p>
                    </div>

                    {/* Quick Nutrition */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: 'Calories', value: `${scannedProduct.nutrition.calories}kcal` },
                        { label: 'Protein', value: `${scannedProduct.nutrition.protein}g` },
                        { label: 'Fiber', value: `${scannedProduct.nutrition.dietaryFiber}g` },
                      ].map(n => (
                        <div key={n.label} className="text-center p-2 rounded-lg bg-white/[0.04]">
                          <p className="text-xs font-bold text-slate-200">{n.value}</p>
                          <p className="text-[10px] text-slate-500">{n.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Allergen Alert */}
                    {scannedProduct.tags.includes('shellfish') && (
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-3">
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <p className="text-xs text-amber-400">Contains allergens — check your profile</p>
                      </div>
                    )}

                    <Button fullWidth icon={<ShoppingCart className="w-4 h-4" />} onClick={() => { addItem(scannedProduct); toast.success('Added to cart! 🛒') }}>
                      Add to Cart · {formatCurrency(scannedProduct.price)}
                    </Button>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="glass-card p-4 border-violet-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-semibold text-slate-200">AI Scan Analysis</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>✅ <strong>Health:</strong> {scannedProduct.healthScore >= 80 ? 'Excellent choice! Highly nutritious.' : 'Decent option with some considerations.'}</p>
                    <p>🔬 <strong>Ingredients:</strong> {scannedProduct.isOrganic ? 'Certified organic — no harmful pesticides.' : 'Conventional farming — standard quality.'}</p>
                    <p>💡 <strong>Tip:</strong> {scannedProduct.nutrition.protein > 10 ? 'Good protein source for your daily goals.' : 'Consider pairing with a protein source.'}</p>
                  </div>
                </div>

                <button onClick={() => { setScannedProduct(null); setScanProgress(0) }} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 border border-white/10 hover:border-white/20 transition-all text-sm">
                  <X className="w-4 h-4" /> Clear Result & Scan Again
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
