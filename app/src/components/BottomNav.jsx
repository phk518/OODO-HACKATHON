import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', icon: 'home', label: 'Home' },
  { to: '/trips', icon: 'explore', label: 'My Trips' },
  { to: '/discovery', icon: 'map', label: 'Discovery' },
  { to: '/profile', icon: 'person', label: 'Profile' },
]

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 bg-surface/90 backdrop-blur-xl flex justify-around items-center px-4 pb-safe z-50 border-t border-outline-variant/30" style={{boxShadow: '0px -4px 25px rgba(26,43,60,0.12)'}}>
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center rounded-xl px-4 py-1 active:scale-90 transition-all duration-200 ${
              isActive
                ? 'text-primary bg-primary-container/20'
                : 'text-secondary hover:bg-secondary-container/30'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>{item.icon}</span>
              <span className="font-label text-xs font-semibold mt-0.5">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
