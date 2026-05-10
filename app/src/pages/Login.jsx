import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuARPYB7PuToeJbcW1iODqrbeKaK0UhfMW9FhumAWXYikgPM6ua1HBC2CSiB_U3V1t070DowZgfGPnKDThgSFK6rmG9SHKGRa-WtFbzFLXx4jT1CTTIOTc-fmw0_goKcCUnuUL58ApbnTfj_UmXJSXIce29jcx-z4zpIx_9hAcCVqbGr-o71JdelXYVgGWGXstH54sI17XB9AJm9R4UCINnZC2xCKlpCCqxviGQxQv-1DReDi197iiEk8v6v9e8-Op4Rd-LRiRsCAto'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden">
      <section className="hidden md:flex md:w-5/12 lg:w-1/2 relative bg-secondary overflow-hidden">
        <img alt="Beach sunset" className="absolute inset-0 w-full h-full object-cover" src={HERO_IMG} />
        <div className="absolute inset-0 vignette-overlay flex flex-col justify-end p-16">
          <div className="max-w-md">
            <h1 className="font-display text-5xl font-bold text-white mb-4">Traveloop</h1>
            <p className="font-body text-lg text-white/90">Welcome back, explorer. Your next adventure awaits.</p>
          </div>
        </div>
      </section>

      <section className="flex-1 flex flex-col items-center justify-center p-5 md:p-16 bg-surface">
        <div className="md:hidden w-full flex justify-center mb-8">
          <span className="font-heading text-2xl font-semibold text-primary tracking-tight">Traveloop</span>
        </div>
        <div className="w-full max-w-[480px] bg-white p-8 md:p-10 rounded-xl" style={{boxShadow: '0px 4px 10px rgba(26,43,60,0.08)'}}>
          <header className="mb-8">
            <h2 className="font-heading text-3xl font-bold text-on-surface mb-2">Welcome Back</h2>
            <p className="font-body text-on-surface-variant">Sign in to continue your journey.</p>
          </header>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="font-label text-sm font-semibold text-on-surface-variant flex items-center gap-2" htmlFor="email">
                <span className="material-symbols-outlined text-lg">mail</span> Email Address
              </label>
              <input className="w-full h-12 px-4 rounded-lg border border-outline-variant/50 bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/40" id="email" placeholder="explorer@traveloop.com" type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <label className="font-label text-sm font-semibold text-on-surface-variant flex items-center gap-2" htmlFor="password">
                <span className="material-symbols-outlined text-lg">lock</span> Password
              </label>
              <input className="w-full h-12 px-4 rounded-lg border border-outline-variant/50 bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" id="password" placeholder="••••••••" type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant" />
                <span className="text-sm text-on-surface-variant">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary font-semibold hover:underline">Forgot password?</a>
            </div>
            <button className="mt-4 w-full h-14 bg-primary text-white font-heading text-lg font-semibold rounded-xl shadow-lg hover:bg-on-primary-fixed-variant active:scale-95 transition-all duration-200" type="submit">Sign In</button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-outline-variant/30" />
            <span className="text-sm text-on-surface-variant">or</span>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          <button className="w-full h-12 border border-outline-variant/50 rounded-xl font-label text-sm font-semibold text-on-surface hover:bg-surface-container-low transition-colors flex items-center justify-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <footer className="mt-8 text-center">
            <p className="font-label text-sm font-semibold text-on-surface-variant">
              Don't have an account? <Link className="text-primary font-bold hover:underline ml-1" to="/signup">Sign Up</Link>
            </p>
          </footer>
        </div>
      </section>
    </main>
  )
}
