import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users, ArrowRight, Hotel, Footprints, Timer, CheckCircle } from 'lucide-react'

const Dashboard = () => {
  const [userName, setUserName] = useState('Explorer')
  const [trips, setTrips] = useState([])

  useEffect(() => {
    // Mocking data retrieval for now
    const user = JSON.parse(localStorage.getItem('tl_user') || '{"name": "Explorer"}')
    setUserName(user.name.split(' ')[0])
    
    const savedTrips = JSON.parse(localStorage.getItem('tl_trips') || '[]')
    setTrips(savedTrips.slice(0, 3))
  }, [])

  const bentoItems = [
    { name: 'Paris, France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', desc: 'The city of light, reimagined for the frequent traveler.', popular: true, span: 'col-span-2 row-span-2' },
    { name: 'Tokyo, Japan', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600', desc: 'Tech-forward urban discovery.', span: 'col-span-1' },
    { name: 'Bali, Indonesia', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600', desc: 'Nature-centric retreats.', span: 'col-span-1' },
    { name: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', desc: 'Modern corporate luxury and desert charm.', span: 'col-span-2' },
  ]

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1506929662133-570293363f78?auto=format&fit=crop&q=80&w=1600" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Dashboard Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/30 via-bg-base/80 to-bg-base" />
        
        <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center px-8 animate-in">
          <h1 className="text-5xl md:text-6xl font-serif leading-tight mb-4">
            Where to next, <span className="text-primary">{userName}</span>?
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mb-12">
            Your professional journey begins with a single, perfectly planned step. Experience travel without the stress.
          </p>
          
          <div className="w-full max-w-4xl glass-card p-2 flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-6 py-3 border-r border-white/10 w-full">
              <MapPin className="w-5 h-5 text-primary" />
              <input type="text" placeholder="Search destination..." className="bg-transparent border-none text-white w-full outline-none text-sm" />
            </div>
            <div className="flex-1 flex items-center gap-3 px-6 py-3 border-r border-white/10 w-full">
              <Calendar className="w-5 h-5 text-primary" />
              <input type="text" placeholder="Select dates" className="bg-transparent border-none text-white w-full outline-none text-sm" />
            </div>
            <div className="flex-1 flex items-center gap-3 px-6 py-3 w-full">
              <Users className="w-5 h-5 text-primary" />
              <input type="text" placeholder="Travelers" defaultValue="2 Travelers" className="bg-transparent border-none text-white w-full outline-none text-sm" />
            </div>
            <button className="w-full md:w-auto px-10 py-3 bg-accent text-white font-bold rounded-lg hover:scale-105 transition-all">
              Search
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-8">
        {/* Bento Grid */}
        <section className="mb-24 animate-in stagger-1">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif mb-2">Top Regional Selections</h2>
              <p className="text-text-secondary text-sm">Hand-picked destinations for the modern professional.</p>
            </div>
            <Link to="/discovery" className="text-accent text-sm font-bold flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[500px]">
            {bentoItems.map((item, i) => (
              <div 
                key={i} 
                className={`group relative overflow-hidden rounded-2xl border border-border cursor-pointer transition-all hover:border-primary hover:-translate-y-1 ${item.span}`}
              >
                <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent opacity-90 p-8 flex flex-col justify-end">
                  {item.popular && <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-3 tracking-widest">POPULAR</span>}
                  <h3 className="text-white text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-text-secondary text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journey History */}
        <section className="animate-in stagger-2">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-serif">Your Journey History</h2>
            <div className="flex gap-3">
               <button className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-bg-elevated transition-colors text-text-secondary">
                 <ArrowRight className="w-5 h-5 rotate-180" />
               </button>
               <button className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center hover:scale-105 transition-all text-white">
                 <ArrowRight className="w-5 h-5" />
               </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trips.length > 0 ? trips.map((t, i) => (
              <div key={i} className="bg-bg-surface border border-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={t.name} />
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
                    <Timer className="w-3 h-3" />
                    ONGOING
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">{t.name}</h3>
                    <span className="text-xs text-text-muted">Jan 2026</span>
                  </div>
                  <div className="flex gap-4 mb-8">
                    <div className="flex items-center gap-1 text-xs text-text-secondary">
                      <Hotel className="w-4 h-4 text-primary" /> 3 Hotels
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-secondary">
                      <Footprints className="w-4 h-4 text-primary" /> 12 Activities
                    </div>
                  </div>
                  <Link to={`/itinerary?trip=${t.id}`} className="block text-center py-2.5 border border-primary/30 text-primary font-bold text-sm rounded-lg hover:bg-primary hover:text-white transition-all">
                    Manage Trip
                  </Link>
                </div>
              </div>
            )) : (
              <div className="col-span-3 py-20 text-center bg-bg-surface/30 rounded-2xl border border-dashed border-border">
                <p className="text-text-muted">No trips found. Start planning today!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
