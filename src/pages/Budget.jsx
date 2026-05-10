import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ChevronRight, Share2, Download, Settings, FileText, PieChart, MapPin, X, CreditCard, Hotel, Plane, Utensils, ShoppingBag } from 'lucide-react'
import { useData } from '../context/DataContext'

const Budget = () => {
  const [searchParams] = useSearchParams()
  const tripId = searchParams.get('trip')
  const { trips, stops, activities, budgets } = useData()
  const [showEditModal, setShowEditModal] = useState(false)
  
  const trip = trips.find(t => t.id === tripId)
  const tripStops = stops.filter(s => s.tripId === tripId)
  const budget = budgets.find(b => b.tripId === tripId) || { totalBudget: 0, transport: 0, accommodation: 0, activities: 0, meals: 0, miscellaneous: 0 }
  
  const tripActivities = activities.filter(a => tripStops.some(s => s.id === a.stopId))
  const totalSpent = tripActivities.reduce((acc, a) => acc + (a.cost || 0), 0)
  const remaining = budget.totalBudget - totalSpent

  const categories = [
    { key: 'transport', label: 'Transport', icon: Plane, color: 'text-primary', bg: 'bg-primary/10' },
    { key: 'accommodation', label: 'Lodging', icon: Hotel, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { key: 'activities', label: 'Activities', icon: CreditCard, color: 'text-success', bg: 'bg-success/10' },
    { key: 'meals', label: 'Dining', icon: Utensils, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { key: 'miscellaneous', label: 'Misc', icon: ShoppingBag, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  ]

  const MockPie = () => (
    <div className="relative w-48 h-48 mx-auto">
      <div className="absolute inset-0 rounded-full border-[12px] border-bg-elevated/50" />
      <div className="absolute inset-0 rounded-full border-[12px] border-primary border-t-transparent border-r-transparent rotate-45 shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-white">{Math.round((totalSpent / (budget.totalBudget || 1)) * 100)}%</div>
        <div className="text-[8px] font-bold text-text-muted uppercase tracking-widest">Spent</div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 animate-in">
        <div>
          <nav className="flex items-center gap-2 text-text-muted text-[10px] uppercase tracking-widest font-bold mb-3">
            <Link to="/trips" className="hover:text-primary transition-colors">My Trips</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary">{trip?.name || 'Trip'}</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary">Expenses & Billing</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-serif mb-2">Expense Report</h1>
          <p className="text-text-secondary">Detailed breakdown for trip ID: <span className="font-mono text-xs opacity-70">#TRP-{tripId?.substring(0,8).toUpperCase()}</span></p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all text-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Stats Bento */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-in stagger-1">
        {[
          { label: 'Total Budget', value: `$${(budget.totalBudget || 0).toLocaleString()}`, color: 'text-white' },
          { label: 'Total Spent', value: `$${totalSpent.toLocaleString()}`, color: 'text-accent' },
          { label: 'Remaining', value: `$${remaining.toLocaleString()}`, color: remaining < 0 ? 'text-accent' : 'text-success' },
          { label: 'Status', value: remaining < 0 ? 'Over Budget' : 'Under Budget', badge: true }
        ].map((s, i) => (
          <div key={i} className="glass-card p-6 flex flex-col justify-between min-h-[120px]">
             <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{s.label}</div>
             {s.badge ? (
               <div className="mt-2">
                 <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${remaining < 0 ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-success/20 text-success border border-success/30'}`}>
                   {s.value}
                 </span>
               </div>
             ) : (
               <div className={`text-2xl font-serif font-bold ${s.color}`}>{s.value}</div>
             )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        {/* Main Table */}
        <section className="bg-bg-surface border border-border rounded-2xl overflow-hidden animate-in stagger-2">
          <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/2">
            <h3 className="text-xl font-serif font-bold">Expense Breakdown</h3>
            <button onClick={() => setShowEditModal(true)} className="p-2 bg-white/5 border border-white/10 rounded-lg text-text-muted hover:text-primary transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-8 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest">Description</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right">Date</th>
                  <th className="px-8 py-4 text-[10px] font-bold text-text-muted uppercase tracking-widest text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/2">
                {tripActivities.length > 0 ? tripActivities.map((a, i) => {
                  const cat = categories.find(c => c.key === a.category) || categories[2]
                  return (
                    <tr key={i} className="hover:bg-white/2 transition-colors">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.bg} border border-white/5`}>
                            <cat.icon className={`w-4 h-4 ${cat.color}`} />
                          </div>
                          <span className="text-xs font-bold text-white">{cat.label}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <div className="text-sm font-medium text-white">{a.name}</div>
                        <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{tripStops.find(s => s.id === a.stopId)?.cityName}</div>
                      </td>
                      <td className="px-8 py-4 text-right text-xs text-text-muted font-bold">
                        {new Date(tripStops.find(s => s.id === a.stopId)?.arrivalDate || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-8 py-4 text-right text-sm font-bold text-white">
                        ${(a.cost || 0).toLocaleString()}
                      </td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center text-text-muted italic text-sm">
                      No expenses recorded yet. Add activities to see breakdown.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-8 animate-in stagger-3">
          <div className="bg-primary rounded-2xl p-8 relative overflow-hidden shadow-2xl group">
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
             <div className="flex justify-between items-start mb-10 relative z-10">
               <div>
                 <h3 className="text-2xl font-serif text-white">Invoice Summary</h3>
                 <p className="text-[10px] text-white/70 font-bold uppercase tracking-[0.2em]">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Billing Period</p>
               </div>
               <FileText className="w-10 h-10 text-white/20" />
             </div>
             <div className="space-y-4 pt-8 border-t border-white/20 relative z-10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Subtotal</span>
                  <span className="text-white font-bold">${totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Service Fee (0%)</span>
                  <span className="text-white font-bold">$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/30">
                  <span className="text-white">Total Paid</span>
                  <span className="text-white">${totalSpent.toLocaleString()}</span>
                </div>
             </div>
             <button className="w-full mt-10 py-4 bg-accent text-white font-bold rounded-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-sm flex items-center justify-center gap-2 relative z-10">
               <Download className="w-4 h-4" /> Download PDF Receipt
             </button>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-lg font-serif mb-8 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" /> Spend by Category
            </h3>
            <MockPie />
            <div className="mt-10 space-y-3">
               {categories.map((c, i) => {
                 const catTotal = tripActivities.filter(a => a.category === c.key).reduce((sum, act) => sum + (act.cost || 0), 0)
                 if (catTotal === 0 && i > 2) return null
                 const pct = totalSpent > 0 ? Math.round((catTotal / totalSpent) * 100) : 0
                 return (
                   <div key={i} className="flex justify-between items-center text-[10px] font-bold">
                     <div className="flex items-center gap-3 text-text-secondary">
                        <div className={`w-2 h-2 rounded-full ${c.color.replace('text-', 'bg-')}`} /> {c.label}
                     </div>
                     <span className="text-white">{pct}%</span>
                   </div>
                 )
               })}
            </div>
          </div>

          <div className="relative h-40 rounded-2xl overflow-hidden group border border-border">
            <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" alt="Map" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base to-transparent p-6 flex flex-col justify-end">
              <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Trip Location</div>
              <div className="flex items-center gap-2 text-white font-serif font-bold">
                <MapPin className="w-4 h-4 text-primary" /> {tripStops[0]?.cityName || 'Amalfi Coast'}, {tripStops[0]?.countryCode || 'IT'}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Edit Budget Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-bg-base/80 backdrop-blur-md" onClick={() => setShowEditModal(false)} />
          <div className="relative z-10 w-full max-w-lg glass-card p-10 animate-in">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-serif">Set Budget Targets</h2>
               <button onClick={() => setShowEditModal(false)}><X className="w-6 h-6" /></button>
             </div>
             <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Total Trip Budget ($)</label>
                  <input type="number" defaultValue={budget.totalBudget} className="w-full bg-bg-elevated border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((c, i) => (
                    <div key={i} className="space-y-2">
                      <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">{c.label}</label>
                      <input type="number" defaultValue={budget[c.key]} className="w-full bg-bg-elevated border border-border rounded-lg py-2 px-3 text-sm text-white outline-none focus:border-primary/50 transition-all" />
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                  Save Budget Goals
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Budget
