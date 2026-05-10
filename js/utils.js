/* ============================================================
   utils.js — Shared utility functions loaded on every page
   ============================================================ */

/* ── Toast ──────────────────────────────────────────────────── */
function showToast(msg, type = 'info') {
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3200);
}

/* ── Modal ──────────────────────────────────────────────────── */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('active'); document.body.style.overflow = ''; }
}

/* ── Dropdown ────────────────────────────────────────────────── */
document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  }
});
function toggleDropdown(id) {
  const menu = document.getElementById(id);
  if (!menu) return;
  const wasOpen = menu.classList.contains('open');
  document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  if (!wasOpen) menu.classList.add('open');
}

/* ── Date helpers ────────────────────────────────────────────── */
function formatDate(dateStr, opts = { month: 'short', day: 'numeric', year: 'numeric' }) {
  if (!dateStr) return '—';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', opts);
}
function daysBetween(start, end) {
  if (!start || !end) return 0;
  const diff = new Date(end) - new Date(start);
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
function tripStatus(startDate, endDate) {
  const today = new Date(); today.setHours(0,0,0,0);
  const s = new Date(startDate); const e = new Date(endDate);
  if (today < s) return 'upcoming';
  if (today > e) return 'past';
  return 'ongoing';
}

/* ── Currency ────────────────────────────────────────────────── */
function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount || 0);
}

/* ── Avatar Initials ─────────────────────────────────────────── */
function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

/* ── URL Params ──────────────────────────────────────────────── */
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/* ── Active nav link ─────────────────────────────────────────── */
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href && page.includes(href.split('?')[0])) {
      link.classList.add('active');
    }
  });
}
document.addEventListener('DOMContentLoaded', setActiveNav);

/* ── Render Navbar ───────────────────────────────────────────── */
function renderNavbar(user) {
  const nav = document.getElementById('main-navbar');
  if (!nav) return;
  const initials = getInitials(user.name);
  nav.innerHTML = `
    <a href="dashboard.html" class="navbar-brand">
      <div class="navbar-brand-icon">✈</div>
      Traveloop
    </a>
    <nav class="navbar-nav" aria-label="Main navigation">
      <a href="dashboard.html"   class="nav-link" id="nav-dashboard">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Dashboard
      </a>
      <a href="trips.html"       class="nav-link" id="nav-trips">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        My Trips
      </a>
      <a href="city-search.html" class="nav-link" id="nav-explore">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Explore
      </a>
    </nav>
    <div class="navbar-actions">
      <a href="create-trip.html" class="btn btn-accent btn-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        New Trip
      </a>
      <div class="dropdown">
        <div class="avatar avatar-sm pointer" style="background:var(--grad-primary);" onclick="toggleDropdown('user-menu')"
             title="${user.name}" aria-haspopup="true">${initials}</div>
        <div class="dropdown-menu" id="user-menu" role="menu">
          <div style="padding:8px 12px;font-size:0.8rem;">
            <div style="font-weight:600;color:var(--text-primary)">${user.name}</div>
            <div style="color:var(--text-muted)">${user.email}</div>
          </div>
          <div class="dropdown-divider"></div>
          <a href="profile.html"  class="dropdown-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Profile</a>
          ${user.isAdmin ? `<a href="admin.html" class="dropdown-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> Admin</a>` : ''}
          <div class="dropdown-divider"></div>
          <div class="dropdown-item danger" onclick="logout()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg> Sign Out</div>
        </div>
      </div>
    </div>
  `;
  setActiveNav();
}

function logout() {
  Session.clear();
  window.location.href = 'index.html';
}

/* ── Trip Card HTML ──────────────────────────────────────────── */
function renderTripCard(trip, stops = []) {
  const status = tripStatus(trip.startDate, trip.endDate);
  const statusMap = {
    upcoming: { label: 'Upcoming', cls: 'badge-primary' },
    ongoing:  { label: 'Ongoing',  cls: 'badge-success' },
    past:     { label: 'Past',     cls: 'badge-muted' },
  };
  const s = statusMap[status] || statusMap.upcoming;
  const days = daysBetween(trip.startDate, trip.endDate);
  const cities = stops.length;

  return `
    <div class="trip-card animate-in" onclick="window.location='itinerary.html?trip=${trip.id}'">
      <div class="trip-card-image-placeholder">
        <div style="position:absolute;inset:0;background:${randomTripGradient(trip.id)};"></div>
        <span style="position:relative;z-index:1;font-size:3.5rem;">${trip.coverEmoji || '✈️'}</span>
      </div>
      <div class="trip-card-body">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:6px;">
          <div class="trip-card-name truncate">${trip.name}</div>
          <span class="badge ${s.cls}" style="flex-shrink:0">${s.label}</span>
        </div>
        <div style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:4px;">
          ${formatDate(trip.startDate, { month:'short', day:'numeric' })} — ${formatDate(trip.endDate, { month:'short', day:'numeric', year:'numeric' })}
        </div>
        <div class="trip-card-meta">
          <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ${days} days</span>
          <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${cities} ${cities === 1 ? 'city' : 'cities'}</span>
        </div>
      </div>
      <div class="trip-card-actions" onclick="event.stopPropagation()">
        <a href="itinerary.html?trip=${trip.id}" class="btn btn-ghost btn-sm" style="flex:1;justify-content:center;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit
        </a>
        <a href="budget.html?trip=${trip.id}" class="btn btn-outline-primary btn-sm" style="flex:1;justify-content:center;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          Budget
        </a>
        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteTripConfirm('${trip.id}', '${trip.name.replace(/'/g,'')}')" data-tooltip="Delete">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </div>
    </div>`;
}

function randomTripGradient(id) {
  const grads = [
    'linear-gradient(135deg,#1a4a8a,#3B82F6)',
    'linear-gradient(135deg,#7c2d12,#ea580c)',
    'linear-gradient(135deg,#14532d,#16a34a)',
    'linear-gradient(135deg,#4c1d95,#7c3aed)',
    'linear-gradient(135deg,#831843,#db2777)',
    'linear-gradient(135deg,#164e63,#0891b2)',
    'linear-gradient(135deg,#713f12,#ca8a04)',
  ];
  const hash = (id || '').split('').reduce((a,c) => a + c.charCodeAt(0), 0);
  return grads[hash % grads.length];
}

function deleteTripConfirm(tripId, tripName) {
  if (confirm(`Delete "${tripName}"? This cannot be undone.`)) {
    Trips.delete(tripId);
    showToast('Trip deleted', 'info');
    // Re-render if on trips page
    if (typeof renderTrips === 'function') renderTrips();
    if (typeof loadDashboard === 'function') loadDashboard();
  }
}
