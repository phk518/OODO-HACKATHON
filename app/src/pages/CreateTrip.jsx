import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const INSPIRATION = [
  { label: 'Adventure', title: 'Swiss Alps', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDGB3_9X79aiZ3jXjUkVJQveZKWPTKXKZVhGHm19CUbJ2UpfoL0zqmKrKcbKSDgzZKxRLMyT7keox0YzNmKJpjt4cc5WBVZ0teX5W0Xln9Iltd40hXL94Xtf_YjjsUGHej83BOJF4Vb7RG12RuWkUIWo26lzbpeTjtuZfQyJLEQK0FkOXPuTZEA9lXQ0tOTzwXgfIJEavj6Ry8UIozHzC3jtR1s86cEUjPYIJZFbvYb1gz5oe_zCdBMes1i8-ryJ3qoZQsfv_j38s' },
  { label: 'Relaxation', title: 'Bali Retreat', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXRAfrArScu9XchwiPQPHicKRkYk5ZN89JX5DRMpM1eQb02Gq_WQvSWBBQtB4K2AvaMOMJnDW-lWFpQowiaBwt4YYDbIhbXIzfq1pN2fkyQHWCDQbCbxW3M6KvNp-jgpnm-Sj82XTDOKbD1rSeDbe8Hn03TFtNNAwojb1Gl7mDn1L7o6SxIn4NzyiSGTR9SranB6o2tX_T_T_Nl_VFIAKZWo0H1AR86Yr-FOmmMO4MQxS95LpdcCgTFnKEFFTk3LONT5xv0d0-ThU', span: true },
  { label: 'Culture', title: 'Parisian Nights', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBok7XZp6Vc24KgNQN6bLgXfAhNVVGh0VVp-CJHQPmMyJPSs4EEB-6gHbBW6l4tCeYs0kVLJdDFjj_ePhgk1JXLUx5IQC2vTg4mhmSUt0mNaifsON4MQrFxB4V2hhCxM_8f54j0EhvzDPtr6kLAXpO3_THoLfgJRUZzt5V8Rv3vLut-atHhuVjZvhb2cUo6mteUkxu_CeK8zy1cE-vOKvgbkQbQiy2g7cW5NEjXMewql_5bpuK4xIezL0GSLX7Qky8QPh1P2meIsnQ' },
]

export default function CreateTrip() {
  const navigate = useNavigate()
  const [collab, setCollab] = useState(false)
  const [form, setForm] = useState({ name: '', startDate: '', endDate: '', description: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, POST to backend here
    navigate('/trips/1/itinerary')
  }

  return (
    <div className="max-w-[800px] mx-auto">
      <section className="mb-12">
        <h2 className="font-heading text-3xl font-bold text-on-surface mb-2">Create New Trip</h2>
        <p className="text-on-surface-variant font-body text-lg">Where is your next adventure taking you? Define the soul of your journey.</p>
      </section>

      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Cover Photo */}
        <div className="relative group cursor-pointer">
          <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden bg-surface-container-high border-2 border-dashed border-outline-variant flex flex-col items-center justify-center transition-all hover:border-primary/50 hover:bg-surface-container-highest">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors">add_a_photo</span>
            <span className="mt-2 font-label text-sm font-semibold text-on-surface-variant group-hover:text-primary">Add a Cover Photo</span>
            <p className="text-xs text-on-surface-variant/60 mt-1">High-quality JPG or PNG, max 10MB</p>
          </div>
          <div className="absolute top-4 right-4 bg-primary/10 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined filled text-sm text-primary">auto_awesome</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Recommended</span>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="font-label text-sm font-semibold text-on-surface-variant px-1" htmlFor="trip-name">Trip Name</label>
            <input className="w-full h-14 bg-surface rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary transition-all px-4 font-body text-on-surface shadow-sm" id="trip-name" placeholder="e.g., Amalfi Coast Summer Escape" type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label text-sm font-semibold text-on-surface-variant px-1" htmlFor="start-date">Start Date</label>
            <div className="relative">
              <input className="w-full h-14 bg-surface rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary transition-all px-4 font-body text-on-surface shadow-sm" id="start-date" type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label text-sm font-semibold text-on-surface-variant px-1" htmlFor="end-date">End Date</label>
            <div className="relative">
              <input className="w-full h-14 bg-surface rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary transition-all px-4 font-body text-on-surface shadow-sm" id="end-date" type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} />
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="font-label text-sm font-semibold text-on-surface-variant px-1" htmlFor="description">Trip Description</label>
            <textarea className="w-full bg-surface rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 font-body text-on-surface shadow-sm resize-none" id="description" placeholder="What's the vibe of this trip?" rows="5" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
        </div>

        {/* Collab Toggle */}
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 flex items-center justify-between shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">group_add</span>
            </div>
            <div>
              <h4 className="font-label text-sm font-semibold text-on-surface">Collaborative Trip</h4>
              <p className="text-sm text-on-surface-variant">Allow friends to edit and add to the itinerary.</p>
            </div>
          </div>
          <button type="button" onClick={() => setCollab(!collab)} className={`w-12 h-6 rounded-full relative transition-colors ${collab ? 'bg-primary' : 'bg-outline-variant'}`}>
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all ${collab ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 pt-6">
          <button type="submit" className="flex-1 h-14 bg-primary-container text-on-primary-container font-label text-sm font-semibold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">save</span> Save Trip
          </button>
          <button type="button" className="flex-1 h-14 border-2 border-outline text-on-surface font-label text-sm font-semibold rounded-xl hover:bg-surface-container-high active:scale-95 transition-all">Discard Draft</button>
        </div>
      </form>

      {/* Inspiration */}
      <section className="mt-12">
        <h3 className="font-heading text-2xl font-semibold text-on-surface mb-6">Need Inspiration?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[300px]">
          {INSPIRATION.map((item, i) => (
            <div key={i} className={`relative rounded-xl overflow-hidden group cursor-pointer shadow-sm ${item.span ? 'md:row-span-2' : ''}`}>
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.img} alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-on-secondary-fixed/80 to-transparent flex flex-col justify-end p-4">
                <span className="text-white font-label text-xs font-semibold uppercase tracking-widest opacity-80">{item.label}</span>
                <h4 className="text-white font-heading text-sm font-semibold">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
