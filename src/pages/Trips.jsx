import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Calendar, Plane, MoreVertical, ChevronRight, Share2, Download, RotateCcw, Heart, Users } from 'lucide-react'
import { useData } from '../context/DataContext'

const Trips = () => {
  const { sessionUser, trips, stops } = useData()
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredTrips, setFilteredTrips] = useState([])

  useEffect(() => {
    if (trips) {
      const filtered = trips.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (t.description || '').toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredTrips(filtered)
    }
  }, [searchQuery, trips])

  const ongoing = filteredTrips.filter(t => {
    const start = new Date(t.startDate)
    const end = new Date(t.endDate)
    const now = new Date()
    return now >= start && now <= end
  })

  const upcoming = filteredTrips.filter(t => new Date(t.startDate) > new Date())
  const past = filteredTrips.filter(t => new Date(t.endDate) < new Date())

  const tripImages = [
    'https://images.unsplash.com/photo-1506929662133-570293363f78?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600'
  ]

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 animate-in">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif mb-2">My Itineraries</h1>
          <p className="text-text-secondary">Manage your past, current, and future adventures.</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search trips..." 
              className="w-full bg-bg-surface border border-border rounded-xl py-2.5 pl-12 pr-4 text-sm text-white outline-none focus:border-primary/50 transition-all shadow-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link to="/create-trip" className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all text-sm flex items-center gap-2">
            Create Trip
          </Link>
        </div>
      </div>

      {/* Ongoing Section */}
      {ongoing.length > 0 && (
        <section className="mb-20 animate-in stagger-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(255,107,107,0.8)]" />
            <h2 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Ongoing</h2>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {ongoing.map(t => (
              <div key={t.id} className="flex flex-col lg:flex-row bg-bg-surface border border-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all shadow-2xl">
                <div className="relative w-full lg:w-96 h-64 lg:h-auto overflow-hidden shrink-0">
                  <img src={tripImages[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={t.name} />
                  <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-widest">ACTIVE NOW</div>
                </div>
                <div className="flex-1 p-10 flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-serif mb-2">{t.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <MapPin className="w-4 h-4 text-primary" />
                        {stops.filter(s => s.tripId === t.id).map(s => s.cityName).join(' • ') || 'No stops added'}
                      </div>
                    </div>
                    <button className="text-text-muted hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
                    <div className="flex justify-between text-xs font-bold text-text-muted">
                      <span>JOURNEY PROGRESS</span>
                      <span className="text-accent">65%</span>
                    </div>
                    <div className="h-2 bg-bg-elevated rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-accent shadow-[0_0_12px_rgba(255,107,107,0.4)]" style={{ width: '65%' }} />
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-surface bg-bg-elevated flex items-center justify-center text-[10px] font-bold text-white shadow-lg overflow-hidden">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                          </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-bg-surface bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shadow-lg">
                          +2
                        </div>
                      </div>
                      <Link to={`/itinerary?trip=${t.id}`} className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-sm flex items-center gap-2">
                        Manage Journey <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Section */}
      {upcoming.length > 0 && (
        <section className="mb-20 animate-in stagger-2">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            <h2 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Upcoming</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcoming.map((t, i) => (
              <div key={t.id} className="bg-bg-surface border border-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all">
                <div className="relative h-56 overflow-hidden">
                  <img src={tripImages[(i + 1) % 4]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={t.name} />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-widest">
                    IN 12 DAYS
                  </div>
                  <button className="absolute top-4 right-4 text-white hover:text-accent transition-colors drop-shadow-lg">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-serif font-bold mb-2">{t.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-text-muted mb-8">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Date(t.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(t.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                      <Plane className="w-4 h-4 text-primary" /> Flights Booked
                    </div>
                    <Link to={`/itinerary?trip=${t.id}`} className="text-xs font-bold text-primary hover:underline">
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Completed Section */}
      {past.length > 0 && (
        <section className="animate-in stagger-3">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-text-muted" />
            <h2 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Completed</h2>
          </div>
          <div className="space-y-4">
            {past.map((t, i) => (
              <div key={t.id} className="flex flex-col md:flex-row items-center gap-8 p-6 bg-bg-surface border border-border rounded-2xl hover:bg-bg-elevated/50 hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-6 flex-1 w-full">
                  <img src={tripImages[3]} className="w-16 h-16 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" alt={t.name} />
                  <div>
                    <h4 className="font-serif text-lg font-bold">{t.name}</h4>
                    <p className="text-xs text-text-muted font-medium">{new Date(t.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • 12 Activities</p>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto">
                  <div className="text-right hidden lg:block">
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Budget Spent</div>
                    <div className="text-sm font-bold text-white">$1,450.00</div>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-text-secondary hover:text-primary hover:bg-white/10 transition-all shadow-sm">
                       <Share2 className="w-4 h-4" />
                     </button>
                     <button className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-text-secondary hover:text-primary hover:bg-white/10 transition-all shadow-sm">
                       <Download className="w-4 h-4" />
                     </button>
                     <Link to={`/itinerary?trip=${t.id}`} className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-text-secondary hover:text-accent hover:bg-white/10 transition-all shadow-sm">
                       <RotateCcw className="w-4 h-4" />
                     </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {filteredTrips.length === 0 && (
        <div className="py-24 text-center border-2 border-dashed border-border rounded-3xl animate-in">
          <div className="text-6xl mb-6">🧳</div>
          <h3 className="text-2xl font-serif mb-2">No trips found</h3>
          <p className="text-text-secondary mb-10">Try a different search or plan your next adventure!</p>
          <Link to="/create-trip" className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-2xl hover:scale-105 transition-all">
            Plan New Trip
          </Link>
        </div>
      )}
    </div>
  )
}

export default Trips
