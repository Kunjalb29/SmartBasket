import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Tag, Truck, Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE, TAX_RATE } from '@/lib/constants'

interface CartSummaryProps {
  onCheckout?: () => void
  showCheckoutButton?: boolean
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  onCheckout,
  showCheckoutButton = true,
}) => {
  const { getSubtotal, getDiscount, getTotalItems } = useCartStore()
  const subtotal = getSubtotal()
  const discount = getDiscount()
  const tax = subtotal * TAX_RATE
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + tax + delivery
  const itemCount = getTotalItems()
  const freeDeliveryShortfall = FREE_DELIVERY_THRESHOLD - subtotal

  return (
    <div className="glass-card p-5 space-y-4">
      <h3 className="font-semibold text-slate-200 font-display">Order Summary</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-400">
          <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-400">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Savings
            </span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-slate-400">
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" />
            Delivery
          </span>
          <span>
            {delivery === 0 ? (
              <span className="text-emerald-400 font-medium">Free</span>
            ) : (
              formatCurrency(delivery)
            )}
          </span>
        </div>

        <div className="flex justify-between text-slate-400">
          <span>Estimated Tax (8%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
      </div>

      {freeDeliveryShortfall > 0 && (
        <div className="text-xs p-3 rounded-xl" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', color: '#34d399' }}>
          <span className="font-medium">Add {formatCurrency(freeDeliveryShortfall)} more</span> for free delivery! 🚚
        </div>
      )}

      <div className="border-t border-white/[0.06] pt-3">
        <div className="flex justify-between font-bold text-slate-100">
          <span>Total</span>
          <span className="text-emerald-400 text-lg">{formatCurrency(total)}</span>
        </div>
      </div>

      {showCheckoutButton && (
        <Button
          fullWidth
          size="lg"
          icon={<ShoppingBag className="w-5 h-5" />}
          onClick={onCheckout}
          className="mt-2"
        >
          Proceed to Checkout
        </Button>
      )}

      <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
        <Shield className="w-3 h-3" />
        256-bit SSL encryption · PCI compliant
      </p>

      <div className="text-center">
        <Link to="/products" className="text-xs text-violet-400 hover:text-violet-300 flex items-center justify-center gap-1">
          Continue Shopping <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
