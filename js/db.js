/* ============================================================
   db.js — Traveloop LocalStorage "Relational" Database Layer
   Simulates a relational schema with foreign-key semantics.
   ============================================================ */

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

/* ── Helpers ────────────────────────────────────────────────── */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function now() { return new Date().toISOString(); }

function readTable(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); }
  catch { return []; }
}
function writeTable(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/* ── Generic CRUD ───────────────────────────────────────────── */
function dbInsert(key, record) {
  const table = readTable(key);
  const row = { id: uid(), createdAt: now(), updatedAt: now(), ...record };
  table.push(row);
  writeTable(key, table);
  return row;
}
function dbFindAll(key) { return readTable(key); }
function dbFind(key, id) { return readTable(key).find(r => r.id === id) || null; }
function dbWhere(key, predicate) { return readTable(key).filter(predicate); }
function dbUpdate(key, id, patch) {
  const table = readTable(key).map(r =>
    r.id === id ? { ...r, ...patch, updatedAt: now() } : r
  );
  writeTable(key, table);
  return table.find(r => r.id === id) || null;
}
function dbDelete(key, id) {
  const table = readTable(key).filter(r => r.id !== id);
  writeTable(key, table);
}
function dbDeleteWhere(key, predicate) {
  writeTable(key, readTable(key).filter(r => !predicate(r)));
}

/* ── Users ──────────────────────────────────────────────────── */
const Users = {
  create({ name, email, password }) {
    if (this.findByEmail(email)) throw new Error('Email already registered');
    return dbInsert(DB_KEYS.USERS, {
      name, email,
      password: btoa(password), // simple obfuscation (not real security)
      avatar: null,
      language: 'en',
      savedDestinations: [],
      isAdmin: email === 'admin@traveloop.com',
    });
  },
  findByEmail(email) {
    return dbWhere(DB_KEYS.USERS, r => r.email === email)[0] || null;
  },
  findById(id) { return dbFind(DB_KEYS.USERS, id); },
  authenticate(email, password) {
    const user = this.findByEmail(email);
    if (!user) throw new Error('No account found with that email');
    if (user.password !== btoa(password)) throw new Error('Incorrect password');
    return user;
  },
  update(id, patch) { return dbUpdate(DB_KEYS.USERS, id, patch); },
  all() { return dbFindAll(DB_KEYS.USERS); },
};

/* ── Session ────────────────────────────────────────────────── */
const Session = {
  set(user) { localStorage.setItem(DB_KEYS.SESSION, JSON.stringify({ userId: user.id })); },
  get() {
    try {
      const s = JSON.parse(localStorage.getItem(DB_KEYS.SESSION));
      if (!s) return null;
      return Users.findById(s.userId);
    } catch { return null; }
  },
  clear() { localStorage.removeItem(DB_KEYS.SESSION); },
  require(redirect = 'index.html') {
    const user = Session.get();
    if (!user) { window.location.href = redirect; return null; }
    return user;
  },
};

/* ── Trips ──────────────────────────────────────────────────── */
const Trips = {
  create({ userId, name, description = '', startDate, endDate, coverPhoto = null, coverEmoji = '✈️' }) {
    return dbInsert(DB_KEYS.TRIPS, {
      userId, name, description, startDate, endDate, coverPhoto, coverEmoji,
      status: 'upcoming', isPublic: false,
      shareCode: uid().slice(0, 8).toUpperCase(),
    });
  },
  forUser(userId) {
    return dbWhere(DB_KEYS.TRIPS, r => r.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  find(id) { return dbFind(DB_KEYS.TRIPS, id); },
  findByShareCode(code) {
    return dbWhere(DB_KEYS.TRIPS, r => r.shareCode === code)[0] || null;
  },
  update(id, patch) { return dbUpdate(DB_KEYS.TRIPS, id, patch); },
  delete(id) {
    dbDelete(DB_KEYS.TRIPS, id);
    // Cascade: delete related stops, activities, budgets, notes
    const stops = Stops.forTrip(id);
    stops.forEach(s => {
      Activities.forStop(s.id).forEach(a => dbDelete(DB_KEYS.ACTIVITIES, a.id));
      dbDelete(DB_KEYS.STOPS, s.id);
    });
    dbDeleteWhere(DB_KEYS.BUDGETS, r => r.tripId === id);
    dbDeleteWhere(DB_KEYS.NOTES, r => r.tripId === id);
    dbDeleteWhere(DB_KEYS.PACKING, r => r.tripId === id);
  },
  all() { return dbFindAll(DB_KEYS.TRIPS); },
};

/* ── Stops ──────────────────────────────────────────────────── */
const Stops = {
  create({ tripId, cityId, cityName, country, countryCode, emoji, arrivalDate, departureDate, order = 0 }) {
    return dbInsert(DB_KEYS.STOPS, {
      tripId, cityId, cityName, country, countryCode, emoji,
      arrivalDate, departureDate, order,
    });
  },
  forTrip(tripId) {
    return dbWhere(DB_KEYS.STOPS, r => r.tripId === tripId)
      .sort((a, b) => a.order - b.order);
  },
  find(id) { return dbFind(DB_KEYS.STOPS, id); },
  update(id, patch) { return dbUpdate(DB_KEYS.STOPS, id, patch); },
  delete(id) {
    Activities.forStop(id).forEach(a => dbDelete(DB_KEYS.ACTIVITIES, a.id));
    dbDelete(DB_KEYS.STOPS, id);
  },
  reorder(tripId, orderedIds) {
    orderedIds.forEach((id, index) => dbUpdate(DB_KEYS.STOPS, id, { order: index }));
  },
};

/* ── Activities ─────────────────────────────────────────────── */
const Activities = {
  create({ stopId, name, category, cost = 0, duration = 60, description = '', emoji = '⭐', timeOfDay = 'morning' }) {
    return dbInsert(DB_KEYS.ACTIVITIES, {
      stopId, name, category, cost, duration, description, emoji, timeOfDay,
    });
  },
  forStop(stopId) {
    return dbWhere(DB_KEYS.ACTIVITIES, r => r.stopId === stopId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },
  find(id) { return dbFind(DB_KEYS.ACTIVITIES, id); },
  update(id, patch) { return dbUpdate(DB_KEYS.ACTIVITIES, id, patch); },
  delete(id) { dbDelete(DB_KEYS.ACTIVITIES, id); },
};

/* ── Budgets ────────────────────────────────────────────────── */
const Budgets = {
  upsert(tripId, data) {
    const existing = dbWhere(DB_KEYS.BUDGETS, r => r.tripId === tripId)[0];
    if (existing) return dbUpdate(DB_KEYS.BUDGETS, existing.id, data);
    return dbInsert(DB_KEYS.BUDGETS, { tripId, ...data });
  },
  forTrip(tripId) {
    return dbWhere(DB_KEYS.BUDGETS, r => r.tripId === tripId)[0] || {
      tripId, totalBudget: 0,
      transport: 0, accommodation: 0, activities: 0, meals: 0, miscellaneous: 0,
    };
  },
  /**
   * Compute actual spend from activities in a trip.
   */
  computeActual(tripId) {
    const stops = Stops.forTrip(tripId);
    let total = 0, byCategory = {};
    stops.forEach(stop => {
      const acts = Activities.forStop(stop.id);
      acts.forEach(act => {
        total += act.cost || 0;
        const cat = act.category || 'miscellaneous';
        byCategory[cat] = (byCategory[cat] || 0) + (act.cost || 0);
      });
    });
    return { total, byCategory };
  },
};

/* ── Notes ──────────────────────────────────────────────────── */
const Notes = {
  create({ tripId, stopId = null, content }) {
    return dbInsert(DB_KEYS.NOTES, { tripId, stopId, content });
  },
  forTrip(tripId) {
    return dbWhere(DB_KEYS.NOTES, r => r.tripId === tripId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  update(id, patch) { return dbUpdate(DB_KEYS.NOTES, id, patch); },
  delete(id) { dbDelete(DB_KEYS.NOTES, id); },
};

/* ── Packing ────────────────────────────────────────────────── */
const Packing = {
  create({ tripId, name, category = 'general' }) {
    return dbInsert(DB_KEYS.PACKING, { tripId, name, category, isPacked: false });
  },
  forTrip(tripId) { return dbWhere(DB_KEYS.PACKING, r => r.tripId === tripId); },
  toggle(id) {
    const item = dbFind(DB_KEYS.PACKING, id);
    if (!item) return;
    return dbUpdate(DB_KEYS.PACKING, id, { isPacked: !item.isPacked });
  },
  update(id, patch) { return dbUpdate(DB_KEYS.PACKING, id, patch); },
  delete(id) { dbDelete(DB_KEYS.PACKING, id); },
};

/* ── Seed Demo Data ─────────────────────────────────────────── */
function seedDemoData() {
  if (localStorage.getItem('tl_seeded')) return;

  // Create demo user
  const user = Users.create({ name: 'Alex Rivera', email: 'demo@traveloop.com', password: 'demo123' });

  // Create demo trip
  const trip = Trips.create({
    userId: user.id,
    name: 'European Summer 2025',
    description: 'A 3-week adventure through Western Europe',
    startDate: '2025-07-01', endDate: '2025-07-21',
    coverEmoji: '🌍',
  });

  // Stops
  const paris = Stops.create({ tripId: trip.id, cityId: 'paris', cityName: 'Paris', country: 'France', countryCode: 'FR', emoji: '🗼', arrivalDate: '2025-07-01', departureDate: '2025-07-07', order: 0 });
  const rome  = Stops.create({ tripId: trip.id, cityId: 'rome',  cityName: 'Rome',  country: 'Italy',  countryCode: 'IT', emoji: '🏛️', arrivalDate: '2025-07-07', departureDate: '2025-07-14', order: 1 });
  const barcelona = Stops.create({ tripId: trip.id, cityId: 'barcelona', cityName: 'Barcelona', country: 'Spain', countryCode: 'ES', emoji: '🌊', arrivalDate: '2025-07-14', departureDate: '2025-07-21', order: 2 });

  // Activities
  Activities.create({ stopId: paris.id, name: 'Eiffel Tower Visit', category: 'sightseeing', cost: 25, duration: 180, emoji: '🗼', timeOfDay: 'morning' });
  Activities.create({ stopId: paris.id, name: 'Louvre Museum',       category: 'culture',     cost: 17, duration: 240, emoji: '🎨', timeOfDay: 'afternoon' });
  Activities.create({ stopId: paris.id, name: 'Seine River Cruise',  category: 'adventure',   cost: 15, duration: 90,  emoji: '🚢', timeOfDay: 'evening' });
  Activities.create({ stopId: rome.id,  name: 'Colosseum Tour',      category: 'sightseeing', cost: 20, duration: 150, emoji: '🏛️', timeOfDay: 'morning' });
  Activities.create({ stopId: rome.id,  name: 'Vatican Museums',     category: 'culture',     cost: 27, duration: 180, emoji: '🏛️', timeOfDay: 'afternoon' });
  Activities.create({ stopId: barcelona.id, name: 'Sagrada Familia', category: 'sightseeing', cost: 30, duration: 120, emoji: '⛪', timeOfDay: 'morning' });
  Activities.create({ stopId: barcelona.id, name: 'La Boqueria Market Food Tour', category: 'food', cost: 40, duration: 90, emoji: '🍤', timeOfDay: 'afternoon' });

  // Budget
  Budgets.upsert(trip.id, { totalBudget: 3000, transport: 600, accommodation: 900, activities: 500, meals: 700, miscellaneous: 300 });

  // Admin user
  Users.create({ name: 'Admin', email: 'admin@traveloop.com', password: 'admin123' });

  localStorage.setItem('tl_seeded', '1');
}

// Auto-seed on first load
seedDemoData();
