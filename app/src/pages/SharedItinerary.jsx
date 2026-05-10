const COLLABORATORS = [
  { name: 'You', role: 'Owner', avatar: '👤' },
  { name: 'Sarah M.', role: 'Editor', avatar: '👩' },
  { name: 'Alex K.', role: 'Viewer', avatar: '🧑' },
]

const STOPS = [
  { city: 'Paris', dates: 'June 12-15', activities: ['Louvre Museum', 'Eiffel Tower', 'Seine Cruise'] },
  { city: 'Nice', dates: 'June 15-19', activities: ['Beach Day', 'Old Town Walk', 'Flower Market'] },
]

export default function SharedItinerary() {
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary">group</span>
          <span className="font-label text-sm font-semibold text-primary uppercase tracking-wider">Shared Trip</span>
        </div>
        <h2 className="font-heading text-3xl font-bold text-on-surface mb-2">European Summer Escape</h2>
        <p className="text-on-surface-variant font-body text-lg">Collaborative itinerary • Last updated 2 hours ago</p>
      </div>

      {/* Collaborators */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 mb-8 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-xl font-semibold">Collaborators</h3>
          <button className="px-4 py-2 bg-primary-container text-on-primary-container font-label text-sm font-semibold rounded-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">person_add</span> Invite
          </button>
        </div>
        <div className="space-y-3">
          {COLLABORATORS.map(c => (
            <div key={c.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-xl">{c.avatar}</div>
                <div>
                  <p className="font-label text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-on-surface-variant">{c.role}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.role === 'Owner' ? 'bg-primary-container text-on-primary-container' : c.role === 'Editor' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-high text-on-surface-variant'}`}>{c.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Share Link */}
      <div className="bg-primary/5 rounded-2xl p-6 mb-8 border border-primary/10">
        <h3 className="font-heading text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">link</span> Share Link
        </h3>
        <div className="flex gap-2">
          <input className="flex-1 h-12 px-4 bg-white rounded-xl border border-outline-variant/30 text-sm text-on-surface-variant" readOnly value="https://traveloop.app/share/eu-summer-24" />
          <button className="px-6 h-12 bg-primary text-white font-label text-sm font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all">Copy</button>
        </div>
      </div>

      {/* Shared Itinerary Overview */}
      <div className="space-y-6">
        {STOPS.map(stop => (
          <div key={stop.city} className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white">location_on</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold">{stop.city}</h3>
                <p className="text-on-surface-variant text-sm">{stop.dates}</p>
              </div>
            </div>
            <div className="space-y-2">
              {stop.activities.map(act => (
                <div key={act} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <span className="font-body">{act}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Comments */}
      <div className="mt-8 bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
        <h3 className="font-heading text-xl font-semibold mb-4">Trip Discussion</h3>
        <div className="space-y-4 mb-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-sm shrink-0">👩</div>
            <div className="bg-surface-container-low rounded-xl p-3 flex-1">
              <p className="text-sm font-semibold mb-1">Sarah M.</p>
              <p className="text-sm text-on-surface-variant">Should we add a day trip to Monaco from Nice? It's only 30 min by train!</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-sm shrink-0">👤</div>
            <div className="bg-primary/5 rounded-xl p-3 flex-1">
              <p className="text-sm font-semibold mb-1">You</p>
              <p className="text-sm text-on-surface-variant">Great idea! I'll add it to Day 5 🎉</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <input className="flex-1 h-12 px-4 bg-surface rounded-xl border border-outline-variant/30 text-sm outline-none focus:border-primary transition-all" placeholder="Add a comment..." />
          <button className="px-4 h-12 bg-primary-container text-on-primary-container rounded-xl hover:opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  )
}
