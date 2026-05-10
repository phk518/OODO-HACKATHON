# Traveloop ✈️

**Personalized Travel Planning Made Easy**

A full-featured travel planning web application built for the OODO Hackathon.

## Features

- 🔐 **Auth** — Login / Signup with demo accounts
- 🏠 **Dashboard** — Trip stats, quick actions, recommended destinations
- ✈️ **My Trips** — Grid view with search & status filters
- ➕ **Create Trip** — Live preview card, emoji picker, date selection
- 🗺️ **Itinerary Builder** — Add city stops, discover & add activities
- 👁️ **Itinerary View** — Timeline & list view toggle
- 🔍 **City Search** — 50+ cities with region/cost filters, add to trip
- 💰 **Budget** — Donut + bar charts, category breakdown, editable targets
- 🔗 **Share** — Public shareable links, copy trip feature
- 👤 **Profile** — Edit details, travel stats, change password
- 📊 **Admin** — Analytics charts, user management (admin@traveloop.com)

## Quick Start

Open `index.html` in any modern browser. No build step required.

**Demo credentials:**
- `demo@traveloop.com` / `demo123` — Pre-loaded with a European trip
- `admin@traveloop.com` / `admin123` — Admin dashboard access

## Tech Stack

- **Frontend:** Vanilla HTML5 + CSS3 + JavaScript (ES6+)
- **Data:** localStorage with relational schema (Users, Trips, Stops, Activities, Budgets, Notes)
- **Charts:** Chart.js 4.4
- **Icons:** Inline SVG (Lucide)
- **Fonts:** Google Fonts — Inter + Playfair Display

## Data Schema

```
users          { id, name, email, password, avatar, language }
trips          { id, userId, name, description, startDate, endDate, coverEmoji, shareCode }
stops          { id, tripId, cityId, cityName, country, arrivalDate, departureDate, order }
activities     { id, stopId, name, category, cost, duration, emoji }
budgets        { id, tripId, totalBudget, transport, accommodation, activities, meals, miscellaneous }
```
