const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ─── Database Connection ─────────────────────────────────────────
let db;

async function initDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
    });

    // Create database if not exists
    await db.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    await db.query(`USE \`${process.env.DB_NAME}\``);

    // Create tables
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        location VARCHAR(255),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS trips (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        start_date DATE,
        end_date DATE,
        cover_url TEXT,
        collaborative BOOLEAN DEFAULT FALSE,
        status ENUM('draft', 'planning', 'upcoming', 'active', 'completed') DEFAULT 'draft',
        budget DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS stops (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trip_id INT,
        city VARCHAR(255) NOT NULL,
        country VARCHAR(255),
        start_date DATE,
        end_date DATE,
        sort_order INT DEFAULT 0,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        stop_id INT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        time VARCHAR(50),
        cost DECIMAL(10,2) DEFAULT 0,
        duration_minutes INT,
        icon VARCHAR(50),
        sort_order INT DEFAULT 0,
        FOREIGN KEY (stop_id) REFERENCES stops(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Database connected & tables ready');
  } catch (err) {
    console.warn('⚠️  MySQL not available, running with in-memory fallback');
    console.warn('   Error:', err.message);
    db = null;
  }
}

// ─── Auth Middleware ──────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ─── Auth Routes ─────────────────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { fullname, email, password, location, address } = req.body;
    const hash = await bcrypt.hash(password, 10);

    if (db) {
      const [result] = await db.query(
        'INSERT INTO users (fullname, email, password, location, address) VALUES (?, ?, ?, ?, ?)',
        [fullname, email, hash, location, address]
      );
      const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: result.insertId, fullname, email } });
    } else {
      const token = jwt.sign({ id: 1, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: 1, fullname, email } });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (db) {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (!rows.length) return res.status(401).json({ error: 'User not found' });
      const valid = await bcrypt.compare(password, rows[0].password);
      if (!valid) return res.status(401).json({ error: 'Invalid password' });
      const token = jwt.sign({ id: rows[0].id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: rows[0].id, fullname: rows[0].fullname, email } });
    } else {
      const token = jwt.sign({ id: 1, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: 1, fullname: 'Explorer', email } });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ─── Trips CRUD ──────────────────────────────────────────────────
app.get('/api/trips', async (req, res) => {
  if (db) {
    const [rows] = await db.query('SELECT * FROM trips ORDER BY created_at DESC');
    res.json(rows);
  } else {
    res.json([
      { id: 1, title: 'Parisian Spring', status: 'upcoming', start_date: '2024-05-12', end_date: '2024-05-19', budget: 2400 },
      { id: 2, title: 'Maldives Retreat', status: 'planning', start_date: '2024-08-05', end_date: '2024-08-15', budget: 5200 },
    ]);
  }
});

app.get('/api/trips/:id', async (req, res) => {
  if (db) {
    const [rows] = await db.query('SELECT * FROM trips WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Trip not found' });
    res.json(rows[0]);
  } else {
    res.json({ id: req.params.id, title: 'European Summer Escape', status: 'planning' });
  }
});

app.post('/api/trips', async (req, res) => {
  const { title, description, start_date, end_date, collaborative, budget } = req.body;
  if (db) {
    const [result] = await db.query(
      'INSERT INTO trips (title, description, start_date, end_date, collaborative, budget, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, start_date, end_date, collaborative || false, budget || 0, 1]
    );
    res.json({ id: result.insertId, title });
  } else {
    res.json({ id: Date.now(), title });
  }
});

app.put('/api/trips/:id', async (req, res) => {
  const { title, description, start_date, end_date, status, budget } = req.body;
  if (db) {
    await db.query(
      'UPDATE trips SET title=?, description=?, start_date=?, end_date=?, status=?, budget=? WHERE id=?',
      [title, description, start_date, end_date, status, budget, req.params.id]
    );
  }
  res.json({ success: true });
});

app.delete('/api/trips/:id', async (req, res) => {
  if (db) await db.query('DELETE FROM trips WHERE id = ?', [req.params.id]);
  res.json({ success: true });
});

// ─── Activities ──────────────────────────────────────────────────
app.get('/api/trips/:tripId/activities', async (req, res) => {
  if (db) {
    const [rows] = await db.query(
      `SELECT a.* FROM activities a 
       JOIN stops s ON a.stop_id = s.id 
       WHERE s.trip_id = ? ORDER BY s.sort_order, a.sort_order`,
      [req.params.tripId]
    );
    res.json(rows);
  } else {
    res.json([
      { id: 1, name: 'Louvre Museum Tour', category: 'sightseeing', cost: 65, time: '10:00 AM' },
      { id: 2, name: 'Dinner at Le Jules Verne', category: 'food', cost: 200, time: '08:30 PM' },
    ]);
  }
});

app.post('/api/trips/:tripId/activities', async (req, res) => {
  const { stop_id, name, description, category, time, cost, duration_minutes, icon } = req.body;
  if (db) {
    const [result] = await db.query(
      'INSERT INTO activities (stop_id, name, description, category, time, cost, duration_minutes, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [stop_id, name, description, category, time, cost, duration_minutes, icon]
    );
    res.json({ id: result.insertId, name });
  } else {
    res.json({ id: Date.now(), name });
  }
});

// ─── Sygic Proxy ─────────────────────────────────────────────────
app.get('/api/sygic/cities', async (req, res) => {
  try {
    const query = req.query.q;
    const response = await fetch(`https://api.sygictravelapi.com/1.2/en/places/list?query=${encodeURIComponent(query)}&levels=city&limit=10`, {
      headers: { 'x-api-key': process.env.SYGIC_API_KEY }
    });
    const data = await response.json();
    const cities = (data.data?.places || []).map(p => ({
      id: p.id, name: p.name,
      country: p.name_suffix ? p.name_suffix.split(', ').pop() : 'Unknown',
      rating: p.rating, description: p.perex || 'A beautiful destination.',
      boundingBox: p.bounding_box
    }));
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/sygic/activities/:cityId', async (req, res) => {
  try {
    const response = await fetch(`https://api.sygictravelapi.com/1.2/en/places/list?parent=${req.params.cityId}&levels=poi&limit=20`, {
      headers: { 'x-api-key': process.env.SYGIC_API_KEY }
    });
    const data = await response.json();
    const activities = (data.data?.places || []).map(p => ({
      id: p.id, name: p.name,
      category: p.categories?.[0] || 'sightseeing',
      description: p.perex || 'Explore this point of interest.',
      duration: p.duration ? Math.round(p.duration / 60) : 120,
    }));
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Gemini AI ───────────────────────────────────────────────────
async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    return { text: 'Gemini API key not configured. Please add your key to the .env file.' };
  }
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
    return { text };
  } catch (err) {
    return { text: `AI Error: ${err.message}` };
  }
}

app.post('/api/ai/generate-itinerary', async (req, res) => {
  const { prompt } = req.body;
  const fullPrompt = `You are a travel planning AI assistant for "Traveloop". Generate a detailed day-by-day travel itinerary based on: ${prompt}. Include specific activities, timings, estimated costs, and local tips. Format as JSON with structure: { days: [{ dayNumber, title, location, activities: [{ time, name, description, estimatedCost, icon }] }] }`;
  const result = await callGemini(fullPrompt);
  res.json(result);
});

app.post('/api/ai/packing-suggestions', async (req, res) => {
  const { destination, duration, activities } = req.body;
  const prompt = `Suggest a packing list for a ${duration}-day trip to ${destination}. Activities planned: ${activities?.join(', ') || 'general sightseeing'}. Return as JSON: { categories: [{ name, items: [string] }] }`;
  const result = await callGemini(prompt);
  res.json(result);
});

app.post('/api/ai/budget-estimate', async (req, res) => {
  const { destination, duration, travelStyle } = req.body;
  const prompt = `Estimate a travel budget for a ${duration}-day trip to ${destination} with ${travelStyle || 'mid-range'} travel style. Break down by: flights, accommodation, food, activities, transport, misc. Return as JSON: { total, breakdown: [{ category, amount, tips }] }`;
  const result = await callGemini(prompt);
  res.json(result);
});

// ─── Health Check ────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: db ? 'connected' : 'fallback', timestamp: new Date().toISOString() });
});

// ─── Start Server ────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Traveloop API running on http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  });
});
