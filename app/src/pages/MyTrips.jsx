import { Link } from 'react-router-dom'

const TRIPS = [
  { id: 1, title: 'Parisian Spring', dates: 'May 12 - May 19, 2024', status: 'Upcoming', stops: 3, budget: '$2,400', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDirEbTpb1ni0ynzSr7jk5ORyTsfWaWIP9_3-HoJhWKL3_kFWLtFCJvKG_BSVpkT7dZJSkrlq9zi-5ygxd24NJ_NOgFKMrtNKzPvFTXral4p4GpZ85idHMDnYzX5i9cdglSsbQmAyuQv6fBxHCJu8DzAZsppB9hGheeIFW9sGjtCcndLeGneqsoEtvBAcfh4neNbMFozHFXO1_zTb-r_5dfXD7AdiXrl3oIZh_xIIbkzgW-Sbya_2CnlyxIu9nm2C1wyC9FVEKTg0w' },
  { id: 2, title: 'Maldives Retreat', dates: 'Aug 05 - Aug 15, 2024', status: 'Planning', stops: 2, budget: '$5,200', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvBJxAplo2lSz-KlcJarEbbjF3h5Bh2vNP9pz_utoA6Npriel-NnSImTlbh_ScaNsoKaEGU_blOZzgTJtqcUO16hrDTklmy0dZ9Jtp-5FAarSxJSGJj37-mwnhkTJKddjbzlmjfu7mp0K7-QPgvjRr86zVpZcCZz_Xy3aD6CmXO4XyeHhnHakabnMwORH-85OLLLSFp6YO3WuVOtAuep5I_2P1T0fIinO5uFYsvykWhkn1KcjL_T6vRY6g6PQNVJ6Wyomc0B85twc' },
  { id: 3, title: 'Tokyo Adventure', dates: 'Nov 01 - Nov 10, 2024', status: 'Draft', stops: 5, budget: '$3,800', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8SzdyBcqS57U2IHVafSIbF-iVFc3rnw53Pjg-oFziSXSdj_ORopJbfUOlECD0nCSwssLYGpWUl55u92yH3dMtAhwM0GS3FHu0gvIzghb_1AETBBznacQKFnOIHSmxOck3n7sO6qMNeRQCr8a6SJVkuFLfgmnh_yhg9iD7s6rfx5lXvwLa3RavJJu077hMxXRKu1-_GbBLqg2x3j6BqTSiTA8Tv3KX1ERAmOX6OdnGtVd2FJHU7-jujJjLgsawvkzyiqow23EGpTU' },
]

const STATUS_COLORS = { Upcoming: 'bg-primary-container text-on-primary-container', Planning: 'bg-secondary-container text-on-secondary-container', Draft: 'bg-surface-container-high text-on-surface-variant' }

export default function MyTrips() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-heading text-3xl font-bold text-on-surface">My Trips</h2>
          <p className="text-on-surface-variant mt-1">Manage and track all your adventures</p>
        </div>
        <Link to="/trips/new" className="px-6 py-3 bg-primary-container text-on-primary-container font-label text-sm font-semibold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">add</span> New Trip
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRIPS.map(trip => (
          <Link to={`/trips/${trip.id}/view`} key={trip.id} className="bg-surface-container-lowest rounded-xl overflow-hidden group border border-outline-variant/20 hover:shadow-lg transition-shadow" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
            <div className="relative h-48">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={trip.img} alt={trip.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className={`${STATUS_COLORS[trip.status]} px-3 py-1 rounded-full text-xs font-bold`}>{trip.status}</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-heading text-xl font-semibold mb-2">{trip.title}</h3>
              <p className="text-on-surface-variant text-sm flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-base">calendar_today</span> {trip.dates}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
                <span className="text-sm text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-base text-primary">location_on</span> {trip.stops} stops</span>
                <span className="font-label text-sm font-semibold text-primary">{trip.budget}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
