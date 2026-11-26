import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Button from '../../components/Button'
import { StatCard } from '../../components/Card'
import DonationCard from '../../components/DonationCard'
import { donorStats, donations } from '../../lib/data'
import { getStatusColor, formatDate } from '../../lib/utils'

export default function DonorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar role="donor" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-up">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Donor Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, Arjun 👋 — You're making a difference!</p>
          </div>
          <Button href="/donate" variant="primary" size="md" icon="➕">
            Create Donation
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon="🎁"
            label="Total Donations"
            value={donorStats.totalDonations}
            trend="+3 this week"
            color="primary"
          />
          <StatCard
            icon="⏳"
            label="Active Requests"
            value={donorStats.activeRequests}
            color="alert"
          />
          <StatCard
            icon="🌍"
            label="Food Saved"
            value={donorStats.foodSaved}
            trend="All time"
            color="blue"
          />
          <StatCard
            icon="❤️"
            label="Lives Impacted"
            value={donorStats.livesImpacted}
            trend="Est."
            color="purple"
          />
        </div>

        {/* Impact Banner */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-card">
          <div className="text-white">
            <p className="text-sm text-primary-100 font-medium">🏆 You're a Top Donor this month!</p>
            <p className="text-2xl font-display font-bold mt-1">Keep it up — 3 active donations</p>
          </div>
          <Button href="/donate" variant="secondary" size="md" icon="🚀">
            Donate More
          </Button>
        </div>

        {/* Donations list */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-display font-bold text-gray-900">Your Donations</h2>
          <div className="flex gap-2">
            {['All', 'Available', 'Requested', 'Completed'].map((filter) => (
              <button
                key={filter}
                className="text-xs px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-all font-medium"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table view for larger screens */}
        <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Food Item', 'Quantity', 'Location', 'Status', 'Created', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {donations.map((d) => {
                const sc = getStatusColor(d.status)
                return (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 text-sm">{d.foodName}</div>
                      <div className="text-xs text-gray-400">{d.category}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-[160px] truncate">{d.location}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${sc}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400">{formatDate(d.createdAt)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link href={`/donation/${d.id}`} className="text-xs text-primary-600 hover:underline font-medium">View</Link>
                        <button className="text-xs text-gray-400 hover:text-gray-600">Edit</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
          {donations.map((d) => (
            <DonationCard key={d.id} donation={d} showActions />
          ))}
        </div>
      </div>
    </div>
  )
}
