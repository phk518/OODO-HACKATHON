import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-bg-base border-t border-border py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="font-serif text-xl font-bold text-text-primary mb-4">Traveloop</div>
          <p className="text-sm text-text-secondary max-w-[240px]">
            Your personal AI-powered travel concierge. Seamless planning, real-world discovery.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div>
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Platform</div>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Explorer Hub</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Community</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Adventure Designer</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Support</div>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-border flex justify-between items-center text-xs text-text-muted">
        <div>© 2026 Traveloop. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-text-secondary">Twitter</a>
          <a href="#" className="hover:text-text-secondary">Instagram</a>
          <a href="#" className="hover:text-text-secondary">GitHub</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
