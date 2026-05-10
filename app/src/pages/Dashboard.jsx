import { Link } from 'react-router-dom'

const TRIPS = [
  {
    id: 1, title: 'Parisian Spring', dates: 'May 12 - May 19, 2024', badge: 'In 12 Days', badgeColor: 'bg-primary-container text-on-primary-fixed',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDirEbTpb1ni0ynzSr7jk5ORyTsfWaWIP9_3-HoJhWKL3_kFWLtFCJvKG_BSVpkT7dZJSkrlq9zi-5ygxd24NJ_NOgFKMrtNKzPvFTXral4p4GpZ85idHMDnYzX5i9cdglSsbQmAyuQv6fBxHCJu8DzAZsppB9hGheeIFW9sGjtCcndLeGneqsoEtvBAcfh4neNbMFozHFXO1_zTb-r_5dfXD7AdiXrl3oIZh_xIIbkzgW-Sbya_2CnlyxIu9nm2C1wyC9FVEKTg0w',
  },
  {
    id: 2, title: 'Maldives Retreat', dates: 'Aug 05 - Aug 15, 2024', badge: 'Upcoming', badgeColor: 'bg-secondary-container text-on-secondary-container',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvBJxAplo2lSz-KlcJarEbbjF3h5Bh2vNP9pz_utoA6Npriel-NnSImTlbh_ScaNsoKaEGU_blOZzgTJtqcUO16hrDTklmy0dZ9Jtp-5FAarSxJSGJj37-mwnhkTJKddjbzlmjfu7mp0K7-QPgvjRr86zVpZcCZz_Xy3aD6CmXO4XyeHhnHakabnMwORH-85OLLLSFp6YO3WuVOtAuep5I_2P1T0fIinO5uFYsvykWhkn1KcjL_T6vRY6g6PQNVJ6Wyomc0B85twc',
  },
]

const DESTINATIONS = [
  {
    id: 'kyoto', name: 'Kyoto, Japan', tags: ['Cultural Heritage', '$$$'], desc: "Discover the perfect blend of ancient tradition and modern refinement in the heart of Japan's cultural capital.",
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHGUvOC0W8pp5F4FaaGtXRD_LTkymPunrmf-XPYXpNPxSPrLJ9dVMMFA86CzKsVhdrtRsSYA0pRtk2sqVBWDw_FxWf41TF-lUDv0Ex2YzZh9Glu1fJ9ElaeCcoLhvvxXjXRvFYxhgya5v1gX3uzkiflnfxsmcxDHmQMkIGnS-6ra0dXoxJIQWGZbD7ZixqbS2XhzIj0iHse1X-LPOcqx8bCc8P5dS3tN3b4eiSdvydCI3ueliss4yUVJsqlp-Hyn3yuttmn76CYzg',
    large: true,
  },
  {
    id: 'santorini', name: 'Santorini', sub: 'Greece • High Popularity',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHFoJMQSjdI-VaziOZIYGfJcK5ojn7Xqv18dXUWdsrvUjPrhytQCarPCOKYFFULoBpsZzRxKVNMksQEvGM0lZnpOYuWRvPBn2Ox-KhttusfTHsvi3ro5vfHmBdsq3i7xTEeps1zcy_z2EoR8YXWp9F2hoVgJIJE5YcMRXGNzexZCZ_UdUrraGvK01iVmr1tY468N5HZ8mtkg-V4FUzd1yay_ygQs-AAXVpVch2khBil54Y2KZmuCj1LFjmfX8pD8JErGVO1hj4uLM',
  },
  {
    id: 'cinqueterre', name: 'Cinque Terre', sub: 'Italy • Romantic',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP1r6NearhTdVlbteEQxn2eLygfNn9mYr5bG1kGfHndXOrClbis9_N1c_AK8-kpSeQjecmbIziXp9uC4CNA23FRx_DJOZK-b1mi2LEok6Z-Gp8bEF4yvmR8tOn5ufrQvTKAhF0WKlGrwLJWUiSqRoDFKG7rz2vIcxVw4YptV3zDQepnN8PIp5k83TZGuLWH-md0IKFukJeAb1E8T4WK1ZfprKC2K6h6I4IzjqSYqIZ-HPd2pcZ-64_qI-sn9w7Nz_blp6jqf3bhqo',
  },
]

export default function Dashboard() {
  return (
    <div className="mt-4">
      {/* Welcome */}
      <section className="mb-12">
        <p className="font-label text-sm font-semibold text-secondary uppercase tracking-widest mb-1">Adventure awaits</p>
        <h2 className="font-heading text-3xl font-bold text-on-surface">Welcome, Explorer!</h2>
      </section>

      {/* Upcoming Trips */}
      <section className="mb-12 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-2xl font-semibold text-on-surface">Upcoming Trips</h3>
          <Link to="/trips" className="text-primary font-label text-sm font-semibold flex items-center gap-1 hover:opacity-80">
            View all <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar -mx-5 px-5 md:mx-0 md:px-0">
          {TRIPS.map(trip => (
            <Link to={`/trips/${trip.id}/view`} key={trip.id} className="min-w-[300px] md:min-w-[400px] bg-surface-container-lowest rounded-xl overflow-hidden group" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
              <div className="relative h-48">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={trip.img} alt={trip.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B3C]/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className={`${trip.badgeColor} font-label text-xs font-semibold px-3 py-1 rounded-full`}>{trip.badge}</span>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-heading text-2xl font-semibold mb-1">{trip.title}</h4>
                <p className="font-body text-secondary flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">calendar_today</span> {trip.dates}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recommended Destinations */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-2xl font-semibold text-on-surface">Recommended for You</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large card */}
          <div className="md:col-span-8 group relative rounded-xl overflow-hidden h-[400px]" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
            <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={DESTINATIONS[0].img} alt={DESTINATIONS[0].name} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B3C]/80 via-[#1A2B3C]/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex gap-2 mb-3">
                {DESTINATIONS[0].tags.map(tag => (
                  <span key={tag} className="bg-white/20 backdrop-blur-md text-white text-xs font-label font-semibold px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <h4 className="font-heading text-3xl font-bold text-white mb-2">{DESTINATIONS[0].name}</h4>
              <p className="text-white/80 font-body line-clamp-2 max-w-lg">{DESTINATIONS[0].desc}</p>
            </div>
          </div>
          {/* Side column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {DESTINATIONS.slice(1).map(dest => (
              <div key={dest.id} className="flex-1 group relative rounded-xl overflow-hidden min-h-[188px]" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={dest.img} alt={dest.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2B3C]/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="font-heading text-white text-lg font-semibold">{dest.name}</h4>
                  <p className="text-white/80 font-label text-sm font-semibold">{dest.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan New Trip FAB */}
      <Link to="/trips/new" className="fixed bottom-24 right-6 md:right-16 z-40 bg-primary-container text-on-primary shadow-xl rounded-full px-6 py-4 flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
        <span className="material-symbols-outlined">add</span>
        <span className="font-label text-sm font-semibold">Plan New Trip</span>
      </Link>
    </div>
  )
}
