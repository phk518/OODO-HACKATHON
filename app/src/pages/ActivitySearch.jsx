import { useState } from 'react'

const SIGHTSEEING = [
  { id: 1, name: 'Senso-ji Temple Morning Walk', desc: "Experience the tranquility of Tokyo's oldest temple before the crowds arrive. Guided sunrise tour included.", rating: '4.9', badge: 'TOP RATED', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWCXd9Np4Mj9mLGfcHfA0ZBkhXe-Joqd_26RIKk7mtuY6GHUyjwMTRayk8lAq0_9zqSrJhMhYYKLlh87avE_wMB-GcJdV2Bf9fpHcGOYjzeX1UTvurRzrz3trEGbroDXYWM4XoRSIDuBY4MQyyJUf3Wbp4oRMrCXnLIfx0JGnTFDV074RX3bkmA-74901jjYeave-gIK_gexSJYVrKrfbshgjbHCtFOW0zlf8yyGZP711Sd-h0PiJNIMLYmt8zGf8ddF8zA1IhlME', large: true },
  { id: 2, name: 'Imperial Palace', sub: 'Historic • 2h • Free', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4HtoG4irb59Nt6HFb_yQ1nnZZd954LlxMCJe0Q73TC9Nc5vHrOrS1LfFRFdUYvcoZCuHwxxwAHxcIDz2uofGdB4VMRyZnFphOoN2chf9dsx5gz1h0iZKdFN_h4qXHcGPiC-ceRi7FmGqHo-QOxQyCPbTyf2Mn3gS55R_Hy2YW6AKa95DAAyXEMbSZdqAd_g78YdJ_oq5aSIzS5ordPhyfoUp-pNlgkTGWVkJnX8X3Xr6jqjroVyhu-Ix5ESOd_M1Yi_AaQvIuio' },
  { id: 3, name: 'Tokyo Tower Sunset', sub: 'Observation • 1h • $25', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4HtoG4irb59Nt6HFb_yQ1nnZZd954LlxMCJe0Q73TC9Nc5vHrOrS1LfFRFdUYvcoZCuHwxxwAHxcIDz2uofGdB4VMRyZnFphOoN2chf9dsx5gz1h0iZKdFN_h4qXHcGPiC-ceRi7FmGqHo-QOxQyCPbTyf2Mn3gS55R_Hy2YW6AKa95DAAyXEMbSZdqAd_g78YdJ_oq5aSIzS5ordPhyfoUp-pNlgkTGWVkJnX8X3Xr6jqjroVyhu-Ix5ESOd_M1Yi_AaQvIuio' },
]

const FOOD = [
  { id: 4, name: 'Tsukiji Market Breakfast', desc: 'Fresh sushi tour and chef workshop.', price: '$45 / person', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHIxo26D9BFiibXt5UoWv8DQwU_DHv-W3WGH_W5i2-0QhGyacNH-rA0i2XoNTa0qCg6BzzumI9w4l1744cb1boeJ-OLUqqUP_0POWo9OCMOZ_kWmNkIsrJ07ZxD7N2MkAGuJ5a6u97U8ESjzfenzCAoCbwQQ35piAvPX7W9HOcXg5Ql2MrNZTPtBOmT1xzopibV0T66bJRZGxb5P5KLD20Lrll1gSumFDuhnNHpaWobj-Apo_aF7n2LTpyGXw_A6Xu0_jVSS_W8n0' },
  { id: 5, name: 'Ramen Masterclass', desc: 'Learn to make broth from scratch.', price: '$60 / person', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4HtoG4irb59Nt6HFb_yQ1nnZZd954LlxMCJe0Q73TC9Nc5vHrOrS1LfFRFdUYvcoZCuHwxxwAHxcIDz2uofGdB4VMRyZnFphOoN2chf9dsx5gz1h0iZKdFN_h4qXHcGPiC-ceRi7FmGqHo-QOxQyCPbTyf2Mn3gS55R_Hy2YW6AKa95DAAyXEMbSZdqAd_g78YdJ_oq5aSIzS5ordPhyfoUp-pNlgkTGWVkJnX8X3Xr6jqjroVyhu-Ix5ESOd_M1Yi_AaQvIuio' },
]

const ADVENTURE = [
  { id: 6, name: 'Street Go-Karting', desc: "Cosplay through Tokyo's neon streets.", price: '$75 / person', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4HtoG4irb59Nt6HFb_yQ1nnZZd954LlxMCJe0Q73TC9Nc5vHrOrS1LfFRFdUYvcoZCuHwxxwAHxcIDz2uofGdB4VMRyZnFphOoN2chf9dsx5gz1h0iZKdFN_h4qXHcGPiC-ceRi7FmGqHo-QOxQyCPbTyf2Mn3gS55R_Hy2YW6AKa95DAAyXEMbSZdqAd_g78YdJ_oq5aSIzS5ordPhyfoUp-pNlgkTGWVkJnX8X3Xr6jqjroVyhu-Ix5ESOd_M1Yi_AaQvIuio' },
  { id: 7, name: 'Mount Mitake Hike', desc: 'Day trip to the sacred mountains.', price: '$120 / person', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-E5ppeXKIgAIrVfDOPoJAPmN_hZ4e89pr0aJFK4R9Hy-c_5HZJoZVkcbddA7x2ggIHntrIu4P99zbJ4Gb-1kxb4TE9GuejyRa99tP3FfjVDxPYdkVqDMuO_lAW9ePeaXxtQ4QAzmrblCiUI3W6ljnD6gmeMWsWvHaEhvCFMIEcT1lTWuyIwBuxiKLZpfBnT83FbqKitgs8WV49GIcuB3KAFlhW7Mc1kFv0J81BXLp8Nq5eY06zOo1Y0kDnt3oWuv5g3RNkwSPNAU' },
]

function ActivityCard({ act }) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-outline-variant/10 group">
      <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
        <img className="w-full h-full object-cover" src={act.img} alt={act.name} />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h6 className="font-heading text-lg font-semibold text-on-surface group-hover:text-primary transition-colors">{act.name}</h6>
          <p className="text-on-surface-variant text-sm font-semibold truncate">{act.desc}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary">{act.price}</span>
          <button className="material-symbols-outlined p-2 rounded-full bg-secondary-container/20 text-primary hover:bg-primary-container hover:text-white transition-all">add</button>
        </div>
      </div>
    </div>
  )
}

export default function ActivitySearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount] = useState(3)

  return (
    <div>
      {/* Search & Filters */}
      <section className="mb-12">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="font-heading text-3xl font-bold text-on-surface mb-2">Discovery</h2>
            <p className="text-secondary font-body text-lg">Find the perfect activities for your Tokyo stopover.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full pl-12 pr-4 py-4 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all shadow-sm" placeholder="Search activities, locations..." type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-label text-sm font-semibold shadow-md active:scale-95 transition-all">
                <span className="material-symbols-outlined text-xl">tune</span> Filters
              </button>
              {['Type: Adventure', 'Cost: $$', 'Duration: 2-4h'].map(f => (
                <button key={f} className="flex items-center gap-2 px-6 py-3 bg-white border border-outline-variant/30 text-secondary rounded-xl font-label text-sm font-semibold hover:bg-surface-container-low transition-colors whitespace-nowrap">{f}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sightseeing Bento */}
      <section className="space-y-12">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-2xl font-semibold text-on-surface">Sightseeing Essentials</h3>
            <button className="text-primary font-label text-sm font-semibold hover:underline decoration-2 underline-offset-4">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
            {/* Large Feature */}
            <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-white" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent z-10" />
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={SIGHTSEEING[0].img} alt={SIGHTSEEING[0].name} />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full tracking-wider">{SIGHTSEEING[0].badge}</span>
                  <span className="flex items-center gap-1 text-white text-sm font-semibold"><span className="material-symbols-outlined filled text-base">star</span> {SIGHTSEEING[0].rating}</span>
                </div>
                <h4 className="text-white font-heading text-3xl font-bold mb-2">{SIGHTSEEING[0].name}</h4>
                <p className="text-white/80 font-body mb-6 max-w-xl">{SIGHTSEEING[0].desc}</p>
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-primary-container text-on-primary-container font-label text-sm font-semibold rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all">Add to Trip</button>
                  <button className="px-8 py-3 bg-white/20 backdrop-blur-md text-white border border-white/30 font-label text-sm font-semibold rounded-xl hover:bg-white/30 transition-all">Quick View</button>
                </div>
              </div>
            </div>
            {/* Side stack */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {SIGHTSEEING.slice(1).map(s => (
                <div key={s.id} className="flex-1 group relative overflow-hidden rounded-xl bg-white" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent z-10" />
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={s.img} alt={s.name} />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <h5 className="text-white font-heading text-2xl font-semibold">{s.name}</h5>
                    <p className="text-white/90 text-sm font-semibold">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Food & Adventure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-2xl font-semibold text-on-surface">Foodie Experiences</h3>
              <span className="material-symbols-outlined text-primary cursor-pointer">arrow_forward</span>
            </div>
            <div className="space-y-4">
              {FOOD.map(a => <ActivityCard key={a.id} act={a} />)}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-2xl font-semibold text-on-surface">Adventure Seekers</h3>
              <span className="material-symbols-outlined text-primary cursor-pointer">arrow_forward</span>
            </div>
            <div className="space-y-4">
              {ADVENTURE.map(a => <ActivityCard key={a.id} act={a} />)}
            </div>
          </div>
        </div>

        {/* Map Callout */}
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
          <div className="absolute inset-0 bg-surface-container-highest flex items-center justify-center">
            <div className="w-full h-full bg-[#f2f2f2] relative">
              <div className="absolute top-1/4 left-1/3"><span className="material-symbols-outlined filled text-primary text-4xl">location_on</span></div>
              <div className="absolute top-1/2 left-1/2"><span className="material-symbols-outlined filled text-secondary text-4xl">location_on</span></div>
              <div className="absolute top-1/3 right-1/4"><span className="material-symbols-outlined filled text-primary text-4xl">location_on</span></div>
            </div>
          </div>
          <div className="absolute top-8 right-8 glass-panel p-6 rounded-2xl max-w-xs shadow-lg border border-white/50">
            <h4 className="font-heading text-2xl font-semibold text-on-surface mb-2">Explore the Area</h4>
            <p className="text-secondary text-sm font-semibold mb-4">View 15+ activities nearby your current stop in Shibuya.</p>
            <button className="w-full py-3 bg-inverse-surface text-inverse-on-surface font-label text-sm font-semibold rounded-xl active:scale-95 transition-all">Open Interactive Map</button>
          </div>
        </div>
      </section>

      {/* FAB */}
      <button className="fixed bottom-24 right-8 md:bottom-12 md:right-12 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-90 transition-all z-40" style={{boxShadow: '0px 8px 20px rgba(135,82,0,0.3)'}}>
        <span className="material-symbols-outlined text-3xl">shopping_bag</span>
        <div className="absolute -top-1 -right-1 bg-error text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-background">{cartCount}</div>
      </button>
    </div>
  )
}
