/* ============================================================
   sygic-api.js — Sygic Travel API Client
   ============================================================ */

const SYGIC_API_KEY = 'YOUR_SYGIC_API_KEY_HERE'; // TODO: Replace with your actual Sygic API Key
window.SYGIC_API_KEY = SYGIC_API_KEY;
const BASE_URL = 'https://api.sygictravelapi.com/1.2/en';

// Map Sygic categories to our app's categories
const CATEGORY_MAP = {
  'sightseeing': 'sightseeing',
  'eating': 'food',
  'shopping': 'shopping',
  'going_out': 'nightlife',
  'doing_sports': 'adventure',
  'hiking': 'nature',
  'playing': 'adventure',
  'relaxing': 'wellness',
  'discovering': 'culture'
};

async function fetchSygic(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-api-key': SYGIC_API_KEY
      }
    });

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            console.error('Sygic API: Unauthorized. Please check your API key.');
        }
        throw new Error(`Sygic API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // Sygic wraps responses in a `data` object
  } catch (error) {
    console.error('Sygic fetch failed:', error);
    return null;
  }
}

/**
 * Searches for destinations (cities) based on a query.
 */
async function searchSygicCities(query) {
    if (!query) return [];
    
    // Check cache
    const cacheKey = `sygic_cities_${query}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    const data = await fetchSygic('/places/list', {
        query: query,
        levels: 'city',
        limit: 10
    });

    if (data && data.places) {
        const results = data.places.map(place => ({
            id: place.id,
            name: place.name,
            country: place.name_suffix ? place.name_suffix.split(', ').pop() : 'Unknown',
            region: 'Global',
            emoji: '🏙️',
            costIndex: 2, 
            popularity: place.rating ? Math.round((place.rating + 10) / 4) : 3,
            description: place.perex || 'A beautiful destination.',
            boundingBox: place.bounding_box
        }));
        
        sessionStorage.setItem(cacheKey, JSON.stringify(results));
        return results;
    }
    
    return [];
}

/**
 * Fetches POIs (activities) for a given city ID or bounding box.
 */
async function getSygicActivities(cityId, boundingBox = null) {
    // Check cache
    const cacheKey = `sygic_acts_${cityId}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);

    const params = {
        limit: 20,
        levels: 'poi'
    };
    
    if (boundingBox) {
        params.bounds = `${boundingBox.south},${boundingBox.west},${boundingBox.north},${boundingBox.east}`;
    } else {
        params.parent = cityId;
    }

    const data = await fetchSygic('/places/list', params);

    if (data && data.places) {
        const results = data.places.map(place => {
            const sygicCat = place.categories && place.categories.length > 0 ? place.categories[0] : 'sightseeing';
            const ourCat = CATEGORY_MAP[sygicCat] || 'sightseeing';
            
            return {
                id: place.id,
                name: place.name,
                category: ourCat,
                avgCost: 20, 
                duration: place.duration ? place.duration / 60 : 120,
                emoji: getEmojiForCategory(ourCat),
                description: place.perex || 'Explore this point of interest.'
            };
        });
        
        sessionStorage.setItem(cacheKey, JSON.stringify(results));
        return results;
    }

    return [];
}

function getEmojiForCategory(cat) {
    const emojis = {
        'sightseeing': '🏛️', 'food': '🍽️', 'culture': '🎨', 
        'adventure': '🏔️', 'shopping': '🛍️', 'nature': '🌿', 
        'nightlife': '🎶', 'wellness': '🧘'
    };
    return emojis[cat] || '⭐';
}

window.SygicAPI = {
    searchSygicCities,
    getSygicActivities,
    getSygicCityById: async (id) => {
         const data = await fetchSygic('/places/list', { parent: id, levels: 'city', limit: 1 });
         if(data && data.places && data.places.length > 0) {
              const p = data.places[0];
              return { id: p.id, name: p.name, country: p.name_suffix || '' };
         }
         return null;
    }
};
