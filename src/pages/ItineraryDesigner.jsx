import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Plus, Trash2, Calendar, DollarSign, Search, Clock, MapPin, Lightbulb, ChevronRight, GripVertical, X } from 'lucide-react'

const ItineraryDesigner = () => {
  const [searchParams] = useSearchParams()
  const tripId = searchParams.get('trip')
  
  const [sections, setSections] = useState([])
  const [trip, setTrip] = useState({ name: 'Your Adventure', startDate: '2026-06-01', endDate: '2026-06-14' })
  const [showCityModal, setShowCityModal] = useState(false)
  const [showActModal, setShowActModal] = useState(false)
  const [activeSectionId, setActiveSectionId] = useState(null)
  
  useEffect(() => {
    // Initial data load
    const savedStops = JSON.parse(localStorage.getItem('tl_stops') || '[]').filter(s => s.tripId === tripId)
    setSections(savedStops)
  }, [tripId])

  const totalBudget = sections.reduce((acc, s) => {
    const acts = JSON.parse(localStorage.getItem('tl_activities') || '[]').filter(a => a.stopId === s.id)
    return acc + acts.reduce((sum, a) => sum + (a.cost || 0), 0)
  }, 0)

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 animate-in">
        <div>
          <nav className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-widest font-bold mb-3">
            <Link to="/dashboard" className="hover:text-primary transition-colors">My Trips</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">Build Itinerary</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif mb-2">Design Your Adventure</h1>
          <p className="text-text-secondary">Structure your trip into manageable sections, activities, and milestones.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm">
            Save Draft
          </button>
          <button className="px-6 py-2.5 bg-accent text-white font-bold rounded-xl hover:scale-105 transition-all text-sm shadow-xl">
            Publish Itinerary
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
        {/* Left: Sections */}
        <div className="space-y-8 animate-in stagger-1">
          {sections.map((section, idx) => (
            <div key={section.id} className="bg-bg-surface border border-border rounded-2xl overflow-hidden animate-in">
              <div className="bg-bg-elevated/50 px-8 py-4 flex justify-between items-center border-b border-border">
                <div className="flex items-center gap-4">
                  <GripVertical className="w-5 h-5 text-text-muted cursor-grab" />
                  <h3 className="font-serif text-lg font-bold">Section {idx + 1}: {section.cityName}</h3>
                </div>
                <button className="text-text-muted hover:text-accent transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Section Title</label>
                    <input className="w-full bg-bg-base border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all" defaultValue={section.cityName} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Category</label>
                    <select className="w-full bg-bg-base border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all">
                      <option>Transport</option>
                      <option>Accommodation</option>
                      <option selected>Activity</option>
                      <option>Dining</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Start Date</label>
                    <input type="date" className="w-full bg-bg-base border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all" defaultValue={section.arrivalDate} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">End Date</label>
                    <input type="date" className="w-full bg-bg-base border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all" defaultValue={section.departureDate} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Budget</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input type="number" className="w-full bg-bg-base border border-border rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-primary/50 transition-all" defaultValue={150} readOnly />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <div className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-6">Activities & Logistics</div>
                  <div className="space-y-3 mb-6">
                    {/* Activity items would go here */}
                    <div className="bg-bg-base/50 border border-border rounded-xl p-4 flex justify-between items-center group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-bg-elevated rounded-lg flex items-center justify-center font-bold">📍</div>
                        <div>
                          <div className="text-sm font-bold">Museum Tour</div>
                          <div className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Sightseeing · 120m · $45</div>
                        </div>
                      </div>
                      <button className="text-text-muted hover:text-accent transition-colors opacity-0 group-hover:opacity-100">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setActiveSectionId(section.id); setShowActModal(true); }}
                    className="w-full py-3 border border-dashed border-border rounded-xl text-text-muted text-sm font-medium hover:border-primary hover:text-primary transition-all"
                  >
                    + Add Real-World Activity
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setShowCityModal(true)}
            className="w-full py-16 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-4 text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group"
          >
            <div className="w-12 h-12 bg-bg-elevated rounded-full flex items-center justify-center border border-border group-hover:border-primary/50 transition-all">
              <Plus className="w-6 h-6" />
            </div>
            <div className="text-center">
              <div className="text-lg font-serif font-bold">Add Another Section</div>
              <p className="text-sm">Click to insert a new destination or activity block</p>
            </div>
          </button>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-8 animate-in stagger-2">
          <div className="glass-card p-8">
            <h3 className="text-xl font-serif mb-8">Trip Overview</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Estimated Budget</span>
                <span className="text-lg font-bold text-primary">${totalBudget.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Total Duration</span>
                <span className="text-sm font-bold">14 Days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-text-secondary">Sections Completed</span>
                <span className="text-sm font-bold">{sections.length} / {sections.length}</span>
              </div>
              <div className="pt-6 border-t border-white/5 space-y-3">
                <div className="flex justify-between text-xs font-bold text-text-muted">
                  <span>COMPLETION</span>
                  <span>100%</span>
                </div>
                <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <Lightbulb className="w-5 h-5 fill-primary" />
              <h3 className="font-serif font-bold">Planning Tips</h3>
            </div>
            <ul className="space-y-4 text-xs text-primary leading-relaxed list-disc pl-4">
              <li>Break long trips into 3-4 day sections for better focus.</li>
              <li>Include buffer days for unexpected delays or spontaneous exploration.</li>
              <li>Sync your dates with local festival calendars for extra excitement.</li>
            </ul>
          </div>

          <div className="relative h-48 rounded-2xl overflow-hidden group border border-border">
            <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Map Preview" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-bg-base/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white border border-white/10 shadow-xl">
              <MapPin className="w-3 h-3 text-primary" />
              Tokyo, Japan
            </div>
          </div>
        </aside>
      </div>

      {/* Modals (simplified for now) */}
      {showCityModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-bg-base/80 backdrop-blur-md" onClick={() => setShowCityModal(false)} />
          <div className="relative z-10 w-full max-w-2xl glass-card p-10 animate-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif">Select Destination</h2>
              <button onClick={() => setShowCityModal(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="relative mb-8 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input type="text" placeholder="Search cities..." className="w-full bg-bg-elevated border border-border rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all" />
            </div>
            <div className="grid grid-cols-2 gap-4 max-height-[400px] overflow-y-auto pr-2">
              {/* City cards would go here */}
              <div className="bg-bg-elevated border border-border p-4 rounded-xl flex items-center gap-4 cursor-pointer hover:border-primary transition-all">
                <div className="text-2xl">🗼</div>
                <div>
                  <div className="text-sm font-bold">Paris</div>
                  <div className="text-xs text-text-muted">France</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItineraryDesigner
