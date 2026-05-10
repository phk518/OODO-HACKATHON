const DAYS = [
  {
    num: '01', title: 'Harbor Arrival', location: 'Circular Quay, Sydney', primary: true,
    activities: [
      { time: 'Morning', icon: 'flight_land', name: 'Arrival at SYD', detail: '10:30 AM • Terminal 1 International', note: 'Check-in at Hyatt Regency', cost: '$0' },
      { time: 'Afternoon', icon: 'sailing', name: 'Harbor Sunset Cruise', detail: '05:00 PM • Wharf 6', note: 'Booking #AZ-992', cost: '$85' },
    ]
  },
  {
    num: '02', title: 'Mountain Peaks', location: 'Katoomba, Blue Mountains',
    activities: [
      { time: 'Full Day', icon: 'hiking', name: 'Guided Echo Point Trek', detail: '09:00 AM • Meet at Katoomba Station', desc: 'Explore the historic Giant Stairway and witness the majestic Three Sisters formation from hidden viewpoints known only to locals.', tags: [{ icon: 'hiking', label: 'Challenging' }, { icon: 'schedule', label: '6 Hours' }], cost: '$120', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMqSr2UuwS1sC9AQEXl2QKpUfTXOzHIEdvCB8tNwtEwVpPxLNXvBSgVZv45e29kf05iWOOwi_bedy81WhGqMWSFM7L88Ox9SJXfNAecxjjbmrfFbmcPdkHwwRSAxtAgdGxjwzBLMMvc6VCEwqu8sUYao9NiVSqgS8luR2FOpd1uSuO7pHp4-PsJiZk1XeoIXFxt5X6Q7guwyVCwLe6nAC8QRpA09JcMyeOTy4TabH-DakIG4ux337ebY2-Oyc0PKNYFQPY2cNKB1A', large: true },
      { time: 'Dinner', icon: 'restaurant', name: 'Mountain Hearth', detail: '07:30 PM • Katoomba St.', tag: 'Local Cuisine', cost: '$65' },
    ]
  },
]

export default function ItineraryView() {
  return (
    <div>
      {/* Hero */}
      <section className="mb-12 relative rounded-xl overflow-hidden h-[300px] flex items-end p-8">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZbXDOnsS8OjdfkJp9KH3GpK3KMVHKTELECNNEF7spC8uQJGqCYNHnJNmQNIx6rK-Bkn6M6WPAPMy-Ks_gOcimNwPRcESyCplr3ekdM0J-36aw7s37ycMWxnS6xKBb8hlDX4vnQaS2hHFS4PJ5vejQxEeWhc0LqI4HD-RCBDABhlMRe2nQVYZPdEhAhAQU3MI_xGYTw1lIsEOL9FM8-dzDnQRYg_Nny7sAXjXyAVplPEonfLtxdme7I3eAcNhY4PFd_lLmrTDmpnU" alt="Sydney" />
          <div className="absolute inset-0 bg-gradient-to-t from-on-secondary-fixed/80 to-transparent" />
        </div>
        <div className="relative z-10 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-sm font-semibold">7 DAYS</span>
            <span className="text-white/80 text-sm font-semibold">OCT 12 - OCT 18</span>
          </div>
          <h2 className="font-heading text-3xl font-bold mb-2">Coastal Escape: Sydney &amp; Beyond</h2>
          <p className="font-body text-lg opacity-90 max-w-xl">A curated journey through Australia's most iconic harbor city and the rugged beauty of the Blue Mountains.</p>
        </div>
      </section>

      {/* View Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center p-1 bg-surface-container rounded-xl self-start">
          <button className="px-6 py-2 rounded-lg bg-surface shadow-sm text-primary font-label text-sm font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined">list</span> List
          </button>
          <button className="px-6 py-2 rounded-lg text-on-surface-variant font-label text-sm font-semibold flex items-center gap-2 hover:bg-surface-variant/50 transition-colors">
            <span className="material-symbols-outlined">calendar_month</span> Calendar
          </button>
        </div>
        <div className="flex gap-2">
          <span className="bg-surface-container-high px-4 py-2 rounded-full text-sm font-semibold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">payments</span> Total: $1,420
          </span>
          <span className="bg-surface-container-high px-4 py-2 rounded-full text-sm font-semibold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">distance</span> 45km covered
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="hidden md:block absolute left-[31px] top-0 bottom-0 w-[2px] bg-outline-variant/30" />
        {DAYS.map(day => (
          <div key={day.num} className="relative mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl font-heading text-2xl font-semibold shadow-lg ${day.primary ? 'bg-primary text-white' : 'bg-surface-container-highest text-primary border border-outline-variant/20 shadow-sm'}`}>{day.num}</div>
              <div>
                <h3 className="font-heading text-2xl font-semibold text-on-surface">{day.title}</h3>
                <p className="text-on-surface-variant font-body">{day.location}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[64px_1fr] gap-6">
              <div className="hidden md:block" />
              <div className={`grid grid-cols-1 ${day.activities.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-4`}>
                {day.activities.map((act, i) => (
                  <div key={i} className={`bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/20 hover:shadow-md transition-shadow ${act.large ? 'lg:col-span-2' : ''}`} style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.05)'}}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{act.time}</span>
                      <span className="text-primary font-label text-sm font-semibold">{act.cost}</span>
                    </div>
                    <div className={`flex ${act.img ? 'flex-col md:flex-row' : ''} gap-4`}>
                      {act.img && (
                        <div className="w-full md:w-1/3 h-32 rounded-lg overflow-hidden shrink-0">
                          <img className="w-full h-full object-cover" src={act.img} alt={act.name} />
                        </div>
                      )}
                      <div className={act.img ? 'flex-1' : 'flex gap-4'}>
                        {!act.img && (
                          <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-tertiary">{act.icon}</span>
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-on-surface">{act.name}</h4>
                          <p className="text-sm text-on-surface-variant mb-3">{act.detail}</p>
                          {act.desc && <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">{act.desc}</p>}
                          {act.tags && (
                            <div className="flex gap-4">
                              {act.tags.map(t => (
                                <div key={t.label} className="flex items-center gap-1 text-xs text-secondary">
                                  <span className="material-symbols-outlined text-base">{t.icon}</span> {t.label}
                                </div>
                              ))}
                            </div>
                          )}
                          {act.note && (
                            <div className="flex items-center gap-2 text-xs text-secondary">
                              <span className="material-symbols-outlined text-base">info</span> {act.note}
                            </div>
                          )}
                          {act.tag && <span className="text-xs text-primary bg-primary-container/10 px-2 py-0.5 rounded">{act.tag}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
