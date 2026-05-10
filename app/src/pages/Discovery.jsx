import { useState } from 'react'
import { Link } from 'react-router-dom'

const TRENDING = [
  { id: 'london', name: 'London', country: 'United Kingdom', cost: '$$$', rating: '4.9', rank: 1, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_dU9e2rEwIkHsjIxdoyScSrk1ZZUx6GY5I_n4-tpjz0_46CZiGtGbECdxEpAa_vlGpDWlJe2-CBVfHRoTzqQe3xBsilr-zYbfpNW28wKEOfWb_CYRimfV7K02dmUD_KL2WJxBwjWxpeABN5HEcM_MuD9NabRUS4e25NGJppXjesyEiEqZ20_jA4HRJGv9roFev_ntVTJqCOMM6P2M8Gwq6w2ID87HkcBj6faagxtw61F-RwHQ3VbzhMqcZpjzXHGHavlxoc57duQ' },
  { id: 'sydney', name: 'Sydney', country: 'Australia', cost: '$$$', rating: '4.8', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtL1mIDCcicNxiqqb5tzQQMbBkfr7MOP5vVUJrvw2j2a-aZqINQr2lFExjSZjFzmHguXqNY-X0yvHrJRwD17Iv0LDyf-trS0oBAyDqphVUw9ACiKY_pMVgPgn2PqyejXCcJ1NYq0sKmsAV9X3jGti4uN0dZoctIHRqwOn_mBAfZOtFuXiJvxFItCVh_o60lCdIQzwvrHsGQIX1-8_bRckmH1-Q2T8eKjafM6hHbSRjw94GBIKclqsm_tEWiK7o-rr9wqaVK5GIN64' },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', cost: '$$', rating: '4.7', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8SzdyBcqS57U2IHVafSIbF-iVFc3rnw53Pjg-oFziSXSdj_ORopJbfUOlECD0nCSwssLYGpWUl55u92yH3dMtAhwM0GS3FHu0gvIzghb_1AETBBznacQKFnOIHSmxOck3n7sO6qMNeRQCr8a6SJVkuFLfgmnh_yhg9iD7s6rfx5lXvwLa3RavJJu077hMxXRKu1-_GbBLqg2x3j6BqTSiTA8Tv3KX1ERAmOX6OdnGtVd2FJHU7-jujJjLgsawvkzyiqow23EGpTU' },
]

const RECS = [
  { id: 'male', name: 'Male', country: 'Maldives', tag: 'Adventure', cost: '$$$', rating: '4.9', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDMYsAOIv0Z0eVGXM6CpvIBCQHtjJ5OC3nJp6PV2j44IdIrllOEt7NPRTxpfGME6LpGqp2GMByZLHEm5xbL-hvuqypi-tBWohTfze6R5yBvGJ_bK9JqrDbQgh6E7M_EuK0qCS77ZPDU0S75XvIwgI1xKj69RNSA600QKfUy7p4vwfxvhn26aRqHeKq5kQ00a5uiq7wOuj4xXpQurcgkreDQE7AdYc751bPYjGGxHDN2n9IDxa7RiCTCRMSzDf4X9BTg2H7HQYrOs0' },
  { id: 'venice', name: 'Venice', country: 'Italy', tag: 'Culture', cost: '$$', rating: '4.7', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDUyI9coOKVbeab_SgmLVTR5ng_Efdqfx-VS6Y9nR38tOCE2_4mTHsGHDXvnQyIJXhhFUy-wWukJu6xPhwUlbpKD0vD8KU4fR5x8Iusyo05iDzsnUf1Sf9WYKNsLAZlcFRNSkk2YF1hRyPZWwRtbKT25WYXX3zZFI1d9v1xH-mk-CF6J2QXUbH5-7OWFnCk_A619xBQ3woXwSgel-OuRYEwSH4hOnQNXy6RPtOv36Cp0ro6rR3WQQOOUfbnSB0clCGcPDpyCdd16g' },
  { id: 'santorini', name: 'Santorini', country: 'Greece', tag: 'Relaxation', cost: '$$$', rating: '4.8', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPPEfIkUJGDgEoCR--GXuRNaVg6RiHCLlAhcq42-VN_Pol9WIcTqrStKumxVadjyD6iqxEQuKsGWoYVfOgh5lMsqLW4DbLjrgauHcR4LSeqtsQGzthw-d1NIjIL_PqgttXdaUg2nG7gtjuuFOIICeF7eqitsT1Xg9F29PDBVNQhY1PpzL2Gtbsc2T0n-IVs26i536OuUWGdkVB4549yExIc61EjWalhQ10eDbqL0w4vU7F8TdbHtv4QX2P9zKo9HmWDnRKGT3ICAQ' },
  { id: 'banff', name: 'Banff', country: 'Canada', tag: 'Nature', cost: '$', rating: '4.9', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMJAg-nLCDQeAEGbXY9nm_S3VkS1NztIrvrgiBUn1gMAkj6rgZ405Uywj4m-2TkbZymEeoX4My7i_C_RJRxwjxwSlhI00OXMESH-LDhtzGds1ELKRuwQQ7GTaj07gLYgQx9_qqs6K71wb0nb47LU8OjvCAziCn8q1LRQ8PaSIbUYtOnKmA9RJB2MyFDo2JsrGU0VDixmMu_iL3Z_Eh98Iwj8lFw1fFl3Vkb866BZlDIlsAew4hFfvD_jNpkcQR7VHbdMbtxaQQZyE' },
]

const CATEGORIES = [
  { icon: 'landscape', label: 'Nature & Parks' },
  { icon: 'restaurant', label: 'Local Food' },
  { icon: 'museum', label: 'History & Culture' },
  { icon: 'beach_access', label: 'Beach Resorts' },
  { icon: 'nightlife', label: 'Nightlife' },
]

export default function Discovery() {
  const [query, setQuery] = useState('')

  return (
    <div>
      {/* Hero Search */}
      <section className="mb-12">
        <div className="flex flex-col gap-6 items-center text-center max-w-2xl mx-auto">
          <h2 className="font-display text-5xl font-bold text-on-surface">Where to next?</h2>
          <div className="w-full relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
            <input
              className="w-full h-16 pl-14 pr-32 rounded-xl border border-outline-variant/50 bg-white shadow-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all text-lg font-body outline-none"
              placeholder="Search cities, countries, or experiences..."
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-label text-sm font-semibold active:scale-95 transition-transform">
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Trending Cities */}
      <section className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="font-heading text-3xl font-bold text-on-surface">Trending Cities</h3>
            <p className="text-on-surface-variant mt-1">Hottest destinations right now</p>
          </div>
          <button className="text-primary font-label text-sm font-semibold flex items-center gap-2 hover:underline">
            View all <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
          {/* Large card */}
          <div className="md:col-span-7 relative rounded-xl overflow-hidden group cursor-pointer" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={TRENDING[0].img} alt={TRENDING[0].name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white w-full flex justify-between items-end">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary-container/90 text-on-primary-container text-xs px-2 py-1 rounded font-bold uppercase tracking-widest">Trending #{TRENDING[0].rank}</span>
                </div>
                <h4 className="font-heading text-3xl font-bold">{TRENDING[0].name}</h4>
                <p className="font-body opacity-90">{TRENDING[0].country} • {TRENDING[0].cost} • {TRENDING[0].rating} ★</p>
              </div>
              <button className="bg-white/20 backdrop-blur-md border border-white/30 p-4 rounded-full text-white hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-90">
                <span className="material-symbols-outlined">add</span>
              </button>
            </div>
          </div>
          {/* Column of 2 */}
          <div className="md:col-span-5 grid grid-rows-2 gap-6">
            {TRENDING.slice(1).map(city => (
              <Link to={`/discovery/${city.id}/activities`} key={city.id} className="relative rounded-xl overflow-hidden group cursor-pointer" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={city.img} alt={city.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white w-full flex justify-between items-end">
                  <div>
                    <h4 className="font-heading text-2xl font-semibold">{city.name}</h4>
                    <p className="text-sm opacity-90">{city.country} • {city.cost} • {city.rating} ★</p>
                  </div>
                  <button className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-full text-white hover:bg-primary-container hover:text-on-primary-container transition-all">
                    <span className="material-symbols-outlined text-xl">add</span>
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="font-heading text-3xl font-bold text-on-surface">Recommended for You</h3>
            <p className="text-on-surface-variant mt-1">Based on your recent interest in 'Beach Destinations'</p>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x hide-scrollbar">
          {RECS.map(rec => (
            <div key={rec.id} className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl overflow-hidden snap-start border border-outline-variant/20 group" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
              <div className="h-48 overflow-hidden relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={rec.img} alt={rec.name} />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-primary">{rec.cost}</div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-1">
                  <h5 className="font-heading text-2xl font-semibold text-on-surface">{rec.name}</h5>
                  <span className="flex items-center gap-1 text-sm font-bold">
                    <span className="material-symbols-outlined filled text-primary text-base">star</span> {rec.rating}
                  </span>
                </div>
                <p className="text-on-surface-variant text-sm mb-4">{rec.country} • {rec.tag}</p>
                <button className="w-full py-2 border-2 border-primary text-primary font-label text-sm font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">add_circle</span> Add to Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h3 className="font-heading text-2xl font-semibold text-on-surface mb-6">Explore by Interest</h3>
        <div className="flex flex-wrap gap-4">
          {CATEGORIES.map(cat => (
            <button key={cat.label} className="flex items-center gap-2 px-6 py-3 bg-secondary-container/30 text-secondary border border-secondary-container rounded-full font-label text-sm font-semibold hover:bg-primary-container/20 hover:text-primary transition-all">
              <span className="material-symbols-outlined">{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
