import { Link } from 'react-router-dom'

const PROFILE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUrFN3nb7eobZUlE8Vk-VwJoL9PvqQi3n5wg4u-tkDBmp4Os3BDUVHXZGNyfp8ZqLxXZDubaCkLc6xpcIlvwzvLnFbnAvHJ7qjzjltcmGT6K47kr2QSRQH9hC5nmWZbJwbs_TNq6bt540QJLnnU24W0rt2Zn6IaXDks7M4sr7ag5o249AITPcaUBrASFre4W2aPN_IsYbuJQIEOSkrUL6tfYRaygUZCVAhWnegMC6plW3BqG0Hz_NmIs48WpIHesBcuYu0ROPFeCg'

const STATS = [
  { label: 'Trips', value: '12' },
  { label: 'Countries', value: '8' },
  { label: 'Cities', value: '24' },
  { label: 'Days Traveled', value: '87' },
]

const MENU_ITEMS = [
  { icon: 'settings', label: 'Account Settings', to: '#' },
  { icon: 'notifications', label: 'Notifications', to: '#' },
  { icon: 'security', label: 'Privacy & Security', to: '#' },
  { icon: 'palette', label: 'Appearance', to: '#' },
  { icon: 'help', label: 'Help & Support', to: '#' },
  { icon: 'info', label: 'About Traveloop', to: '#' },
]

export default function Profile() {
  return (
    <div className="max-w-[800px] mx-auto">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="w-28 h-28 rounded-full mx-auto mb-4 overflow-hidden border-4 border-primary-container shadow-lg">
          <img className="w-full h-full object-cover" src={PROFILE_IMG} alt="Profile" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-on-surface">Alex Explorer</h2>
        <p className="text-on-surface-variant font-body">Wanderer • Photographer • Foodie</p>
        <p className="text-sm text-on-surface-variant mt-1 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-base">location_on</span> San Francisco, CA
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {STATS.map(stat => (
          <div key={stat.label} className="bg-surface-container-lowest rounded-2xl p-4 text-center border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
            <p className="font-heading text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-on-surface-variant font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 mb-8 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
        <h3 className="font-heading text-xl font-semibold mb-4">Travel Badges</h3>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {['🌍 Globe Trotter', '📸 Shutterbug', '🍜 Foodie Explorer', '🏔️ Mountain Climber', '✈️ Frequent Flyer'].map(badge => (
            <div key={badge} className="min-w-[120px] bg-primary/5 rounded-xl p-4 text-center border border-primary/10">
              <p className="text-2xl mb-1">{badge.split(' ')[0]}</p>
              <p className="text-xs font-semibold text-primary">{badge.split(' ').slice(1).join(' ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
        {MENU_ITEMS.map((item, i) => (
          <Link key={item.label} to={item.to} className={`flex items-center gap-4 p-4 hover:bg-surface-container-low transition-colors ${i < MENU_ITEMS.length - 1 ? 'border-b border-outline-variant/10' : ''}`}>
            <span className="material-symbols-outlined text-on-surface-variant">{item.icon}</span>
            <span className="font-label text-sm font-semibold flex-1">{item.label}</span>
            <span className="material-symbols-outlined text-on-surface-variant text-lg">chevron_right</span>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button className="w-full mt-6 py-4 text-error font-label text-sm font-semibold rounded-xl border border-error/20 hover:bg-error/5 transition-colors flex items-center justify-center gap-2">
        <span className="material-symbols-outlined">logout</span> Sign Out
      </button>
    </div>
  )
}
