import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MessageCircle, Share2, PlusCircle, TrendingUp, Users, Flame, BookOpen } from 'lucide-react'
import { useData } from '../context/DataContext'

const Community = () => {
  const { sessionUser, trips, stops } = useData()
  const [activeTab, setActiveTab] = useState('discover')
  const [showShareModal, setShowShareModal] = useState(false)
  
  const [posts, setPosts] = useState([
    { id:'cp1', userName:'Sarah Jenkins', initials:'SJ', tripName:'Tokyo Essentials', caption:'The mix of traditional temples and futuristic neon was breathtaking. Here is my optimized itinerary focused on hidden shrines!', stops:['Tokyo','Kyoto'], images:['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf','https://images.unsplash.com/photo-1503899036084-c55cdd92da26'], days:10, likes:1240 },
    { id:'cp2', userName:'Marcus Chen', initials:'MC', tripName:'Swiss Alps Adventure', caption:'Nothing beats the Swiss rail system for a seamless trip. Lauterbrunnen is even more magical in person.', stops:['Interlaken','Zermatt'], images:['https://images.unsplash.com/photo-1533105079780-92b9be482077'], days:7, likes:956 }
  ])

  const trending = [
    { name: 'Santorini, Greece', growth: '+24%', rank: '01' },
    { name: 'Bali, Indonesia', growth: '+18%', rank: '02' },
    { name: 'Tokyo, Japan', growth: '+12%', rank: '03' },
  ]

  return (
    <div className="container mx-auto px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 animate-in">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif mb-2">Community Hub</h1>
          <p className="text-text-secondary">Connect with fellow travelers and explore proven itineraries.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('trending')}
            className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'trending' ? 'bg-primary text-white' : 'bg-white/5 border border-white/10 text-text-secondary hover:bg-white/10'}`}
          >
            <Flame className="w-4 h-4" /> Trending
          </button>
          <button 
            onClick={() => setShowShareModal(true)}
            className="px-6 py-2.5 bg-accent text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Share My Trip
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
        {/* Feed */}
        <div className="space-y-12 animate-in stagger-1">
          {posts.map((post, i) => (
            <article key={post.id} className="bg-bg-surface border border-border rounded-2xl overflow-hidden group hover:border-primary/50 transition-all animate-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="p-8 flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-lg">
                    {post.initials}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold">{post.userName}</h3>
                    <p className="text-xs text-text-muted uppercase tracking-widest font-bold">Shared a trip · {post.days} days</p>
                  </div>
                </div>
                <span className="bg-bg-elevated px-2 py-1 rounded text-[10px] font-bold text-text-muted border border-border tracking-widest">GLOBAL</span>
              </div>

              <div className="px-8 pb-8 space-y-6">
                <p className="text-text-primary leading-relaxed">{post.caption}</p>
                
                {post.images.length > 0 && (
                  <div className="grid grid-cols-[2fr_1fr] gap-2 h-60 rounded-xl overflow-hidden">
                    <img src={post.images[0]} className="w-full h-full object-cover" alt="Trip" />
                    <img src={post.images[1] || post.images[0]} className="w-full h-full object-cover" alt="Trip" />
                  </div>
                )}

                <div className="pl-6 border-l-2 border-border space-y-4 ml-3">
                  {post.stops.map((stop, sidx) => (
                    <div key={sidx} className="relative">
                      <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-bg-surface shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      <div className="text-xs font-bold text-accent uppercase tracking-widest">{stop}</div>
                      <div className="text-[10px] text-text-muted">Explore the highlights of {stop}.</div>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                  <div className="flex gap-8">
                    <button className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors group">
                      <Heart className="w-5 h-5 group-hover:fill-accent" />
                      <span className="text-xs font-bold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-xs font-bold">24</span>
                    </button>
                    <button className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="px-6 py-2 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-lg hover:bg-primary hover:border-primary transition-all">
                    View Full Itinerary
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 animate-in stagger-2">
          <div className="bg-gradient-to-br from-primary to-accent-dark rounded-2xl p-8 shadow-2xl">
            <h3 className="text-xl font-serif text-white mb-8 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> Trending
            </h3>
            <div className="space-y-6">
              {trending.map((item, i) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-white/50">{item.rank}</span>
                    <span className="text-sm font-bold text-white">{item.name}</span>
                  </div>
                  <span className="bg-accent text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">{item.growth}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-2.5 border border-white/20 text-white text-xs font-bold rounded-lg hover:bg-white/10 transition-all">
              Explore All
            </button>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-xl font-serif mb-8 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> Top Contributors
            </h3>
            <div className="space-y-6">
              {[
                { name: 'Alex Rivera', role: '42 Itineraries', color: 'from-primary to-primary-dark' },
                { name: 'Elena Soprano', role: '28 Itineraries', color: 'from-accent to-accent-dark' }
              ].map((c, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center font-bold text-white shadow-lg`}>
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{c.name}</div>
                      <div className="text-[10px] text-text-muted">{c.role}</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-bold rounded-lg hover:bg-primary transition-all">Follow</button>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group border border-border">
            <img src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=400" className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700" alt="Guide" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent p-6 flex flex-col justify-end">
              <div className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-2">Featured Guide</div>
              <h4 className="font-serif text-lg font-bold mb-4">Ultimate Road Trip Hacks</h4>
              <button className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" /> Read Guide
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Share Modal (Simplified) */}
      {showShareModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-bg-base/80 backdrop-blur-md" onClick={() => setShowShareModal(false)} />
          <div className="relative z-10 w-full max-w-lg glass-card p-10 animate-in">
             <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-serif">Share Your Journey</h2>
               <button onClick={() => setShowShareModal(false)} className="text-text-muted hover:text-white transition-colors">
                 <X className="w-6 h-6" />
               </button>
             </div>
             <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Select Trip</label>
                  <select className="w-full bg-bg-elevated border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all">
                    {trips.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    {trips.length === 0 && <option>No trips available</option>}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Caption</label>
                  <textarea rows="4" className="w-full bg-bg-elevated border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all resize-none" placeholder="Focus on local food and hidden shrines..." />
                </div>
                <button className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                  🌍 Publish Itinerary
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  )
}

const X = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

export default Community
