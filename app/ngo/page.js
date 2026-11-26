import Navbar from '../../components/Navbar'
import Button from '../../components/Button'
import { StatCard } from '../../components/Card'
import DonationCard from '../../components/DonationCard'
import { ngoStats, donations } from '../../lib/data'
import { getTimeRemaining } from '../../lib/utils'

const availableDonations = donations.filter(d => d.status === 'available')

export default function NgoDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="ngo" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">NGO Dashboard</h1>
            <p className="text-gray-500 mt-1">Hope Foundation — Find and request available food donations 🤝</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
              {availableDonations.length} donations available nearby
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📦" label="Total Received" value={ngoStats.totalReceived} color="primary" />
          <StatCard icon="🍽️" label="People Fed" value={ngoStats.peopleFed} trend="All time" color="alert" />
          <StatCard icon="🚗" label="Active Pickups" value={ngoStats.activePickups} color="blue" />
          <StatCard icon="🤝" label="Donor Partners" value={ngoStats.partneredDonors} color="purple" />
        </div>

        {/* Main layout: Map + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map placeholder */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-display font-bold text-gray-900">Nearby Donations Map</h2>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1.5 rounded-xl bg-primary-50 text-primary-700 font-medium border border-primary-100">5 km</button>
                <button className="text-xs px-3 py-1.5 rounded-xl bg-white text-gray-600 font-medium border border-gray-200 hover:border-gray-300">10 km</button>
                <button className="text-xs px-3 py-1.5 rounded-xl bg-white text-gray-600 font-medium border border-gray-200 hover:border-gray-300">20 km</button>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative h-[400px] bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
              {/* Grid lines to simulate map */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />

              {/* Simulated map pins */}
              {[
                { top: '35%', left: '45%', label: 'Green Café', urgent: false },
                { top: '55%', left: '30%', label: 'Spice Garden', urgent: false },
                { top: '25%', left: '65%', label: 'Sharma Events', urgent: false },
                { top: '70%', left: '55%', label: 'The Bread Box', urgent: true },
              ].map((pin) => (
                <div key={pin.label} className="absolute" style={{ top: pin.top, left: pin.left }}>
                  <div className={`relative group cursor-pointer`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg text-sm ${pin.urgent ? 'bg-alert-500' : 'bg-primary-500'} group-hover:scale-110 transition-transform`}>
                      🍽
                    </div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {pin.label}
                    </div>
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${pin.urgent ? 'bg-alert-500' : 'bg-primary-500'}`} />
                  </div>
                </div>
              ))}

              {/* You are here */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-30" />
              </div>

              <div className="absolute bottom-4 right-4 bg-white rounded-xl p-3 shadow-soft text-xs text-gray-500">
                📍 Koregaon Park, Pune
              </div>

              <div className="absolute top-4 left-4 bg-white rounded-xl p-3 shadow-soft">
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary-500 inline-block"/>Available</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-alert-500 inline-block"/>Urgent</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block"/>You</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Available donations list */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-display font-bold text-gray-900">Available Food</h2>
              <span className="text-xs bg-primary-100 text-primary-700 font-semibold px-2.5 py-1 rounded-full">{availableDonations.length}</span>
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-gray-50 max-h-[450px]">
              {availableDonations.map((d) => {
                const expiry = getTimeRemaining(d.expiryTime)
                return (
                  <div key={d.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">{d.foodName}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${expiry.urgent ? 'bg-alert-100 text-alert-600' : 'bg-gray-100 text-gray-600'}`}>
                        {expiry.text}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span>📦 {d.quantity}</span>
                      <span>📍 {d.distance}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3 truncate">{d.location}</p>
                    <div className="flex gap-2">
                      <Button href={`/donation/${d.id}`} variant="outline" size="sm" className="flex-1 !text-xs !py-1.5">
                        Details
                      </Button>
                      <Button variant="primary" size="sm" className="flex-1 !text-xs !py-1.5">
                        Request
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-400 text-center">Showing donations within 10km</p>
            </div>
          </div>
        </div>

        {/* All donations cards (mobile) */}
        <div className="mt-8 lg:hidden">
          <h2 className="text-xl font-display font-bold text-gray-900 mb-4">Available Food Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableDonations.map((d) => (
              <DonationCard key={d.id} donation={d} showRequest />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
