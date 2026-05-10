import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plane, BarChart3, Map, Globe } from 'lucide-react'

const Landing = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Session check logic (mocking for now)
    const session = localStorage.getItem('tl_session')
    if (session) navigate('/dashboard')
  }, [navigate])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Hero Background */}
      <img 
        src="https://images.unsplash.com/photo-1506929662133-570293363f78?auto=format&fit=crop&q=80&w=1600" 
        alt="Travel Backdrop" 
        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale-[40%] contrast-[110%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base/20 via-bg-base/60 to-bg-base" />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl px-8 animate-in">
        <span className="text-6xl mb-8 block animate-bounce-slow">✈️</span>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 bg-gradient-to-b from-white to-text-secondary bg-clip-text text-transparent">
          Your Next Adventure Awaits
        </h1>
        <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
          Discover hidden gems and curate your perfect itinerary with the modern explorer's choice.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/register" 
            className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-2xl hover:shadow-primary/20 hover:scale-105 transition-all"
          >
            Get Started
          </Link>
          <Link 
            to="/login" 
            className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Preview */}
      <div className="absolute bottom-12 w-full max-w-6xl px-8 hidden md:block">
        <div className="grid grid-cols-3 gap-12 border-t border-white/5 pt-12">
          <div className="text-left border-l border-primary/40 pl-6">
            <div className="flex items-center gap-2 font-bold text-sm mb-2">
              <Globe className="w-4 h-4 text-primary" />
              50+ Destinations
            </div>
            <p className="text-xs text-text-secondary">Curated cities across every continent.</p>
          </div>
          <div className="text-left border-l border-primary/40 pl-6">
            <div className="flex items-center gap-2 font-bold text-sm mb-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              Smart Budgeting
            </div>
            <p className="text-xs text-text-secondary">Real-time tracking of your travel costs.</p>
          </div>
          <div className="text-left border-l border-primary/40 pl-6">
            <div className="flex items-center gap-2 font-bold text-sm mb-2">
              <Map className="w-4 h-4 text-primary" />
              Itinerary Builder
            </div>
            <p className="text-xs text-text-secondary">Seamlessly connect stops and activities.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
