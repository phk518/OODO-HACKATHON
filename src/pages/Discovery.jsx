import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, MapPin, Clock, Languages, Heart, Star } from 'lucide-react'

// Mock Sygic API integration (to be replaced with actual js/sygic-api.js logic)
const mockGetActivities = async (cityId) => {
  return [
    { id: 1, name: 'Eiffel Tower Tour', category: 'sightseeing', duration: 120, avgCost: 45, description: 'Skip-the-line access to the most iconic monument in Paris.', emoji: '🏛️' },
    { id: 2, name: 'Louvre Museum Walk', category: 'culture', duration: 180, avgCost: 35, description: 'Explore the world\'s largest art museum with a local guide.', emoji: '🎨' },
    { id: 3, name: 'Seine River Cruise', category: 'sightseeing', duration: 60, avgCost: 25, description: 'Romantic boat trip along the heart of the city.', emoji: '🚢' },
  ]
}

const Discovery = () => {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState({ id: 'city:1', name: 'Paris' })
  const [priceRange, setPriceRange] = useState(500)
  const [activeFilters, setActiveFilters] = useState(['all'])

  useEffect(() => {
    const fetchActs = async () => {
      setLoading(true)
      const data = await mockGetActivities(city.id)
      setActivities(data)
      setLoading(false)
    }
    fetchActs()
  }, [city])

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'sightseeing', label: 'Tours & Sightseeing' },
    { id: 'food', label: 'Food & Drink' },
    { id: 'adventure', label: 'Outdoor & Adventure' },
    { id: 'culture', label: 'Art & Culture' },
  ]

  const handleFilterChange = (id) => {
    if (id === 'all') {
      setActiveFilters(['all'])
    } else {
      const newFilters = activeFilters.filter(f => f !== 'all')
      if (newFilters.includes(id)) {
        const updated = newFilters.filter(f => f !== id)
        setActiveFilters(updated.length === 0 ? ['all'] : updated)
      } else {
        setActiveFilters([...newFilters, id])
      }
    }
  }

  const filteredActivities = activities.filter(a => {
    const passPrice = a.avgCost <= priceRange
    const passCat = activeFilters.includes('all') || activeFilters.includes(a.category)
    return passPrice && passCat
  })

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-12 animate-in">
        <nav className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-primary transition-colors">Explore</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">{city.name}</span>
        </nav>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif mb-2">Discover {city.name}</h1>
            <p className="text-text-secondary">{filteredActivities.length} experiences found for your adventure</p>
          </div>
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search another city..." 
              className="w-full bg-bg-surface border border-border rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
        {/* Sidebar Filters */}
        <aside className="space-y-10 animate-in stagger-1">
          <div className="glass-card p-8">
            <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-6">Categories</h3>
            <div className="space-y-4">
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={activeFilters.includes(cat.id)}
                    onChange={() => handleFilterChange(cat.id)}
                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary checked:bg-primary transition-all"
                  />
                  <span className={`text-sm transition-colors ${activeFilters.includes(cat.id) ? 'text-text-primary font-bold' : 'text-text-secondary group-hover:text-text-primary'}`}>
                    {cat.label}
                  </span>
                </label>
              ))}
            </div>

            <div className="my-10 h-[1px] bg-white/5" />

            <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-6">Price Range</h3>
            <div className="px-1">
              <input 
                type="range" 
                min="0" max="500" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-1.5 bg-bg-elevated rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between mt-4 text-[10px] font-bold text-text-muted">
                <span>$0</span>
                <span className="text-primary">${priceRange === 500 ? '500+' : priceRange}</span>
              </div>
            </div>
          </div>

          <div className="relative h-48 rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b,_#0f172a)] flex items-center justify-center text-5xl">🗺️</div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent p-6 flex items-end">
              <button className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:scale-105 transition-all">
                View on Map
              </button>
            </div>
          </div>
        </aside>

        {/* Results List */}
        <div className="space-y-8 animate-in stagger-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-text-muted">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              <p>Fetching the best experiences...</p>
            </div>
          ) : filteredActivities.length > 0 ? (
            filteredActivities.map((act, i) => (
              <div key={act.id} className="flex flex-col md:flex-row bg-bg-surface border border-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all animate-in" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="relative w-full md:w-72 h-52 md:h-auto overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={act.name}
                  />
                  <div className="absolute top-4 left-4 bg-bg-base/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                    {act.category}
                  </div>
                </div>
                
                <div className="flex-1 p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-serif">{act.name}</h3>
                    <button className="text-text-muted hover:text-accent transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-sm text-text-secondary line-clamp-2 mb-8 flex-1">
                    {act.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
                      <Clock className="w-4 h-4 text-primary" /> {act.duration} min
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
                      <MapPin className="w-4 h-4 text-primary" /> {city.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
                      <Star className="w-4 h-4 text-gold fill-gold" /> 4.9 (120+)
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-white/5">
                    <div>
                      <span className="text-[10px] font-bold text-text-muted uppercase block mb-1">From</span>
                      <span className="text-2xl font-bold text-text-primary">${act.avgCost}</span>
                      <span className="text-xs text-text-muted font-medium ml-1">/ person</span>
                    </div>
                    <button className="px-8 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-primary hover:border-primary transition-all">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center bg-bg-surface/30 rounded-2xl border border-dashed border-border">
               <p className="text-text-muted">No activities match your filters. Try adjusting them!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Discovery
