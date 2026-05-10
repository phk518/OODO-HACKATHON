const EXPENSES = [
  { category: 'Flights', amount: 1200, icon: 'flight', color: 'bg-primary' },
  { category: 'Hotels', amount: 1800, icon: 'hotel', color: 'bg-secondary' },
  { category: 'Activities', amount: 650, icon: 'confirmation_number', color: 'bg-tertiary' },
  { category: 'Food & Dining', amount: 420, icon: 'restaurant', color: 'bg-primary-container' },
  { category: 'Transport', amount: 280, icon: 'directions_car', color: 'bg-outline' },
  { category: 'Shopping', amount: 150, icon: 'shopping_bag', color: 'bg-error' },
]

const TOTAL = EXPENSES.reduce((a, e) => a + e.amount, 0)
const BUDGET = 5000

export default function TripBudget() {
  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-8">
        <h2 className="font-heading text-3xl font-bold text-on-surface mb-2">Trip Budget & Costs</h2>
        <p className="text-on-surface-variant font-body text-lg">European Summer Escape • Track every penny</p>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 text-center" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
          <p className="text-on-surface-variant text-sm mb-1">Total Budget</p>
          <p className="font-heading text-3xl font-bold text-on-surface">${BUDGET.toLocaleString()}</p>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 text-center" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
          <p className="text-on-surface-variant text-sm mb-1">Spent</p>
          <p className="font-heading text-3xl font-bold text-primary">${TOTAL.toLocaleString()}</p>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 text-center" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
          <p className="text-on-surface-variant text-sm mb-1">Remaining</p>
          <p className="font-heading text-3xl font-bold text-green-600">${(BUDGET - TOTAL).toLocaleString()}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 mb-8 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
        <div className="flex justify-between mb-2">
          <span className="font-label text-sm font-semibold uppercase tracking-wider text-on-surface-variant">Budget Usage</span>
          <span className="font-label text-sm font-semibold">{Math.round((TOTAL / BUDGET) * 100)}%</span>
        </div>
        <div className="h-4 w-full bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all" style={{width: `${(TOTAL / BUDGET) * 100}%`}} />
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
        <h3 className="font-heading text-xl font-semibold mb-6">Expense Breakdown</h3>
        <div className="space-y-4">
          {EXPENSES.map(exp => (
            <div key={exp.category} className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface-container-low transition-colors">
              <div className={`w-12 h-12 ${exp.color} rounded-xl flex items-center justify-center`}>
                <span className="material-symbols-outlined text-white">{exp.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label text-sm font-semibold">{exp.category}</span>
                  <span className="font-label text-sm font-semibold">${exp.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className={`h-full ${exp.color} rounded-full`} style={{width: `${(exp.amount / TOTAL) * 100}%`}} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Estimate */}
      <div className="bg-primary/5 rounded-2xl p-6 mt-8 border border-primary/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-primary">auto_awesome</span>
          <h5 className="font-label text-sm font-semibold text-primary">AI Budget Insights</h5>
        </div>
        <p className="text-sm text-on-surface-variant">Based on similar trips, you're spending <strong className="text-primary">12% less on dining</strong> than average. Consider allocating more for authentic local food experiences!</p>
      </div>
    </div>
  )
}
