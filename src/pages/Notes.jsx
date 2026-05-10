import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Plus, MapPin, Trash2, Edit3, Save, X, FileText, Calendar, Wallet, Luggage } from 'lucide-react'
import { useData } from '../context/DataContext'

const Notes = () => {
  const [searchParams] = useSearchParams()
  const tripId = searchParams.get('trip')
  const { trips, stops, notes, addNote, deleteNote, updateNote } = useData()
  
  const trip = trips.find(t => t.id === tripId)
  const tripStops = stops.filter(s => s.tripId === tripId)
  const tripNotes = notes?.filter(n => n.tripId === tripId) || []
  
  const [content, setContent] = useState('')
  const [selectedStopId, setSelectedStopId] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState('')

  const filteredNotes = tripNotes.filter(n => {
    if (filter === 'general') return !n.stopId
    if (filter === 'stops') return !!n.stopId
    return true
  })

  const handleAdd = () => {
    if (!content.trim()) return
    addNote({ tripId, stopId: selectedStopId || null, content: content.trim() })
    setContent('')
    setSelectedStopId('')
  }

  const handleSaveEdit = (id) => {
    updateNote(id, { content: editContent.trim() })
    setEditingId(null)
  }

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-12 animate-in">
        <Link to={`/itinerary?trip=${tripId}`} className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Itinerary
        </Link>
        <h1 className="text-4xl md:text-5xl font-serif mb-2">Trip Notes & Journal</h1>
        <p className="text-text-secondary">{trip?.name}</p>
      </div>

      {/* Add Note Card */}
      <div className="glass-card p-10 mb-12 animate-in stagger-1">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
          <Plus className="w-4 h-4 text-primary" /> New Note
        </h3>
        <div className="space-y-6">
          <textarea 
            className="w-full bg-bg-elevated border border-border rounded-2xl p-6 text-white outline-none focus:border-primary/50 transition-all min-h-[140px] resize-none shadow-inner"
            placeholder="Write a note, reminder, or journal entry..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest shrink-0">Linked to:</label>
              <select 
                className="bg-bg-elevated border border-border rounded-xl py-2 px-4 text-xs font-bold text-white outline-none focus:border-primary/50 transition-all shadow-sm flex-1 md:w-56"
                value={selectedStopId}
                onChange={(e) => setSelectedStopId(e.target.value)}
              >
                <option value="">General Trip Note</option>
                {tripStops.map(s => <option key={s.id} value={s.id}>{s.cityName}</option>)}
              </select>
            </div>
            <button 
              onClick={handleAdd}
              className="w-full md:w-auto px-10 py-3 bg-primary text-white font-bold rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all text-sm"
            >
              Add Note
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-10 animate-in stagger-1">
        {['all', 'general', 'stops'].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-lg' : 'bg-white/5 border border-white/10 text-text-muted hover:bg-white/10'}`}
          >
            {f === 'all' ? '📋 All' : f === 'general' ? '🗒️ General' : '📍 Stops'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
        {/* Sidebar */}
        <aside className="space-y-8 animate-in stagger-2">
          <div className="glass-card p-8 text-center">
            <div className="text-5xl mb-6">📝</div>
            <h4 className="text-xl font-serif font-bold mb-2 truncate">{trip?.name}</h4>
            <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-8">
              {new Date(trip?.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(trip?.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <div className="space-y-4 pt-8 border-t border-white/5">
               <div className="flex justify-between items-center text-xs font-bold">
                 <span className="text-text-muted">Total Notes</span>
                 <span className="text-white">{tripNotes.length}</span>
               </div>
               <div className="flex justify-between items-center text-xs font-bold">
                 <span className="text-text-muted">General</span>
                 <span className="text-white">{tripNotes.filter(n => !n.stopId).length}</span>
               </div>
               <div className="flex justify-between items-center text-xs font-bold">
                 <span className="text-text-muted">Stop-linked</span>
                 <span className="text-white">{tripNotes.filter(n => !!n.stopId).length}</span>
               </div>
            </div>
            <div className="mt-10 space-y-3 pt-8 border-t border-white/5">
              <Link to={`/packing?trip=${tripId}`} className="w-full py-3 bg-white/5 border border-white/10 text-white text-[10px] font-bold rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest hover:bg-white/10 transition-all">
                <Luggage className="w-3.5 h-3.5" /> Packing List
              </Link>
              <Link to={`/budget?trip=${tripId}`} className="w-full py-3 bg-white/5 border border-white/10 text-white text-[10px] font-bold rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest hover:bg-white/10 transition-all">
                <Wallet className="w-3.5 h-3.5" /> Budget
              </Link>
            </div>
          </div>
        </aside>

        {/* Notes List */}
        <div className="space-y-6 animate-in stagger-2">
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">{filteredNotes.length} notes found</div>
          {filteredNotes.length > 0 ? filteredNotes.map((note, i) => {
            const stop = tripStops.find(s => s.id === note.stopId)
            const isEditing = editingId === note.id
            
            return (
              <div key={note.id} className={`group bg-bg-surface border border-border rounded-2xl p-8 relative overflow-hidden hover:border-primary/50 transition-all ${stop ? 'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-accent' : 'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
                      {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {stop && (
                      <span className="px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <MapPin className="w-2.5 h-2.5" /> {stop.cityName}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingId(note.id); setEditContent(note.content); }} className="p-2 bg-white/5 border border-white/10 rounded-lg text-text-muted hover:text-primary transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteNote(note.id)} className="p-2 bg-white/5 border border-white/10 rounded-lg text-text-muted hover:text-accent transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <textarea 
                      className="w-full bg-bg-elevated border border-border rounded-xl p-4 text-sm text-white outline-none focus:border-primary/50 transition-all min-h-[100px] resize-none"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div className="flex gap-2">
                       <button onClick={() => handleSaveEdit(note.id)} className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-2">
                         <Save className="w-3.5 h-3.5" /> Save
                       </button>
                       <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-lg flex items-center gap-2">
                         <X className="w-3.5 h-3.5" /> Cancel
                       </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
                )}
              </div>
            )
          }) : (
            <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl">
              <FileText className="w-12 h-12 text-text-muted mx-auto mb-6 opacity-20" />
              <h3 className="text-xl font-serif text-text-muted">No notes yet</h3>
              <p className="text-text-muted text-xs">Write your first note above — reminders, journal entries, or hotel check-in details!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notes
