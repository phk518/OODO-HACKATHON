import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const DB_KEYS = {
  USERS:      'tl_users',
  TRIPS:      'tl_trips',
  STOPS:      'tl_stops',
  ACTIVITIES: 'tl_activities',
  BUDGETS:    'tl_budgets',
  NOTES:      'tl_notes',
  PACKING:    'tl_packing',
  SESSION:    'tl_session',
};

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [stops, setStops] = useState([]);
  const [activities, setActivities] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [sessionUser, setSessionUser] = useState(null);

  // Initialize data from LocalStorage
  useEffect(() => {
    const loadData = () => {
      const u = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
      const t = JSON.parse(localStorage.getItem(DB_KEYS.TRIPS) || '[]');
      const s = JSON.parse(localStorage.getItem(DB_KEYS.STOPS) || '[]');
      const a = JSON.parse(localStorage.getItem(DB_KEYS.ACTIVITIES) || '[]');
      const b = JSON.parse(localStorage.getItem(DB_KEYS.BUDGETS) || '[]');
      const sess = JSON.parse(localStorage.getItem(DB_KEYS.SESSION) || 'null');

      setUsers(u);
      setTrips(t);
      setStops(s);
      setActivities(a);
      setBudgets(b);

      if (sess && sess.userId) {
        const found = u.find(user => user.id === sess.userId);
        setSessionUser(found);
      }
    };

    loadData();
  }, []);

  // Sync state to LocalStorage
  const sync = (key, data, setter) => {
    localStorage.setItem(key, JSON.stringify(data));
    setter(data);
  };

  /* --- Auth --- */
  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === btoa(password));
    if (user) {
      localStorage.setItem(DB_KEYS.SESSION, JSON.stringify({ userId: user.id }));
      setSessionUser(user);
      return user;
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem(DB_KEYS.SESSION);
    setSessionUser(null);
  };

  /* --- Trips --- */
  const addTrip = (tripData) => {
    const newTrip = { 
      id: Math.random().toString(36).substr(2, 9), 
      createdAt: new Date().toISOString(),
      ...tripData 
    };
    const updated = [...trips, newTrip];
    sync(DB_KEYS.TRIPS, updated, setTrips);
    return newTrip;
  };

  const deleteTrip = (id) => {
    const updated = trips.filter(t => t.id !== id);
    sync(DB_KEYS.TRIPS, updated, setTrips);
    // Cascade deletions would happen here too
  };

  /* --- Stops --- */
  const addStop = (stopData) => {
    const newStop = { 
      id: Math.random().toString(36).substr(2, 9), 
      createdAt: new Date().toISOString(),
      ...stopData 
    };
    const updated = [...stops, newStop];
    sync(DB_KEYS.STOPS, updated, setStops);
    return newStop;
  };

  const value = {
    users,
    trips,
    stops,
    activities,
    budgets,
    sessionUser,
    login,
    logout,
    addTrip,
    deleteTrip,
    addStop,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
