import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock login logic
    if (formData.email === 'demo@traveloop.com' && formData.password === 'demo123') {
      localStorage.setItem('tl_session', 'active')
      localStorage.setItem('tl_user', JSON.stringify({ name: 'Demo User', email: formData.email }))
      navigate('/dashboard')
    } else {
      alert('Invalid credentials. Try demo@traveloop.com / demo123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-base">
      {/* Background */}
      <img 
        src="https://images.unsplash.com/photo-1506929662133-570293363f78?auto=format&fit=crop&q=80&w=1600" 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        alt="Login Background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base/40 via-bg-base/80 to-bg-base" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 glass-card animate-in">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg mb-4">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif mb-2">Traveloop</h1>
          <p className="text-sm text-text-muted">Your professional partner for seamless travel planning.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input 
                type="email" 
                required 
                className="w-full bg-bg-elevated border border-border rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all"
                placeholder="demo@traveloop.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Password</label>
              <button type="button" className="text-xs text-primary hover:underline">Forgot?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
              <input 
                type="password" 
                required 
                className="w-full bg-bg-elevated border border-border rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-primary/50 transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Login <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-[1px] bg-white/5" />
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest">or</span>
          <div className="flex-1 h-[1px] bg-white/5" />
        </div>

        <div className="text-center">
          <p className="text-sm text-text-secondary mb-6">
            New here? <Link to="/register" className="text-primary font-bold hover:underline">Create account</Link>
          </p>
          <div className="flex justify-center gap-4">
            <button className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-white/5 transition-colors">
              <Github className="w-6 h-6 text-white" />
            </button>
            <button className="w-12 h-12 rounded-xl border border-border flex items-center justify-center hover:bg-white/5 transition-colors text-white font-bold">
              G
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Internal Plane icon as a fallback if lucide-react Plane isn't exported as such
const Plane = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1.1.1-1.5.5l-.3.3c-.4.4-.5 1-.1 1.4L9 12l-4 4H3l-1 1 3 3 1-1v-2l4-4 3.6 5.9c.4.4 1 .3 1.4-.1l.3-.3c.4-.4.6-1 .5-1.5z" />
  </svg>
)

export default Login
