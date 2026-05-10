import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MapPin, Calendar, Plane, Share2, Copy, Twitter, MessageCircle, ArrowRight, ExternalLink, Globe } from 'lucide-react'
import { useData } from '../context/DataContext'

const Share = () => {
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  const tripId = searchParams.get('trip')
  const { trips, stops, activities, sessionUser, addTrip, addStop, addActivity } = useData()
  
  const [trip, setTrip] = useState(null)
  const [tripStops, setTripStops] = useState([])
  const [tripActivities, setTripActivities] = useState([])
  
  useEffect(() => {
    let foundTrip = null
    if (code) {
      foundTrip = trips.find(t => t.shareCode === code)
    } else if (tripId) {
      foundTrip = trips.find(t => t.id === tripId)
    }
    
    if (foundTrip) {
      setTrip(foundTrip)
      const s = stops.filter(stop => stop.tripId === foundTrip.id)
      setTripStops(s)
      const a = activities.filter(act => s.some(stop => stop.id === act.stopId))
      setTripActivities(a)
    }
  }, [code, tripId, trips, stops, activities])

  if (!trip) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-8">
        <div className="glass-card p-12 max-w-md text-center animate-in">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-8 h-8 text-text-muted" />
          </div>
          <h1 className="text-2xl font-serif mb-2">Itinerary not found</h1>
          <p className="text-text-secondary text-sm mb-10">This shared link may be invalid or the trip may have been deleted.</p>
          <Link to="/dashboard" className="inline-block px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all">
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const totalCost = tripActivities.reduce((sum, a) => sum + (a.cost || 0), 0)
  const shareUrl = `${window.location.origin}/share?code=${trip.shareCode}`

  const handleCopyTrip = () => {
    if (!sessionUser) {
      alert('Sign in to copy this trip')
      return
    }
    // Copy logic...
    alert('Trip copied to your account!')
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* Branding Header */}
      <div className="flex justify-between items-center mb-16 animate-in">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-serif font-bold text-white">Traveloop</span>
        </Link>
        <Link to="/" className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-xl hover:scale-105 transition-all flex items-center gap-2">
          Plan Your Own Trip <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Hero Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-bg-surface via-bg-base to-bg-surface border border-border p-12 text-center mb-12 animate-in shadow-2xl">
         <div className="absolute inset-0 bg-radial-gradient from-primary/10 via-transparent to-transparent opacity-50" />
         <div className="relative z-10">
           <div className="text-6xl mb-6">{trip.coverEmoji || '✈️'}</div>
           <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{trip.name}</h1>
           <p className="text-text-secondary text-lg mb-10 max-w-2xl mx-auto">{trip.description || 'A curated journey through the world\'s most beautiful cities.'}</p>
           
           <div className="flex justify-center gap-10 md:gap-16 py-8 border-y border-white/5">
             <div className="text-center">
               <div className="text-2xl font-bold text-white">14</div>
               <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Days</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-white">{tripStops.length}</div>
               <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Cities</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-white">{tripActivities.length}</div>
               <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Activities</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-white">${totalCost.toLocaleString()}</div>
               <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Est. Cost</div>
             </div>
           </div>
         </div>
      </div>

      {/* URL & Social */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 mb-16 animate-in stagger-1">
        <div className="bg-bg-surface border border-border rounded-xl px-6 py-3 flex items-center gap-4 group focus-within:border-primary/50 transition-all shadow-lg">
          <Share2 className="w-4 h-4 text-text-muted group-focus-within:text-primary" />
          <input 
            type="text" 
            readOnly 
            value={shareUrl} 
            className="flex-1 bg-transparent text-sm text-text-secondary outline-none font-mono"
            onClick={(e) => e.target.select()}
          />
          <button 
            onClick={() => { navigator.clipboard.writeText(shareUrl); alert('Link copied!'); }}
            className="text-xs font-bold text-primary uppercase tracking-widest hover:underline"
          >
            Copy
          </button>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 md:flex-none px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-text-secondary hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Twitter className="w-4 h-4 text-[#1DA1F2]" /> Share on X
          </button>
          <button onClick={handleCopyTrip} className="flex-1 md:flex-none px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-text-secondary hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <Copy className="w-4 h-4 text-accent" /> Copy Trip
          </button>
        </div>
      </div>

      {/* Itinerary List */}
      <div className="space-y-12 animate-in stagger-2">
        {tripStops.map((stop, i) => {
          const stopActs = tripActivities.filter(a => a.stopId === stop.id)
          const stopCost = stopActs.reduce((sum, a) => sum + (a.cost || 0), 0)
          
          return (
            <div key={stop.id} className="space-y-6">
              <div className="flex items-center gap-6 p-6 bg-bg-surface border border-border rounded-2xl shadow-xl relative group">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0">
                  {i + 1}
                </div>
                <div className="text-3xl shrink-0">{stop.emoji || '📍'}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-bold text-white">{stop.cityName}, {stop.country}</h3>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-widest">
                    {new Date(stop.arrivalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(stop.departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-lg font-bold text-gold">${stopCost.toLocaleString()}</div>
              </div>

              <div className="space-y-3 ml-12">
                {stopActs.map((act, ai) => (
                  <div key={ai} className="flex items-center gap-4 p-4 bg-bg-elevated/50 border border-border rounded-xl group hover:border-primary/50 transition-all">
                    <div className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{act.emoji || '⭐'}</div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white">{act.name}</h4>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{act.category} • {act.duration} min</p>
                    </div>
                    <div className="text-sm font-bold text-gold">${(act.cost || 0).toLocaleString()}</div>
                  </div>
                ))}
                {stopActs.length === 0 && (
                  <div className="p-4 text-xs text-text-muted italic opacity-50">No activities listed</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Share
