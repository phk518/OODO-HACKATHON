import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuARPYB7PuToeJbcW1iODqrbeKaK0UhfMW9FhumAWXYikgPM6ua1HBC2CSiB_U3V1t070DowZgfGPnKDThgSFK6rmG9SHKGRa-WtFbzFLXx4jT1CTTIOTc-fmw0_goKcCUnuUL58ApbnTfj_UmXJSXIce29jcx-z4zpIx_9hAcCVqbGr-o71JdelXYVgGWGXstH54sI17XB9AJm9R4UCINnZC2xCKlpCCqxviGQxQv-1DReDi197iiEk8v6v9e8-Op4Rd-LRiRsCAto'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullname: '', email: '', password: '', confirm: '', location: '', address: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden">
      {/* Left: Hero */}
      <section className="hidden md:flex md:w-5/12 lg:w-1/2 relative bg-secondary overflow-hidden">
        <img alt="Beach sunset" className="absolute inset-0 w-full h-full object-cover" src={HERO_IMG} />
        <div className="absolute inset-0 vignette-overlay flex flex-col justify-end p-16">
          <div className="max-w-md">
            <h1 className="font-display text-5xl font-bold text-white mb-4">Traveloop</h1>
            <p className="font-body text-lg text-white/90">Your journey into the extraordinary begins here. Curated adventures for the modern explorer.</p>
          </div>
        </div>
      </section>

      {/* Right: Form */}
      <section className="flex-1 flex flex-col items-center justify-center p-5 md:p-16 bg-surface relative overflow-y-auto">
        <div className="md:hidden w-full flex justify-center mb-8">
          <span className="font-heading text-2xl font-semibold text-primary tracking-tight">Traveloop</span>
        </div>
        <div className="w-full max-w-[480px] bg-white p-8 md:p-10 rounded-xl" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
          <header className="mb-8">
            <h2 className="font-heading text-3xl font-bold text-on-surface mb-2">Create Account</h2>
            <p className="font-body text-on-surface-variant">Step into a world of sophisticated travel planning.</p>
          </header>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="font-label text-sm font-semibold text-on-surface-variant flex items-center gap-2" htmlFor="fullname">
                <span className="material-symbols-outlined text-lg">person</span> Full Name
              </label>
              <input className="w-full h-12 px-4 rounded-lg border border-outline-variant/50 bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" id="fullname" placeholder="John Doe" type="text" required value={form.fullname} onChange={e => setForm({...form, fullname: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <label className="font-label text-sm font-semibold text-on-surface-variant flex items-center gap-2" htmlFor="email">
                <span className="material-symbols-outlined text-lg">mail</span> Email Address
              </label>
              <input className="w-full h-12 px-4 rounded-lg border border-outline-variant/50 bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" id="email" placeholder="explorer@traveloop.com" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-label text-sm font-semibold text-on-surface-variant flex items-center gap-2" htmlFor="password">
                  <span className="material-symbols-outlined text-lg">lock</span> Password
                </label>
                <input className="w-full h-12 px-4 rounded-lg border border-outline-variant/50 bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" id="password" placeholder="••••••••" type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="font-label text-sm font-semibold text-on-surface-variant flex items-center gap-2" htmlFor="confirm">
                  <span className="material-symbols-outlined text-lg">verified_user</span> Confirm
                </label>
                <input className="w-full h-12 px-4 rounded-lg border border-outline-variant/50 bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" id="confirm" placeholder="••••••••" type="password" required value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="font-label text-sm font-semibold text-on-surface-variant flex items-center gap-2" htmlFor="location">
                <span className="material-symbols-outlined text-lg">location_on</span> Location
              </label>
              <input className="w-full h-12 px-4 rounded-lg border border-outline-variant/50 bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-on-surface-variant/40" id="location" placeholder="San Francisco, CA" type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            </div>
            <div className="flex items-start gap-3 mt-2">
              <input className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant" id="terms" type="checkbox" required />
              <label className="text-sm font-semibold text-on-surface-variant" htmlFor="terms">I agree to the <a className="text-primary font-bold hover:underline" href="#">Terms of Service</a> and <a className="text-primary font-bold hover:underline" href="#">Privacy Policy</a>.</label>
            </div>
            <button className="mt-4 w-full h-14 bg-primary text-white font-heading text-lg font-semibold rounded-xl shadow-lg hover:bg-on-primary-fixed-variant active:scale-95 transition-all duration-200" type="submit">Sign Up</button>
          </form>
          <footer className="mt-8 text-center">
            <p className="font-label text-sm font-semibold text-on-surface-variant">
              Already have an account? <Link className="text-primary font-bold hover:underline ml-1" to="/login">Log In</Link>
            </p>
          </footer>
        </div>
        <div className="mt-12 hidden md:flex items-center gap-8 opacity-20">
          <span className="material-symbols-outlined text-4xl">flight_takeoff</span>
          <span className="material-symbols-outlined text-4xl">travel_explore</span>
          <span className="material-symbols-outlined text-4xl">beach_access</span>
        </div>
      </section>
    </main>
  )
}
