import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Pages
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Discovery from './pages/Discovery'
import ItineraryDesigner from './pages/ItineraryDesigner'
import Community from './pages/Community'
import Profile from './pages/Profile'
import Trips from './pages/Trips'
import Admin from './pages/Admin'
import CreateTrip from './pages/CreateTrip'
import Budget from './pages/Budget'
import Notes from './pages/Notes'
import Packing from './pages/Packing'
import Preferences from './pages/Preferences'
import Share from './pages/Share'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="discovery" element={<Discovery />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
          <Route path="trips" element={<Trips />} />
          <Route path="create-trip" element={<CreateTrip />} />
          <Route path="budget" element={<Budget />} />
          <Route path="admin" element={<Admin />} />
          <Route path="notes" element={<Notes />} />
          <Route path="packing" element={<Packing />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="share" element={<Share />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="itinerary" element={<ItineraryDesigner />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
