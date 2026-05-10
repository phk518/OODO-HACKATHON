import React from 'react'
import { Link } from 'react-router-dom'
import { Edit3, CheckCircle, Award, Leaf, Calendar, ArrowRight, ExternalLink } from 'lucide-react'
import { useData } from '../context/DataContext'

const Profile = () => {
  const { sessionUser, trips } = useData()
  
  if (!sessionUser) return null

  const upcomingTrips = trips.filter(t => new Date(t.startDate) >= new Date()).slice(0, 3)
  const pastTrips = trips.filter(t => new Date(t.startDate) < new Date()).slice(0, 4)

  const tripImages = [
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600'
  ]

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Profile Hero */}
      <section className="bg-bg-surface border border-border rounded-2xl p-10 md:p-14 flex flex-col md:flex-row gap-12 items-start mb-16 animate-in">
        <div className="relative shrink-0 mx-auto md:mx-0">
          <img 
            src={sessionUser.avatar || `https://ui-avatars.com/api/?name=${sessionUser.name}&background=random`} 
            className="w-40 h-40 rounded-full object-cover border-4 border-bg-base shadow-2xl" 
            alt="Profile"
          />
          <button className="absolute bottom-2 right-2 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all border-4 border-bg-surface">
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-2">{sessionUser.name}</h1>
              <p className="text-text-muted font-bold text-sm tracking-widest uppercase">Digital Nomad • {trips.length} Countries Visited</p>
            </div>
            <button className="px-6 py-2 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm mx-auto md:mx-0">
              Edit Profile
            </button>
          </div>
          
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl mb-8">
            {sessionUser.bio || "Passionate about discovering hidden gems and local cuisines. Currently planning a three-month trek through Southeast Asia."}
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
             <span className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
               <CheckCircle className="w-4 h-4" /> Verified Traveler
             </span>
             <span className="bg-accent/10 text-accent border border-accent/20 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
               <Award className="w-4 h-4" /> Pro Member
             </span>
             <span className="bg-gold/10 text-gold border border-gold/20 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
               <Leaf className="w-4 h-4" /> Eco-Conscious
             </span>
          </div>
        </div>
      </section>

      {/* Upcoming Trips */}
      <section className="mb-16 animate-in stagger-1">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-serif">Preplanned Trips</h2>
          <Link to="/trips" className="text-accent text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingTrips.length > 0 ? upcomingTrips.map((t, i) => (
            <div key={t.id} className="bg-bg-surface border border-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img src={tripImages[i % 4]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={t.name} />
                <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-widest">UPCOMING</div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-serif font-bold mb-2">{t.name}</h3>
                <div className="flex items-center gap-2 text-xs text-text-muted mb-8">
                  <Calendar className="w-4 h-4 text-primary" />
                  {new Date(t.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(t.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <Link to={`/itinerary?trip=${t.id}`} className="w-full block text-center py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-sm">
                  View Itinerary
                </Link>
              </div>
            </div>
          )) : (
            <div className="col-span-3 py-16 text-center border-2 border-dashed border-border rounded-2xl">
              <p className="text-text-muted">No upcoming trips planned.</p>
            </div>
          )}
        </div>
      </section>

      {/* Past History Grid */}
      <section className="animate-in stagger-2">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-serif">Previous Trips</h2>
          <Link to="/trips" className="text-accent text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
            View History <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {pastTrips.length > 0 ? pastTrips.map((t, i) => (
            <div key={t.id} className="bg-bg-surface border border-border rounded-xl overflow-hidden group hover:border-primary/50 transition-all">
              <div className="relative h-28 overflow-hidden">
                <img src={tripImages[(i + 2) % 4]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" alt={t.name} />
              </div>
              <div className="p-4">
                <div className="text-sm font-bold truncate mb-1">{t.name}</div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-text-muted font-bold">{new Date(t.startDate).getFullYear()}</span>
                  <Link to={`/itinerary?trip=${t.id}`} className="text-[10px] text-primary font-bold hover:underline flex items-center gap-1">
                    REVISIT <ExternalLink className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-4 py-12 text-center border-2 border-dashed border-border rounded-xl">
              <p className="text-text-muted text-sm">No past trips yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Profile
