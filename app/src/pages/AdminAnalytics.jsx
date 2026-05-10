const STATS = [
  { label: 'Total Users', value: '12,847', change: '+12%', icon: 'group', color: 'bg-primary' },
  { label: 'Active Trips', value: '3,291', change: '+8%', icon: 'flight_takeoff', color: 'bg-secondary' },
  { label: 'Destinations', value: '1,024', change: '+15%', icon: 'location_on', color: 'bg-tertiary' },
  { label: 'Revenue', value: '$84.2K', change: '+22%', icon: 'payments', color: 'bg-primary-container' },
]

const TOP_DEST = [
  { city: 'Paris', country: 'France', trips: 842, pct: 85 },
  { city: 'Tokyo', country: 'Japan', trips: 721, pct: 72 },
  { city: 'London', country: 'UK', trips: 654, pct: 65 },
  { city: 'Santorini', country: 'Greece', trips: 589, pct: 59 },
  { city: 'Bali', country: 'Indonesia', trips: 512, pct: 51 },
]

const RECENT = [
  { user: 'Sarah M.', action: 'Created trip "Kyoto Cherry Blossom"', time: '2 min ago' },
  { user: 'Alex K.', action: 'Shared itinerary with 3 friends', time: '15 min ago' },
  { user: 'Maria G.', action: 'Completed packing checklist', time: '1 hour ago' },
  { user: 'James L.', action: 'Added 5 activities to Tokyo trip', time: '2 hours ago' },
]

export default function AdminAnalytics() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="font-heading text-3xl font-bold text-on-surface mb-2">Admin Analytics</h2>
        <p className="text-on-surface-variant font-body text-lg">Platform overview and insights</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STATS.map(stat => (
          <div key={stat.label} className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <span className="material-symbols-outlined text-white">{stat.icon}</span>
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
            </div>
            <p className="font-heading text-3xl font-bold text-on-surface">{stat.value}</p>
            <p className="text-sm text-on-surface-variant mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Destinations */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
          <h3 className="font-heading text-xl font-semibold mb-6">Top Destinations</h3>
          <div className="space-y-4">
            {TOP_DEST.map((dest, i) => (
              <div key={dest.city} className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-heading text-sm font-bold text-primary">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-label text-sm font-semibold">{dest.city}, {dest.country}</span>
                    <span className="text-sm text-on-surface-variant">{dest.trips} trips</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{width: `${dest.pct}%`}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
          <h3 className="font-heading text-xl font-semibold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {RECENT.map((act, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-lg">person</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm"><strong>{act.user}</strong> {act.action}</p>
                  <p className="text-xs text-on-surface-variant mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="mt-8 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
        <h3 className="font-heading text-xl font-semibold mb-6">Monthly Trip Creation Trend</h3>
        <div className="flex items-end gap-3 h-48">
          {[35, 52, 48, 61, 55, 78, 82, 95, 88, 102, 110, 125].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-gradient-to-t from-primary to-primary-container rounded-t-lg transition-all hover:opacity-80" style={{height: `${(val / 125) * 100}%`}} />
              <span className="text-[10px] text-on-surface-variant">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
