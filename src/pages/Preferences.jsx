import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Sparkles, MapPin, Check, Search, Plane } from 'lucide-react'
import { useData } from '../context/DataContext'

const QUESTIONS = [
  {
    id: 'pace',
    text: "What's your ideal travel pace?",
    type: 'single',
    options: [
      { emoji: '🐌', title: 'Slow & Immersive', desc: '3-4 days per city, deep dives', value: 'slow' },
      { emoji: '⚡', title: 'Fast & Packed', desc: '1-2 days per city, see everything', value: 'fast' },
      { emoji: '⚖️', title: 'Balanced Mix', desc: 'Some cities longer, some shorter', value: 'balanced' },
      { emoji: '🌊', title: 'Go with the Flow', desc: "I'll decide as I travel", value: 'flexible' },
    ]
  },
  {
    id: 'style',
    text: 'Which travel style fits you best?',
    type: 'single',
    options: [
      { emoji: '🏛️', title: 'Culture & History', desc: 'Museums, heritage, architecture', value: 'culture' },
      { emoji: '🍽️', title: 'Food & Drink', desc: 'Restaurants, markets, cooking classes', value: 'food' },
      { emoji: '🏔️', title: 'Adventure & Nature', desc: 'Hiking, outdoors, extreme sports', value: 'adventure' },
      { emoji: '💆', title: 'Relaxation & Wellness', desc: 'Beaches, spas, slow mornings', value: 'wellness' },
    ]
  },
  {
    id: 'budget',
    text: "What's your typical daily travel budget?",
    type: 'single',
    options: [
      { emoji: '💰', title: 'Budget ($0-$60/day)', desc: 'Hostels, street food, free sights', value: 'budget' },
      { emoji: '💳', title: 'Mid-Range ($60-$150/day)', desc: '3-star hotels, local restaurants', value: 'midrange' },
      { emoji: '✨', title: 'Premium ($150-$300/day)', desc: '4-star hotels, fine dining', value: 'premium' },
      { emoji: '👑', title: 'Luxury ($300+/day)', desc: '5-star everything, private transfers', value: 'luxury' },
    ]
  }
]

const Preferences = () => {
  const navigate = useNavigate()
  const { sessionUser, updatePreferences } = useData()
  
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleSelect = (qId, value) => {
    setAnswers({ ...answers, [qId]: value })
  }

  const handleNext = () => {
    if (!answers[QUESTIONS[currentStep].id]) return
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const travelerTypes = {
    culture: { label: 'Cultural Explorer', emoji: '🏛️', desc: 'You seek depth — history, art, and authentic local experiences.' },
    food: { label: 'Culinary Adventurer', emoji: '🍽️', desc: "Food is your compass. You'll plan entire days around a great meal." },
    adventure: { label: 'Thrill Seeker', emoji: '🏔️', desc: 'You push limits and seek the road less travelled.' },
    wellness: { label: 'Mindful Wanderer', emoji: '🧘', desc: 'You travel to recharge — beauty, peace, and slow mornings.' },
  }

  const type = travelerTypes[answers.style] || travelerTypes.culture

  if (showResults) {
    return (
      <div className="container mx-auto px-8 py-20 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-3xl w-full bg-gradient-to-br from-primary/20 via-bg-surface to-accent/20 border border-border rounded-3xl p-12 text-center animate-in shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-primary/10 via-transparent to-transparent opacity-50" />
          <div className="relative z-10">
            <div className="text-6xl mb-8">{type.emoji}</div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" /> Your Traveller Type
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{type.label}</h2>
            <p className="text-text-secondary text-lg mb-12 max-w-lg mx-auto">{type.desc}</p>
            
            <div className="flex justify-center gap-12 mb-12 py-8 border-y border-white/5">
              <div>
                <div className="text-white font-bold text-lg capitalize">{answers.budget}</div>
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Budget</div>
              </div>
              <div>
                <div className="text-white font-bold text-lg capitalize">{answers.pace}</div>
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Pace</div>
              </div>
              <div>
                <div className="text-white font-bold text-lg capitalize">{answers.style}</div>
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">Style</div>
              </div>
            </div>

            <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-8">🗺️ Recommended Destinations</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
               {['Tokyo', 'Paris', 'Rome', 'Bali'].map(city => (
                 <div key={city} className="bg-bg-surface border border-border p-4 rounded-2xl hover:border-primary transition-all cursor-pointer group">
                   <div className="text-2xl mb-2 group-hover:scale-125 transition-transform">📍</div>
                   <div className="text-sm font-bold text-white">{city}</div>
                 </div>
               ))}
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link to="/create-trip" className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                <Plane className="w-5 h-5" /> Start Planning
              </Link>
              <Link to="/discovery" className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                <Search className="w-5 h-5" /> Explore Cities
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = QUESTIONS[currentStep]

  return (
    <div className="container mx-auto px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16 animate-in">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Build Your Travel Profile</h1>
          <p className="text-text-secondary">Answer a few questions so we can personalise your itinerary recommendations.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-0 mb-12 animate-in stagger-1">
          {QUESTIONS.map((_, i) => (
            <React.Fragment key={i}>
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-500 ${i < currentStep ? 'bg-success border-success text-white' : i === currentStep ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-bg-elevated border-border text-text-muted'}`}>
                {i < currentStep ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              {i < QUESTIONS.length - 1 && (
                <div className={`flex-1 h-1 transition-all duration-500 ${i < currentStep ? 'bg-success' : 'bg-border'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Question Card */}
        <div className="glass-card p-10 animate-in stagger-1">
           <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-4">Question {currentStep + 1} of {QUESTIONS.length}</div>
           <h2 className="text-2xl md:text-3xl font-serif font-bold mb-10 text-white">{currentQ.text}</h2>
           
           <div className="space-y-4">
             {currentQ.options.map((opt, idx) => (
               <div 
                key={idx} 
                onClick={() => handleSelect(currentQ.id, opt.value)}
                className={`flex items-center gap-6 p-6 bg-bg-elevated border-2 rounded-2xl cursor-pointer transition-all hover:translate-x-2 ${answers[currentQ.id] === opt.value ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'border-border hover:border-primary/50'}`}
               >
                 <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${answers[currentQ.id] === opt.value ? 'border-primary bg-primary' : 'border-border'}`}>
                    <div className="w-2 h-2 rounded-full bg-white opacity-0 transition-opacity" style={{ opacity: answers[currentQ.id] === opt.value ? 1 : 0 }} />
                 </div>
                 <div className="text-3xl">{opt.emoji}</div>
                 <div className="flex-1">
                   <div className="text-sm font-bold text-white">{opt.title}</div>
                   <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{opt.desc}</div>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-12 animate-in stagger-2">
          <button 
            onClick={handlePrev}
            className={`flex items-center gap-2 text-text-muted hover:text-primary transition-all font-bold text-sm ${currentStep === 0 ? 'invisible' : 'visible'}`}
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Question {currentStep + 1} of {QUESTIONS.length}</div>
          <button 
            onClick={handleNext}
            className={`flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all text-sm ${!answers[currentQ.id] ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {currentStep === QUESTIONS.length - 1 ? 'See Results' : 'Next'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Preferences
