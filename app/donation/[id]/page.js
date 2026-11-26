'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Button from '../../../components/Button'
import { donations } from '../../../lib/data'
import { formatDate } from '../../../lib/utils'

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) return setTimeLeft({ expired: true })
      setTimeLeft({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
        expired: false,
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

export default function DonationDetailPage() {
  const { id } = useParams()
  const donation = donations.find(d => d.id === id) || donations[0]
  const countdown = useCountdown(donation.expiryTime)
  const [requested, setRequested] = useState(false)

  const isUrgent = countdown.hours < 4 && !countdown.expired

  const categoryEmojis = {
    'Vegetables': '🥦', 'Fruits': '🍎', 'Cooked Food': '🍛',
    'Bakery': '🥐', 'Dairy': '🥛', 'Grains & Pulses': '🌾',
    'Packaged Food': '📦',
  }
  const emoji = categoryEmojis[donation.category] || '🍽️'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/ngo" className="hover:text-primary-600 transition-colors">Donations</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{donation.foodName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Main content */}
          <div className="lg:col-span-3 space-y-5">
            {/* Food image */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-primary-50 via-green-50 to-emerald-100 flex items-center justify-center relative">
                <span className="text-8xl drop-shadow-lg">{emoji}</span>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize ${
                    donation.status === 'available' ? 'bg-primary-500 text-white' :
                    donation.status === 'requested' ? 'bg-alert-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {donation.status}
                  </span>
                  {isUrgent && (
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-500 text-white animate-pulse">
                      ⚠️ Expiring Soon
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-gray-600 font-medium">
                    {donation.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h1 className="text-2xl font-display font-bold text-gray-900 mb-4">{donation.foodName}</h1>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  {[
                    { icon: '📦', label: 'Quantity', value: donation.quantity },
                    { icon: '🏪', label: 'Donated by', value: donation.donor },
                    { icon: '📍', label: 'Location', value: donation.location },
                    { icon: '📅', label: 'Posted', value: formatDate(donation.createdAt) },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                        <span>{icon}</span>
                        <span className="font-medium uppercase tracking-wide">{label}</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{donation.description}</p>
                </div>
              </div>
            </div>

            {/* Location map */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-display font-semibold text-gray-900">Pickup Location</h3>
              </div>
              <div className="h-44 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
                <div className="text-center z-10">
                  <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center text-lg mx-auto mb-2 shadow-lg">📍</div>
                  <p className="text-sm font-semibold text-gray-800">{donation.location}</p>
                  {donation.distance && (
                    <p className="text-xs text-primary-600 font-medium mt-1">{donation.distance} from your location</p>
                  )}
                </div>
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <button className="text-sm text-primary-600 font-medium hover:underline">
                  🗺 Open in Google Maps
                </button>
              </div>
            </div>
          </div>

          {/* Right: Action panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Countdown */}
            <div className={`rounded-2xl p-5 border shadow-soft ${
              countdown.expired ? 'bg-gray-50 border-gray-200' :
              isUrgent ? 'bg-red-50 border-red-100' :
              'bg-white border-gray-100'
            }`}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${
                countdown.expired ? 'text-gray-400' : isUrgent ? 'text-red-500' : 'text-gray-500'
              }`}>
                {countdown.expired ? 'Expired' : isUrgent ? '⚠️ Expiring Soon' : '⏱ Time Remaining'}
              </p>
              {!countdown.expired ? (
                <div className="flex gap-3">
                  {[
                    { val: countdown.hours, label: 'Hours' },
                    { val: countdown.minutes, label: 'Mins' },
                    { val: countdown.seconds, label: 'Secs' },
                  ].map(({ val, label }) => (
                    <div key={label} className="flex-1 text-center">
                      <div className={`text-3xl font-display font-bold tabular-nums ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                        {String(val ?? 0).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">This donation has expired.</p>
              )}
            </div>

            {/* Request action */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5 space-y-4">
              <h3 className="font-display font-semibold text-gray-900">Request Pickup</h3>

              {requested ? (
                <div className="text-center py-4">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="font-semibold text-gray-900 text-sm">Pickup Requested!</p>
                  <p className="text-xs text-gray-500 mt-1">The donor has been notified. Coordinate pickup details.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500">
                    By requesting, you confirm your NGO will pick up this donation within the specified time window.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={donation.status !== 'available' || countdown.expired}
                    onClick={() => setRequested(true)}
                  >
                    🤝 Request Pickup
                  </Button>
                  {donation.status !== 'available' && (
                    <p className="text-xs text-center text-gray-400">This donation is no longer available</p>
                  )}
                </>
              )}
            </div>

            {/* Donor info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-soft p-5">
              <h3 className="font-display font-semibold text-gray-900 mb-3">Donor Info</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-xl">🏪</div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{donation.donor}</p>
                  <p className="text-xs text-gray-400">Verified Donor</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full w-fit">
                <span>⭐</span> Top Donor — 15+ donations
              </div>
            </div>

            {/* Share */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
              <span className="text-sm text-gray-600 font-medium">Share this donation</span>
              <div className="flex gap-2">
                {['📋', '💬', '📤'].map((icon, i) => (
                  <button key={i} className="w-8 h-8 rounded-xl bg-white border border-gray-200 hover:border-primary-300 hover:text-primary-600 transition-all text-sm flex items-center justify-center">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
