import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, CreditCard, ArrowRight, Star, Globe } from 'lucide-react'
import { useData } from '../context/DataContext'

const CreateTrip = () => {
  const navigate = useNavigate()
  const { addTrip, sessionUser } = useData()
  
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: ''
  })

  const suggestions = [
    { name: 'Paris, France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600', badge: 'BUSINESS HUB', rating: '4.9', desc: 'Perfect for networking events near the Seine.' },
    { name: 'Yosemite, USA', img: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=600', badge: 'RETREAT', rating: '4.8', desc: 'Recharge with nature trails and scenic lookouts.' },
    { name: 'Tokyo, Japan', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600', badge: 'TECH EXPO', rating: '5.0', desc: 'Navigate the cutting-edge tech districts.' },
    { name: 'Maldives', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600', badge: 'RELAXATION', rating: '4.7', desc: 'Unwind in luxury overwater bungalows.' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert('End date must be after start date')
      return
    }

    const newTrip = addTrip({
      userId: sessionUser?.id,
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      destination: formData.destination
    })

    navigate(`/itinerary?trip=${newTrip.id}`)
  }

  return (
    <div className="container mx-auto px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16">
        {/* Left: Form */}
        <section className="space-y-12 animate-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Start Your Journey</h1>
            <p className="text-text-secondary text-lg">Fill in the details to curate your next professional adventure.</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-10 space-y-8 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Trip Name</label>
              <input 
                type="text" 
                required 
                className="w-full bg-bg-elevated border border-border rounded-xl py-3.5 px-4 text-white outline-none focus:border-primary/50 transition-all shadow-inner"
                placeholder="e.g. European Product Launch 2025"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Where to?</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  required 
                  className="w-full bg-bg-elevated border border-border rounded-xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all shadow-inner"
                  placeholder="Select City or Country"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Start Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors pointer-events-none" />
                  <input 
                    type="date" 
                    required 
                    className="w-full bg-bg-elevated border border-border rounded-xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all shadow-inner"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">End Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors pointer-events-none" />
                  <input 
                    type="date" 
                    required 
                    className="w-full bg-bg-elevated border border-border rounded-xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all shadow-inner"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Total Budget (Est.)</label>
              <div className="relative group">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                <input 
                  type="number" 
                  required 
                  className="w-full bg-bg-elevated border border-border rounded-xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all shadow-inner"
                  placeholder="Enter amount in USD"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4">
              <button 
                type="submit" 
                className="w-full py-4 bg-accent text-white font-bold rounded-xl shadow-xl hover:shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Build Itinerary <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                type="button" 
                className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </section>

        {/* Right: Inspiration */}
        <section className="space-y-12 animate-in stagger-1">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-serif mb-2">Inspiration for you</h2>
              <p className="text-sm text-text-secondary font-medium">Recommended spots based on top-rated business trips.</p>
            </div>
            <button className="text-accent text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
              All Suggestions <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {suggestions.map((s, i) => (
              <div 
                key={i} 
                className="group relative bg-bg-surface border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-primary transition-all hover:-translate-y-2"
                onClick={() => setFormData({...formData, destination: s.name})}
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={s.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={s.name} />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-widest">
                    {s.badge}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-serif font-bold">{s.name}</h3>
                    <div className="flex items-center gap-1 text-gold text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-gold" /> {s.rating}
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-bg-surface border border-border rounded-2xl p-8 flex items-center gap-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
               <Globe className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold mb-1">Global Exploration Mode</h4>
              <p className="text-xs text-text-secondary">Explore over 1,000 cities with our AI-driven discovery tool.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CreateTrip
