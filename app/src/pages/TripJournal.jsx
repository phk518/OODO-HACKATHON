import { useState } from 'react'

const ENTRIES = [
  { id: 1, date: 'June 12, 2024', title: 'First Day in Paris', mood: '😍', content: 'Arrived at CDG airport around noon. The taxi ride into the city was magical — catching the first glimpse of the Eiffel Tower through the morning haze. Checked into a charming boutique hotel in Le Marais. The cobblestone streets and little cafés are exactly what I dreamed of.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDirEbTpb1ni0ynzSr7jk5ORyTsfWaWIP9_3-HoJhWKL3_kFWLtFCJvKG_BSVpkT7dZJSkrlq9zi-5ygxd24NJ_NOgFKMrtNKzPvFTXral4p4GpZ85idHMDnYzX5i9cdglSsbQmAyuQv6fBxHCJu8DzAZsppB9hGheeIFW9sGjtCcndLeGneqsoEtvBAcfh4neNbMFozHFXO1_zTb-r_5dfXD7AdiXrl3oIZh_xIIbkzgW-Sbya_2CnlyxIu9nm2C1wyC9FVEKTg0w' },
  { id: 2, date: 'June 13, 2024', title: 'Louvre & Seine', mood: '🎨', content: 'Spent the entire morning at the Louvre. The Mona Lisa was smaller than expected but the whole experience was surreal. Had lunch at a sidewalk café near Pont Neuf, then took a sunset cruise along the Seine. The golden light on the buildings was unforgettable.' },
  { id: 3, date: 'June 15, 2024', title: 'Road to Nice', mood: '🚗', content: 'Long drive along the coast to Nice. Stopped at a few small villages along the way. The lavender fields in Provence were in full bloom — the smell was incredible. Arrived in Nice just as the sun was setting over the Mediterranean.' },
]

export default function TripJournal() {
  const [newEntry, setNewEntry] = useState('')

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-8">
        <h2 className="font-heading text-3xl font-bold text-on-surface mb-2">Trip Journal</h2>
        <p className="text-on-surface-variant font-body text-lg">European Summer Escape • Your travel memories</p>
      </div>

      {/* New Entry */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 mb-8 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-primary">edit_note</span>
          <h3 className="font-heading text-lg font-semibold">Write a new entry</h3>
        </div>
        <textarea
          className="w-full bg-surface rounded-xl border border-outline-variant/40 focus:border-primary focus:ring-1 focus:ring-primary transition-all p-4 font-body text-on-surface shadow-sm resize-none mb-4"
          placeholder="What happened today? Capture your thoughts, feelings, and discoveries..."
          rows="4"
          value={newEntry}
          onChange={e => setNewEntry(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors"><span className="material-symbols-outlined text-on-surface-variant">photo_camera</span></button>
            <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors"><span className="material-symbols-outlined text-on-surface-variant">mood</span></button>
            <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors"><span className="material-symbols-outlined text-on-surface-variant">location_on</span></button>
          </div>
          <button className="px-6 py-2 bg-primary-container text-on-primary-container font-label text-sm font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all">Save Entry</button>
        </div>
      </div>

      {/* Entries */}
      <div className="space-y-6">
        {ENTRIES.map(entry => (
          <div key={entry.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
            {entry.img && (
              <div className="h-48 overflow-hidden">
                <img className="w-full h-full object-cover" src={entry.img} alt={entry.title} />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{entry.mood}</span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">{entry.title}</h3>
                    <p className="text-on-surface-variant text-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">calendar_today</span> {entry.date}
                    </p>
                  </div>
                </div>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">more_vert</button>
              </div>
              <p className="text-on-surface font-body leading-relaxed">{entry.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
