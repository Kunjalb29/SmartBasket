import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Barcode, CheckCircle, XCircle, Zap, ShoppingCart, Heart, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/Display'
import { PageHeader } from '@/components/layout/PageHeader'
import { useCartStore } from '@/store/cartStore'
import { products } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

type ScanState = 'idle' | 'scanning' | 'found' | 'notFound'

export const ScannerPage: React.FC = () => {
  const [scanState, setScanState] = useState<ScanState>('idle')
  const [barcodeInput, setBarcodeInput] = useState('')
  const [scannedProduct, setScannedProduct] = useState(products[0])
  const { addItem } = useCartStore()

  const simulateScan = () => {
    setScanState('scanning')
    setTimeout(() => {
      const random = products[Math.floor(Math.random() * products.length)]
      setScannedProduct(random)
      setScanState('found')
    }, 1500)
  }

  const handleBarcodeSearch = () => {
    if (!barcodeInput.trim()) return
    setScanState('scanning')
    setTimeout(() => {
      const found = products.find(p => p.barcode === barcodeInput)
      if (found) {
        setScannedProduct(found)
        setScanState('found')
      } else {
        // Simulate found for demo
        setScannedProduct(products[Math.floor(Math.random() * products.length)])
        setScanState('found')
      }
    }, 800)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <PageHeader
        title="Product Scanner"
        description="Scan barcodes to instantly get nutrition info, AI scores, and more"
      />

      {/* Camera Scanner Area */}
      <div className="glass-card p-6 mb-5">
        <div
          className="relative rounded-2xl overflow-hidden aspect-video mb-4 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.6)', border: '2px dashed rgba(124,58,237,0.3)' }}
        >
          {scanState === 'idle' && (
            <div className="text-center">
              <Camera className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">Camera preview would appear here</p>
              <p className="text-slate-600 text-xs mt-1">Point camera at a barcode to scan</p>
            </div>
          )}
          {scanState === 'scanning' && (
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <div className="absolute inset-0 rounded-full border-2 border-violet-500 animate-ping opacity-30" />
                <div className="absolute inset-2 rounded-full border-2 border-violet-400 animate-ping opacity-50" style={{ animationDelay: '0.2s' }} />
                <Barcode className="absolute inset-4 text-violet-400" />
              </div>
              <p className="text-violet-400 font-medium text-sm animate-pulse">Scanning...</p>
            </div>
          )}
          {scanState === 'found' && scannedProduct && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.05)' }}>
              <div className="text-center">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                <p className="text-emerald-400 font-semibold">Product Found!</p>
              </div>
            </div>
          )}
          {scanState === 'notFound' && (
            <div className="text-center">
              <XCircle className="w-12 h-12 text-rose-400 mx-auto mb-2" />
              <p className="text-rose-400 font-semibold">Product Not Found</p>
              <p className="text-slate-500 text-xs mt-1">Try entering the barcode manually</p>
            </div>
          )}

          {/* Scanner overlay lines */}
          {scanState === 'scanning' && (
            <div className="absolute inset-6 border-2 border-violet-500/30 rounded-lg">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-violet-500 rounded-tl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-violet-500 rounded-tr" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-violet-500 rounded-bl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-violet-500 rounded-br" />
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-violet-500/60 animate-scanner-line" />
            </div>
          )}
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={simulateScan}
          disabled={scanState === 'scanning'}
          icon={<Camera className="w-5 h-5" />}
        >
          {scanState === 'scanning' ? 'Scanning...' : 'Start Camera Scan'}
        </Button>
      </div>

      {/* Manual Barcode Input */}
      <div className="glass-card p-5 mb-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Or enter barcode manually</h3>
        <div className="flex gap-3">
          <input
            value={barcodeInput}
            onChange={e => setBarcodeInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleBarcodeSearch()}
            placeholder="Enter barcode (e.g. 012345678901)"
            className="input-glass flex-1 text-sm"
          />
          <Button onClick={handleBarcodeSearch} icon={<Search className="w-4 h-4" />}>Search</Button>
        </div>
      </div>

      {/* Scanned Product Result */}
      {scanState === 'found' && scannedProduct && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 border-emerald-500/20"
        >
          <div className="flex items-start gap-4 mb-4">
            <img src={scannedProduct.thumbnail} alt={scannedProduct.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-200 font-display">{scannedProduct.name}</h3>
              <p className="text-sm text-slate-400 mb-2">{scannedProduct.brand}</p>
              <div className="flex items-center gap-2 flex-wrap">
                {scannedProduct.isOrganic && <Badge variant="emerald" size="sm">Organic</Badge>}
                {scannedProduct.isVegan && <Badge variant="cyan" size="sm">Vegan</Badge>}
                {scannedProduct.isOnSale && <Badge variant="rose" size="sm">-{scannedProduct.discount}% OFF</Badge>}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-emerald-400">{formatCurrency(scannedProduct.price)}</p>
              <div className="flex items-center gap-1 mt-1 justify-end">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-sm font-bold text-amber-400">AI: {scannedProduct.aiScore}</span>
              </div>
            </div>
          </div>

          {/* Health Score */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-slate-400">Health Score</span>
              <span className="font-bold text-emerald-400">{scannedProduct.healthScore}/100</span>
            </div>
            <ProgressBar value={scannedProduct.healthScore} color={scannedProduct.healthScore >= 80 ? 'emerald' : 'cyan'} />
          </div>

          {/* Nutrition Quick View */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Cal', value: scannedProduct.nutrition.calories },
              { label: 'Protein', value: `${scannedProduct.nutrition.protein}g` },
              { label: 'Carbs', value: `${scannedProduct.nutrition.totalCarbs}g` },
              { label: 'Fat', value: `${scannedProduct.nutrition.totalFat}g` },
            ].map(n => (
              <div key={n.label} className="text-center p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-lg font-bold text-slate-200">{n.value}</p>
                <p className="text-[10px] text-slate-500">{n.label}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button fullWidth icon={<ShoppingCart className="w-4 h-4" />} onClick={() => { addItem(scannedProduct); toast.success('Added to cart!') }}>Add to Cart</Button>
            <button className="p-2.5 rounded-xl border transition-colors" style={{ borderColor: 'rgba(239,68,68,0.3)', color: '#f87171' }}>
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Recent Scans */}
      <div className="mt-5 glass-card p-5">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Recent Scans</h3>
        <div className="space-y-2">
          {products.slice(0, 3).map(p => (
            <button key={p.id} onClick={() => { setScannedProduct(p); setScanState('found') }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-left transition-colors">
              <img src={p.thumbnail} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-200">{p.name}</p>
                <p className="text-xs text-slate-500">{p.brand}</p>
              </div>
              <span className="text-sm font-bold text-emerald-400">{formatCurrency(p.price)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
