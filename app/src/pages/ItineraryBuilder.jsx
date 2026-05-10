import { Link } from 'react-router-dom'

const STOPS = [
  {
    id: 1, city: 'Paris, France', days: '3 Days', dates: 'June 12 - June 15, 2024', color: 'bg-primary',
    activities: [
      { icon: 'museum', name: 'Louvre Museum Guided Tour', time: '10:00 AM', cost: '$65.00 est.' },
      { icon: 'restaurant', name: 'Dinner at Le Jules Verne', time: '08:30 PM', cost: '$200.00 est.' },
    ]
  },
  {
    id: 2, city: 'Nice, France', days: '4 Days', dates: 'June 15 - June 19, 2024', color: 'bg-secondary',
    activities: []
  },
]

const INSIGHTS = ['Eiffel Tower Night View', 'Nice Flower Market', 'Seine River Cruise']

export default function ItineraryBuilder() {
  return (
    <div>
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <nav className="flex items-center gap-2 mb-4 text-on-surface-variant">
            <Link to="/trips" className="font-label text-sm font-semibold">My Trips</Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="font-label text-sm font-semibold text-primary">New Itinerary</span>
          </nav>
          <h2 className="font-display text-3xl font-bold mb-2">European Summer Escape</h2>
          <p className="text-on-surface-variant font-body">Planning a 14-day adventure through the Mediterranean coast.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl border border-outline font-label text-sm font-semibold text-primary hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined">share</span> Share
          </button>
          <button className="px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-label text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg">
            <span className="material-symbols-outlined">save</span> Save Trip
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline Builder */}
        <div className="lg:col-span-8 relative">
          <div className="absolute left-6 top-8 bottom-0 w-1 timeline-line opacity-20 rounded-full hidden md:block" />
          <div className="space-y-10">
            {STOPS.map(stop => (
              <div key={stop.id} className="relative pl-0 md:pl-16 group">
                <div className={`absolute left-4 top-2 w-5 h-5 rounded-full ${stop.color} border-4 border-surface ring-4 ring-primary-container/20 hidden md:block z-10`} />
                <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/30" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex gap-4">
                      <span className="material-symbols-outlined text-on-surface-variant cursor-grab active:cursor-grabbing hover:text-primary transition-colors mt-1">drag_indicator</span>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-heading text-2xl font-semibold">{stop.city}</h3>
                          <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-label font-semibold">{stop.days}</span>
                        </div>
                        <p className="text-on-surface-variant font-label text-sm font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">calendar_month</span> {stop.dates}
                        </p>
                      </div>
                    </div>
                    <button className="text-error hover:bg-error/10 p-2 rounded-lg transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  {stop.activities.length > 0 ? (
                    <div className="space-y-3 mb-6">
                      {stop.activities.map((act, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-surface-bright rounded-lg border border-outline-variant/20 hover:border-primary/30 transition-all">
                          <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined filled text-primary">{act.icon}</span>
                            <div>
                              <p className="font-label text-sm font-semibold">{act.name}</p>
                              <p className="text-xs text-on-surface-variant">{act.time} • {act.cost}</p>
                            </div>
                          </div>
                          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">edit</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <button className="w-full py-8 rounded-lg border-2 border-dashed border-outline-variant text-on-surface-variant font-label text-sm font-semibold hover:border-primary hover:text-primary hover:bg-primary-container/5 transition-all flex flex-col items-center justify-center gap-2">
                      <span className="material-symbols-outlined text-3xl">map</span>
                      <span>No activities added yet</span>
                      <span className="text-xs font-normal">Plan your daily adventures here</span>
                    </button>
                  )}
                  {stop.activities.length > 0 && (
                    <button className="w-full py-3 rounded-lg border-2 border-dashed border-outline-variant text-on-surface-variant font-label text-sm font-semibold hover:border-primary hover:text-primary hover:bg-primary-container/5 transition-all flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">add_circle</span> Add Activity
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Add Stop */}
            <div className="relative pl-0 md:pl-16">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-outline-variant border-4 border-surface hidden md:block z-10" />
              <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-heading text-xl font-semibold shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined">add_location_alt</span> Add Stop
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          {/* Map Preview */}
          <div className="rounded-2xl overflow-hidden h-64 shadow-lg border border-outline-variant/30 relative">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGfZkM5VRKfYZcimmsNEwPG8pgxkj1gJHgD9lnPFSyhcDRKbAzTe1rffA3TKBmaAUkHEQ-8KcLQlbSYb1qk09bKvp3UxtwuAJXHegfUT4WlSmtM_4EaqlAf9gpbccX9su1OBxdbhCmjl6-tV9y7gdU43Apm0wqamGxGPdw5Gu5IAYMpEzhm4FbEnYzLoMZFirnCT0UyvEHkW32nYSYLW2m2w4VPrSl5roj1GFsE8X9CRvvCSowbGtyfFz5mJCZXj4Fekb02b6KVXU" alt="Route Map" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-md rounded-full text-xs font-label font-semibold shadow-sm">620km Total Travel</span>
            </div>
          </div>

          {/* Budget Summary */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
            <h4 className="font-heading text-2xl font-semibold mb-6">Trip Estimates</h4>
            <div className="space-y-4">
              {[['Activities', '$265.00'], ['Accommodation', '$1,240.00'], ['Transport', '$410.00']].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center">
                  <span className="text-on-surface-variant">{k}</span>
                  <span className="font-label text-sm font-semibold">{v}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                <span className="font-heading font-semibold">Total Budget</span>
                <span className="font-heading font-semibold text-primary">$1,915.00</span>
              </div>
            </div>
            <div className="mt-8">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-label font-semibold uppercase tracking-wider text-on-surface-variant">Budget Usage</span>
                <span className="text-xs font-label font-semibold">64%</span>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary-container" style={{width: '64%'}} />
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <h5 className="font-label text-sm font-semibold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">auto_awesome</span> Traveloop Insights
            </h5>
            <p className="text-sm text-on-surface-variant mb-4">Based on your stops, we recommend these activities:</p>
            <div className="flex flex-wrap gap-2">
              {INSIGHTS.map(ins => (
                <span key={ins} className="px-3 py-1.5 bg-surface rounded-lg text-xs font-label font-semibold border border-outline-variant/30 hover:border-primary transition-colors cursor-pointer">{ins}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
