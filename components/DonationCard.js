import Link from 'next/link'
import Button from './Button'
import { getTimeRemaining, getStatusColor } from '../lib/utils'

export default function DonationCard({ donation, showActions = false, showRequest = false }) {
  const expiry = getTimeRemaining(donation.expiryTime)
  const statusColor = getStatusColor(donation.status)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      {/* Food image placeholder */}
      <div className="h-36 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center relative">
        <span className="text-5xl">{getCategoryEmoji(donation.category)}</span>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColor}`}>
            {donation.status}
          </span>
        </div>
        {expiry.urgent && !expiry.expired && (
          <div className="absolute top-3 left-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-alert-500 text-white animate-pulse">
              Expiring Soon
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-gray-900 text-base leading-tight line-clamp-1">
            {donation.foodName}
          </h3>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
            {donation.category}
          </span>
        </div>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span>📦</span>
            <span>{donation.quantity}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span>📍</span>
            <span className="truncate">{donation.location}</span>
            {donation.distance && (
              <span className="text-xs text-primary-600 font-medium ml-auto shrink-0">{donation.distance}</span>
            )}
          </div>
          <div className={`flex items-center gap-1.5 text-sm font-medium ${expiry.urgent ? 'text-alert-600' : 'text-gray-600'}`}>
            <span>⏱</span>
            <span>{expiry.text}</span>
          </div>
          {donation.donor && (
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <span>🏪</span>
              <span>{donation.donor}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Link
            href={`/donation/${donation.id}`}
            className="flex-1 text-center text-sm py-2 px-3 rounded-xl border border-gray-200 hover:border-primary-300 hover:text-primary-600 text-gray-600 font-medium transition-all"
          >
            View Details
          </Link>
          {showRequest && donation.status === 'available' && (
            <Button variant="primary" size="sm" className="flex-1">
              Request
            </Button>
          )}
          {showActions && (
            <Button variant="ghost" size="sm">
              ✏️
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function getCategoryEmoji(category) {
  const map = {
    'Vegetables': '🥦',
    'Fruits': '🍎',
    'Cooked Food': '🍛',
    'Bakery': '🥐',
    'Dairy': '🥛',
    'Grains & Pulses': '🌾',
    'Packaged Food': '📦',
  }
  return map[category] || '🍽️'
}
