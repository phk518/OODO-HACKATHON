import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, Users, DollarSign, Plane, MoreVertical, Calendar, Download, Lock } from 'lucide-react'
import { useData } from '../context/DataContext'

// Simple mock for charts since we are in a text-based environment
const MockChart = ({ title, height = 'h-64' }) => (
  <div className={`bg-bg-elevated/30 rounded-xl ${height} flex items-center justify-center border border-dashed border-border group overflow-hidden relative`}>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
    <span className="text-text-muted text-xs font-bold uppercase tracking-[0.2em] relative z-10">{title} Visualization</span>
  </div>
)

const Admin = () => {
  const { sessionUser, users, trips, stops } = useData()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (sessionUser && sessionUser.email === 'admin@traveloop.com') {
      setIsAdmin(true)
    }
  }, [sessionUser])

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-8">
        <div className="glass-card p-12 max-w-md text-center animate-in">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-2xl font-serif mb-2">Admin Restricted Area</h1>
          <p className="text-text-secondary text-sm mb-10">You do not have sufficient permissions to view this dashboard.</p>
          <Link to="/dashboard" className="inline-block px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const kpis = [
    { label: 'Total Revenue', value: '$1,284,500', trend: '+12.5%', isUp: true },
    { label: 'Active Users', value: users.length.toLocaleString(), trend: '+8.2%', isUp: true },
    { label: 'Trips Planned', value: trips.length.toLocaleString(), trend: '-2.1%', isUp: false },
    { label: 'Avg Trip Value', value: '$3,450', trend: '+4.3%', isUp: true },
  ]

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 animate-in">
        <div>
          <div className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-2">Management Console</div>
          <h1 className="text-4xl md:text-5xl font-serif mb-2">Platform Analytics</h1>
          <p className="text-text-secondary">Real-time performance and ecosystem metrics.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Last 30 Days
          </button>
          <button className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all text-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* KPI Row */}
        {kpis.map((kpi, i) => (
          <div key={i} className="col-span-12 md:col-span-6 lg:col-span-3 glass-card p-8 flex flex-col justify-between min-h-[160px] animate-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{kpi.label}</div>
            <div className="text-3xl font-serif font-bold text-white mt-2">{kpi.value}</div>
            <div className={`flex items-center gap-2 text-xs font-bold mt-6 ${kpi.isUp ? 'text-success' : 'text-accent'}`}>
              {kpi.isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {kpi.trend} <span className="text-text-muted">vs LY</span>
            </div>
          </div>
        ))}

        {/* Charts Row */}
        <div className="col-span-12 lg:col-span-8 glass-card p-10 animate-in stagger-2">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-serif">Revenue Trends</h3>
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <div className="w-2 h-2 rounded-full bg-primary" /> Current
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-text-muted">
                <div className="w-2 h-2 rounded-full bg-border" /> Previous
              </div>
            </div>
          </div>
          <MockChart title="Revenue Line Chart" height="h-72" />
        </div>

        <div className="col-span-12 lg:col-span-4 glass-card p-10 animate-in stagger-2">
          <h3 className="text-xl font-serif mb-10">User Segments</h3>
          <MockChart title="Segmentation Donut" height="h-56" />
          <div className="mt-8 space-y-4">
            {[
              { label: 'Digital Nomads', value: '60%', color: 'bg-primary' },
              { label: 'Business', value: '25%', color: 'bg-accent' },
              { label: 'Leisure', value: '15%', color: 'bg-gold' }
            ].map((s, i) => (
              <div key={i} className="flex justify-between items-center text-xs font-bold">
                <div className="flex items-center gap-3 text-text-secondary">
                  <div className={`w-2 h-2 rounded-full ${s.color}`} /> {s.label}
                </div>
                <span className="text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Destination Demand */}
        <div className="col-span-12 glass-card p-10 animate-in stagger-3">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-serif">Destination Demand</h3>
              <p className="text-xs text-text-secondary">Bookings per region by current quarter</p>
            </div>
            <select className="bg-bg-elevated border border-border rounded-lg py-2 px-4 text-xs font-bold text-white outline-none">
              <option>Q3 2024</option>
              <option>Q2 2024</option>
            </select>
          </div>
          <MockChart title="Regional Bar Chart" height="h-60" />
        </div>

        {/* Transactions Table */}
        <div className="col-span-12 bg-bg-surface border border-border rounded-2xl overflow-hidden animate-in stagger-4">
          <div className="px-10 py-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xl font-serif">Real-time Bookings</h3>
            <button className="text-xs font-bold text-primary hover:underline">VIEW FULL HISTORY</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/2">
                  <th className="px-10 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-white/5">User</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-white/5">Destination</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-white/5">Date</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-white/5">Amount</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-white/5">Status</th>
                  <th className="px-10 py-5 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-white/5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/2">
                {trips.slice(0, 5).map((trip, i) => (
                  <tr key={trip.id} className="hover:bg-white/2 transition-colors group">
                    <td className="px-10 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-bold text-primary">
                          {users.find(u => u.id === trip.userId)?.name[0] || 'U'}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{users.find(u => u.id === trip.userId)?.name || 'Unknown'}</div>
                          <div className="text-[10px] text-text-muted font-bold tracking-widest uppercase">Premium</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-5 text-sm text-text-secondary">
                      {stops.find(s => s.tripId === trip.id)?.cityName || 'Not set'}
                    </td>
                    <td className="px-10 py-5 text-sm text-text-secondary font-medium">
                      {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-10 py-5 text-sm font-bold text-primary">
                      ${(1200 + Math.random() * 5000).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-10 py-5">
                      <span className="bg-success/10 text-success border border-success/20 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                        CONFIRMED
                      </span>
                    </td>
                    <td className="px-10 py-5">
                      <button className="text-text-muted group-hover:text-primary transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
