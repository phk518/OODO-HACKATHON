import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Plane, Compass, Users, User, LogOut } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()
  
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Plane },
    { name: 'Explore', path: '/discovery', icon: Compass },
    { name: 'Community', path: '/community', icon: Users },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 h-[68px] bg-bg-base/80 backdrop-blur-xl border-b border-border z-[200] px-8 flex items-center justify-between gap-6">
      <Link to="/" className="flex items-center gap-2.5 font-serif text-[1.4rem] font-bold text-text-primary decoration-none">
        <div className="w-9 h-9 bg-gradient-to-br from-primary/80 to-primary rounded-md flex items-center justify-center shadow-lg">
          <Plane className="w-5 h-5 text-white" />
        </div>
        Traveloop
      </Link>

      <div className="flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-sm font-medium transition-all ${
              isActive(link.path)
                ? 'text-primary bg-primary/10'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
            }`}
          >
            <link.icon className="w-4 h-4" />
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Link to="/profile" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary border border-primary/30">
          P
        </Link>
        <button className="w-10 h-10 rounded-md flex items-center justify-center text-text-secondary hover:text-danger transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
