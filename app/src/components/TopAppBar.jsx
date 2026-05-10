import { Link } from 'react-router-dom'

const PROFILE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUrFN3nb7eobZUlE8Vk-VwJoL9PvqQi3n5wg4u-tkDBmp4Os3BDUVHXZGNyfp8ZqLxXZDubaCkLc6xpcIlvwzvLnFbnAvHJ7qjzjltcmGT6K47kr2QSRQH9hC5nmWZbJwbs_TNq6bt540QJLnnU24W0rt2Zn6IaXDks7M4sr7ag5o249AITPcaUBrASFre4W2aPN_IsYbuJQIEOSkrUL6tfYRaygUZCVAhWnegMC6plW3BqG0Hz_NmIs48WpIHesBcuYu0ROPFeCg'

export default function TopAppBar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
      <div className="flex items-center justify-between px-5 md:px-16 h-16 w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4">
          <button className="hover:opacity-80 transition-opacity active:scale-95">
            <span className="material-symbols-outlined text-primary">menu</span>
          </button>
          <Link to="/" className="font-heading text-2xl font-semibold text-primary tracking-tight">Traveloop</Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-on-surface-variant font-label text-sm font-semibold tracking-wide hover:opacity-80 transition-opacity">Home</Link>
          <Link to="/trips" className="text-on-surface-variant font-label text-sm font-semibold tracking-wide hover:opacity-80 transition-opacity">My Trips</Link>
          <Link to="/discovery" className="text-on-surface-variant font-label text-sm font-semibold tracking-wide hover:opacity-80 transition-opacity">Discovery</Link>
          <Link to="/profile" className="text-on-surface-variant font-label text-sm font-semibold tracking-wide hover:opacity-80 transition-opacity">Profile</Link>
        </nav>

        <Link to="/profile" className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant/30 active:scale-95 transition-transform">
          <img alt="User Profile" className="w-full h-full object-cover" src={PROFILE_IMG} />
        </Link>
      </div>
    </header>
  )
}
