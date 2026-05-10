import { useState } from 'react'

const CATEGORIES = {
  'Clothing': [
    { id: 1, name: 'Light jacket', packed: true },
    { id: 2, name: 'Comfortable walking shoes', packed: true },
    { id: 3, name: 'Swimwear', packed: false },
    { id: 4, name: 'Casual evening outfit', packed: false },
    { id: 5, name: 'Rain jacket', packed: false },
  ],
  'Toiletries': [
    { id: 6, name: 'Sunscreen SPF 50+', packed: true },
    { id: 7, name: 'Travel-size shampoo', packed: false },
    { id: 8, name: 'Toothbrush & paste', packed: true },
  ],
  'Electronics': [
    { id: 9, name: 'Phone charger', packed: true },
    { id: 10, name: 'Camera + extra battery', packed: false },
    { id: 11, name: 'Universal adapter', packed: false },
  ],
  'Documents': [
    { id: 12, name: 'Passport', packed: true },
    { id: 13, name: 'Travel insurance', packed: true },
    { id: 14, name: 'Hotel confirmations', packed: false },
  ],
}

export default function PackingChecklist() {
  const [items, setItems] = useState(CATEGORIES)

  const toggle = (cat, id) => {
    setItems(prev => ({
      ...prev,
      [cat]: prev[cat].map(item => item.id === id ? { ...item, packed: !item.packed } : item)
    }))
  }

  const totalItems = Object.values(items).flat().length
  const packedItems = Object.values(items).flat().filter(i => i.packed).length
  const progress = Math.round((packedItems / totalItems) * 100)

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="mb-8">
        <h2 className="font-heading text-3xl font-bold text-on-surface mb-2">Packing Checklist</h2>
        <p className="text-on-surface-variant font-body text-lg">European Summer Escape • 14 days</p>
      </div>

      {/* Progress */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 mb-8 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
        <div className="flex justify-between items-center mb-3">
          <span className="font-heading text-lg font-semibold">{packedItems} of {totalItems} packed</span>
          <span className="font-label text-sm font-semibold text-primary">{progress}%</span>
        </div>
        <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-primary-container rounded-full transition-all duration-500" style={{width: `${progress}%`}} />
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="bg-primary/5 rounded-2xl p-6 mb-8 border border-primary/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-primary">auto_awesome</span>
          <h5 className="font-label text-sm font-semibold text-primary">AI Packing Suggestions</h5>
        </div>
        <p className="text-sm text-on-surface-variant">Based on your itinerary and weather forecast, we suggest adding: <strong className="text-primary">Hiking boots, Insect repellent, Portable water bottle</strong></p>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {Object.entries(items).map(([cat, list]) => (
          <div key={cat} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
            <h3 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                {cat === 'Clothing' ? 'checkroom' : cat === 'Toiletries' ? 'sanitizer' : cat === 'Electronics' ? 'devices' : 'description'}
              </span>
              {cat}
              <span className="text-sm text-on-surface-variant font-normal ml-auto">{list.filter(i => i.packed).length}/{list.length}</span>
            </h3>
            <div className="space-y-2">
              {list.map(item => (
                <label key={item.id} className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all hover:bg-surface-container-low ${item.packed ? 'opacity-60' : ''}`}>
                  <input type="checkbox" checked={item.packed} onChange={() => toggle(cat, item.id)} className="w-5 h-5 rounded text-primary focus:ring-primary border-outline-variant" />
                  <span className={`font-body ${item.packed ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>{item.name}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
