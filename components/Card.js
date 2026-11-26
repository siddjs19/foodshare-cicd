export default function Card({ children, className = '', hover = false, padding = 'p-6' }) {
  return (
    <div
      className={`
        bg-white rounded-2xl border border-gray-100 shadow-soft
        ${hover ? 'hover:shadow-hover hover:-translate-y-0.5 cursor-pointer' : ''}
        transition-all duration-200
        ${padding}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export function StatCard({ icon, label, value, trend, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary-50 text-primary-600',
    alert: 'bg-alert-50 text-alert-500',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <Card hover className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center text-xl`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      </div>
    </Card>
  )
}
