import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plane, Compass, ArrowRight, ShieldCheck, Globe } from 'lucide-react'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    country: '',
    bio: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock registration logic
    const user = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      city: formData.city,
      country: formData.country,
      bio: formData.bio
    }
    localStorage.setItem('tl_session', 'active')
    localStorage.setItem('tl_user', JSON.stringify(user))
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-bg-base">
      {/* Left Visual Panel */}
      <section className="relative lg:w-[42%] min-h-[400px] lg:min-h-screen flex items-center justify-center p-12 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale-[20%]"
          alt="Registration Background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-md animate-in">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-3xl font-black tracking-tight text-white">Traveloop</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Your journey begins with a single step.
          </h1>
          <p className="text-text-secondary text-lg mb-12 leading-relaxed">
            Join thousands of travelers who plan, track, and share their adventures with professional precision.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">Seamless Itineraries</p>
                <p className="text-sm text-text-muted">Connect every stop and activity.</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-7 h-7 text-accent" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">Active Exploration</p>
                <p className="text-sm text-text-muted">Discover hidden gems curated for you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Form Panel */}
      <section className="flex-1 flex items-center justify-center p-8 lg:p-24 bg-dots">
        <div className="w-full max-w-2xl glass-card p-10 md:p-14 animate-in stagger-1">
          <div className="mb-12">
            <h2 className="text-3xl font-serif mb-2">Create your account</h2>
            <p className="text-text-secondary">Start your next adventure with Professional Reliability.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">First Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-bg-elevated border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Last Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-bg-elevated border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-bg-elevated border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Password</label>
                <input 
                  type="password" 
                  required 
                  className="w-full bg-bg-elevated border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-widest ml-1">Travel Style</label>
              <textarea 
                rows="3" 
                className="w-full bg-bg-elevated border border-border rounded-xl py-3 px-4 text-white outline-none focus:border-primary/50 transition-all resize-none"
                placeholder="Tell us about your preferences..."
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>

            <div className="flex items-start gap-3 px-1">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-primary" />
              <label className="text-xs text-text-secondary leading-relaxed">
                I agree to the <Link className="text-primary font-bold hover:underline">Terms of Service</Link> and <Link className="text-primary font-bold hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Register Now <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-12 text-center pt-8 border-t border-white/5">
            <p className="text-sm text-text-secondary">
              Already have an account? <Link to="/login" className="text-accent font-bold hover:underline">Login here</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
