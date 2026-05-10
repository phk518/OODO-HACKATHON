import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Discovery from './pages/Discovery'
import ActivitySearch from './pages/ActivitySearch'
import CreateTrip from './pages/CreateTrip'
import ItineraryBuilder from './pages/ItineraryBuilder'
import ItineraryView from './pages/ItineraryView'
import MyTrips from './pages/MyTrips'
import PackingChecklist from './pages/PackingChecklist'
import TripBudget from './pages/TripBudget'
import TripJournal from './pages/TripJournal'
import SharedItinerary from './pages/SharedItinerary'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AdminAnalytics from './pages/AdminAnalytics'

function App() {
  return (
    <Routes>
      {/* Auth pages (no layout shell) */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Main app pages with shared layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/discovery" element={<Discovery />} />
        <Route path="/discovery/:cityId/activities" element={<ActivitySearch />} />
        <Route path="/trips" element={<MyTrips />} />
        <Route path="/trips/new" element={<CreateTrip />} />
        <Route path="/trips/:tripId/itinerary" element={<ItineraryBuilder />} />
        <Route path="/trips/:tripId/view" element={<ItineraryView />} />
        <Route path="/trips/:tripId/packing" element={<PackingChecklist />} />
        <Route path="/trips/:tripId/budget" element={<TripBudget />} />
        <Route path="/trips/:tripId/journal" element={<TripJournal />} />
        <Route path="/trips/:tripId/share" element={<SharedItinerary />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminAnalytics />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
