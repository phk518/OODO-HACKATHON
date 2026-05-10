import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, Checkroom, Smartphone, FileText, Plus, X, Check, RotateCcw, Sparkles, Trash2, ShieldCheck, Thermometer } from 'lucide-react'
import { useData } from '../context/DataContext'

const Packing = () => {
  const [searchParams] = useSearchParams()
  const tripId = searchParams.get('trip')
  const { trips, packing, addPackingItem, togglePackingItem, deletePackingItem } = useData()
  
  const trip = trips.find(t => t.id === tripId)
  const tripItems = packing?.filter(i => i.tripId === tripId) || []
  
  const [newItems, setNewItems] = useState({
    clothing: '',
    electronics: '',
    documents: '',
    toiletries: '',
    general: ''
  })

  const packedCount = tripItems.filter(i => i.isPacked).length
  const totalCount = tripItems.length
  const progress = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0

  const quickAdds = ['Passport', 'Phone Charger', 'Adapter', 'Sunscreen', 'Toothbrush', 'Rain Jacket', 'Power Bank', 'Headphones']

  const categories = [
    { key: 'clothing', label: 'Clothes & Apparel', icon: Checkroom, color: 'text-primary' },
    { key: 'electronics', label: 'Electronics', icon: Smartphone, color: 'text-accent' },
    { key: 'documents', label: 'Documents', icon: FileText, color: 'text-purple-400', priority: true },
    { key: 'toiletries', label: 'Health & Toiletries', icon: Thermometer, color: 'text-success' },
  ]

  const handleAddItem = (cat) => {
    const name = newItems[cat]
    if (!name.trim()) return
    addPackingItem({ tripId, name: name.trim(), category: cat })
    setNewItems({ ...newItems, [cat]: '' })
  }

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16 animate-in">
        <div>
          <nav className="flex items-center gap-2 text-text-muted text-[10px] uppercase tracking-widest font-bold mb-3">
            <Link to="/trips" className="hover:text-primary transition-colors">My Trip</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary font-bold">Packing Checklist</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif mb-2">Packing Checklist</h1>
          <p className="text-text-secondary">Organize your essentials for <span className="text-primary font-bold">{trip?.name || 'your trip'}</span>.</p>
          
          <div className="flex gap-4 mt-8">
            <button className="px-6 py-2 bg-white/5 border border-white/10 text-white text-[10px] font-bold rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5" /> Reset All
            </button>
            <button className="px-6 py-2 bg-accent/20 border border-accent/30 text-accent text-[10px] font-bold rounded-xl hover:bg-accent/30 transition-all uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Add Essentials
            </button>
          </div>
        </div>

        {/* Progress Card */}
        <div className="glass-card p-10 w-full lg:w-96 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-150 transition-transform duration-1000">
            <ShieldCheck className="w-32 h-32" />
          </div>
          <div className="flex justify-between items-end mb-6">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Total Progress</span>
            <span className="text-4xl font-serif font-bold text-accent">{progress}%</span>
          </div>
          <div className="h-2.5 bg-bg-elevated rounded-full overflow-hidden shadow-inner mb-4">
            <div 
              className={`h-full transition-all duration-1000 ${progress === 100 ? 'bg-success shadow-[0_0_12px_rgba(34,197,94,0.4)]' : 'bg-accent shadow-[0_0_12px_rgba(255,107,107,0.4)]'}`} 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest">{packedCount} of {totalCount} items packed</p>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-8 mb-16 animate-in stagger-1">
        {categories.map((cat, i) => (
          <section key={cat.key} className={`col-span-12 ${i < 2 ? 'lg:col-span-6' : 'lg:col-span-6'} glass-card p-8 flex flex-col`}>
             <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                 <cat.icon className={`w-5 h-5 ${cat.color}`} />
                 <h3 className="text-lg font-serif font-bold">{cat.label}</h3>
               </div>
               {cat.priority && <span className="bg-accent/10 text-accent border border-accent/20 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest">Priority</span>}
             </div>

             <div className="flex-1 space-y-3 mb-8">
               {tripItems.filter(item => item.category === cat.key).map(item => (
                 <div 
                  key={item.id} 
                  onClick={() => togglePackingItem(item.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${item.isPacked ? 'bg-bg-elevated/30 border-border opacity-50' : 'bg-bg-elevated border-border hover:border-primary/50'}`}
                 >
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${item.isPacked ? 'bg-success border-success text-white' : 'border-border'}`}>
                     {item.isPacked && <Check className="w-3.5 h-3.5" />}
                   </div>
                   <span className={`text-sm flex-1 ${item.isPacked ? 'line-through text-text-muted' : 'text-white'}`}>{item.name}</span>
                   <button 
                    onClick={(e) => { e.stopPropagation(); deletePackingItem(item.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1.5 hover:text-accent transition-all"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                 </div>
               ))}
               {tripItems.filter(item => item.category === cat.key).length === 0 && (
                 <div className="py-8 text-center text-text-muted text-xs italic opacity-50">Empty category</div>
               )}
             </div>

             <div className="flex gap-2 mt-auto">
               <input 
                type="text" 
                className="flex-1 bg-bg-elevated border border-border rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-primary/50 transition-all"
                placeholder={`Add ${cat.key}...`}
                value={newItems[cat.key]}
                onChange={(e) => setNewItems({...newItems, [cat.key]: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleAddItem(cat.key)}
               />
               <button 
                onClick={() => handleAddItem(cat.key)}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:scale-105 transition-all"
               >
                 Add
               </button>
             </div>
          </section>
        ))}

        {/* General/Other Essentials */}
        <section className="col-span-12 glass-card p-10 animate-in stagger-2">
           <h3 className="text-xl font-serif font-bold mb-8 flex items-center gap-2">
             <Plus className="w-5 h-5 text-primary" /> Other Essentials
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {tripItems.filter(item => item.category === 'general').map(item => (
                <div 
                  key={item.id} 
                  onClick={() => togglePackingItem(item.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${item.isPacked ? 'bg-bg-elevated/30 border-border opacity-50' : 'bg-bg-elevated border-border hover:border-primary/50'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${item.isPacked ? 'bg-success border-success text-white' : 'border-border'}`}>
                    {item.isPacked && <Check className="w-3 h-3" />}
                  </div>
                  <span className={`text-sm flex-1 ${item.isPacked ? 'line-through text-text-muted' : 'text-white'}`}>{item.name}</span>
                  <button onClick={(e) => { e.stopPropagation(); deletePackingItem(item.id); }} className="opacity-0 group-hover:opacity-100 p-1.5 hover:text-accent transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
             ))}
           </div>
        </section>
      </div>

      {/* Quick Add Suggestions */}
      <div className="animate-in stagger-3">
        <h3 className="text-xl font-serif mb-6">Quick Add Suggestions</h3>
        <div className="flex flex-wrap gap-3">
          {quickAdds.map(tag => (
            <button 
              key={tag} 
              onClick={() => addPackingItem({ tripId, name: tag, category: 'general' })}
              className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-text-secondary hover:bg-primary/10 hover:border-primary hover:text-primary transition-all"
            >
              + {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Packing
