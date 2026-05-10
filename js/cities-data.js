/* ============================================================
   cities-data.js — 50 curated world cities with metadata
   ============================================================ */
const CITIES = [
  { id:'paris',       name:'Paris',       country:'France',      countryCode:'FR', region:'Europe',        emoji:'🗼', costIndex:3, popularity:5, description:'The City of Light — fashion, art, romance.' },
  { id:'rome',        name:'Rome',        country:'Italy',       countryCode:'IT', region:'Europe',        emoji:'🏛️', costIndex:2, popularity:5, description:'Eternal City of ancient history and great food.' },
  { id:'barcelona',   name:'Barcelona',   country:'Spain',       countryCode:'ES', region:'Europe',        emoji:'🌊', costIndex:2, popularity:5, description:'Vibrant beach city with Gaudí architecture.' },
  { id:'amsterdam',   name:'Amsterdam',   country:'Netherlands', countryCode:'NL', region:'Europe',        emoji:'🚲', costIndex:3, popularity:4, description:'Canals, culture, and creative energy.' },
  { id:'prague',      name:'Prague',      country:'Czechia',     countryCode:'CZ', region:'Europe',        emoji:'🏰', costIndex:1, popularity:4, description:'Fairytale Old Town and craft beer capital.' },
  { id:'lisbon',      name:'Lisbon',      country:'Portugal',    countryCode:'PT', region:'Europe',        emoji:'🚋', costIndex:2, popularity:4, description:'Hilly city of trams, tiles, and fado music.' },
  { id:'vienna',      name:'Vienna',      country:'Austria',     countryCode:'AT', region:'Europe',        emoji:'🎶', costIndex:3, popularity:4, description:'Imperial palaces, coffee houses, and classical music.' },
  { id:'zurich',      name:'Zurich',      country:'Switzerland', countryCode:'CH', region:'Europe',        emoji:'⛷️', costIndex:4, popularity:3, description:'Alpine luxury, banking, and pristine lakes.' },
  { id:'london',      name:'London',      country:'UK',          countryCode:'GB', region:'Europe',        emoji:'🎡', costIndex:4, popularity:5, description:'World-class museums, royals, and pub culture.' },
  { id:'edinburgh',   name:'Edinburgh',   country:'UK',          countryCode:'GB', region:'Europe',        emoji:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', costIndex:2, popularity:3, description:'Dramatic castle atop volcanic rock.' },
  { id:'tokyo',       name:'Tokyo',       country:'Japan',       countryCode:'JP', region:'Asia',          emoji:'🗾', costIndex:3, popularity:5, description:'Futuristic megacity blending tradition with innovation.' },
  { id:'kyoto',       name:'Kyoto',       country:'Japan',       countryCode:'JP', region:'Asia',          emoji:'⛩️', costIndex:2, popularity:4, description:'Ancient temples, geisha districts, bamboo groves.' },
  { id:'bangkok',     name:'Bangkok',     country:'Thailand',    countryCode:'TH', region:'Asia',          emoji:'🛕', costIndex:1, popularity:5, description:'Street food paradise with ornate temples.' },
  { id:'bali',        name:'Bali',        country:'Indonesia',   countryCode:'ID', region:'Asia',          emoji:'🌴', costIndex:1, popularity:5, description:'Tropical paradise with rice terraces and surf.' },
  { id:'singapore',   name:'Singapore',   country:'Singapore',   countryCode:'SG', region:'Asia',          emoji:'🦁', costIndex:3, popularity:4, description:'Ultra-modern city-state with stunning food scene.' },
  { id:'seoul',       name:'Seoul',       country:'South Korea', countryCode:'KR', region:'Asia',          emoji:'🏙️', costIndex:2, popularity:4, description:'K-pop, palaces, and incredible street food.' },
  { id:'hong_kong',   name:'Hong Kong',   country:'China',       countryCode:'HK', region:'Asia',          emoji:'🌃', costIndex:3, popularity:4, description:'Vertical city with world-class harbour views.' },
  { id:'dubai',       name:'Dubai',       country:'UAE',         countryCode:'AE', region:'Middle East',   emoji:'🏗️', costIndex:4, popularity:4, description:'Desert luxury, skyscrapers, and golden sands.' },
  { id:'istanbul',    name:'Istanbul',    country:'Turkey',      countryCode:'TR', region:'Middle East',   emoji:'🕌', costIndex:2, popularity:4, description:'Where East meets West across the Bosphorus.' },
  { id:'marrakech',   name:'Marrakech',   country:'Morocco',     countryCode:'MA', region:'Africa',        emoji:'🕌', costIndex:1, popularity:4, description:'Medinas, souks, riads, and Sahara magic.' },
  { id:'cape_town',   name:'Cape Town',   country:'South Africa',countryCode:'ZA', region:'Africa',        emoji:'⛰️', costIndex:2, popularity:4, description:'Table Mountain, vineyards, and ocean sunsets.' },
  { id:'cairo',       name:'Cairo',       country:'Egypt',       countryCode:'EG', region:'Africa',        emoji:'🪬', costIndex:1, popularity:3, description:'Ancient pyramids and the mighty Nile River.' },
  { id:'new_york',    name:'New York',    country:'USA',         countryCode:'US', region:'Americas',      emoji:'🗽', costIndex:4, popularity:5, description:'The city that never sleeps — iconic and electric.' },
  { id:'los_angeles', name:'Los Angeles', country:'USA',         countryCode:'US', region:'Americas',      emoji:'🌴', costIndex:4, popularity:4, description:'Hollywood glamour, beaches, and year-round sun.' },
  { id:'miami',       name:'Miami',       country:'USA',         countryCode:'US', region:'Americas',      emoji:'🌊', costIndex:3, popularity:4, description:'Art deco, salsa, and pristine South Beach.' },
  { id:'mexico_city', name:'Mexico City', country:'Mexico',      countryCode:'MX', region:'Americas',      emoji:'🌮', costIndex:1, popularity:4, description:'Murals, museums, and incredible food culture.' },
  { id:'rio',         name:'Rio de Janeiro',country:'Brazil',    countryCode:'BR', region:'Americas',      emoji:'🏖️', costIndex:2, popularity:4, description:'Carnival, Christ the Redeemer, and Copacabana.' },
  { id:'buenos_aires',name:'Buenos Aires',country:'Argentina',   countryCode:'AR', region:'Americas',      emoji:'💃', costIndex:1, popularity:3, description:'Tango, steak, and European architecture.' },
  { id:'sydney',      name:'Sydney',      country:'Australia',   countryCode:'AU', region:'Oceania',       emoji:'🦘', costIndex:3, popularity:4, description:'Opera House, Bondi Beach, and harbour charm.' },
  { id:'auckland',    name:'Auckland',    country:'New Zealand', countryCode:'NZ', region:'Oceania',       emoji:'🥝', costIndex:3, popularity:3, description:'City of sails with volcanic islands.' },
  { id:'maldives',    name:'Malé',        country:'Maldives',    countryCode:'MV', region:'Asia',          emoji:'🏝️', costIndex:4, popularity:4, description:'Crystal lagoons, overwater bungalows, coral reefs.' },
  { id:'santorini',   name:'Santorini',   country:'Greece',      countryCode:'GR', region:'Europe',        emoji:'🫙', costIndex:3, popularity:5, description:'White-washed cliffs, blue domes, volcanic sunsets.' },
  { id:'florence',    name:'Florence',    country:'Italy',       countryCode:'IT', region:'Europe',        emoji:'🎨', costIndex:3, popularity:4, description:'Renaissance art capital — Uffizi, Duomo, Ponte Vecchio.' },
  { id:'berlin',      name:'Berlin',      country:'Germany',     countryCode:'DE', region:'Europe',        emoji:'🐻', costIndex:2, popularity:4, description:'Art, history, techno, and incredible street art.' },
  { id:'munich',      name:'Munich',      country:'Germany',     countryCode:'DE', region:'Europe',        emoji:'🍺', costIndex:3, popularity:3, description:'Oktoberfest, BMW, and alpine day trips.' },
  { id:'copenhagen',  name:'Copenhagen',  country:'Denmark',     countryCode:'DK', region:'Europe',        emoji:'🧜', costIndex:4, popularity:3, description:'Hygge culture, world-class restaurants, and cycling.' },
  { id:'stockholm',   name:'Stockholm',   country:'Sweden',      countryCode:'SE', region:'Europe',        emoji:'🐟', costIndex:4, popularity:3, description:'Venice of the North across 14 stunning islands.' },
  { id:'oslo',        name:'Oslo',        country:'Norway',      countryCode:'NO', region:'Europe',        emoji:'🫎', costIndex:4, popularity:3, description:'Fjords, Viking history, and northern lights gateway.' },
  { id:'reykjavik',   name:'Reykjavik',   country:'Iceland',     countryCode:'IS', region:'Europe',        emoji:'🌋', costIndex:4, popularity:4, description:'Geysers, glaciers, and the midnight sun.' },
  { id:'taipei',      name:'Taipei',      country:'Taiwan',      countryCode:'TW', region:'Asia',          emoji:'🫧', costIndex:2, popularity:3, description:'Night markets, hot springs, and Taipei 101.' },
  { id:'hanoi',       name:'Hanoi',       country:'Vietnam',     countryCode:'VN', region:'Asia',          emoji:'🏮', costIndex:1, popularity:3, description:'Ancient Old Quarter and incredible Vietnamese cuisine.' },
  { id:'ho_chi_minh', name:'Ho Chi Minh City',country:'Vietnam', countryCode:'VN', region:'Asia',          emoji:'🛵', costIndex:1, popularity:3, description:'Dynamic southern city with French colonial charm.' },
  { id:'kathmandu',   name:'Kathmandu',   country:'Nepal',       countryCode:'NP', region:'Asia',          emoji:'🏔️', costIndex:1, popularity:3, description:'Gateway to the Himalayas, stupas and trekking.' },
  { id:'mumbai',      name:'Mumbai',      country:'India',       countryCode:'IN', region:'Asia',          emoji:'🎬', costIndex:1, popularity:3, description:'Bollywood, street food, and coastal grandeur.' },
  { id:'delhi',       name:'Delhi',       country:'India',       countryCode:'IN', region:'Asia',          emoji:'🕌', costIndex:1, popularity:3, description:'Mughal history, bustling bazaars, and taj day trips.' },
  { id:'nairobi',     name:'Nairobi',     country:'Kenya',       countryCode:'KE', region:'Africa',        emoji:'🦁', costIndex:1, popularity:3, description:'Safari gateway — Masai Mara is a short drive away.' },
  { id:'havana',      name:'Havana',      country:'Cuba',        countryCode:'CU', region:'Americas',      emoji:'🚗', costIndex:1, popularity:3, description:'Vintage cars, salsa, and colorful colonial streets.' },
  { id:'cartagena',   name:'Cartagena',   country:'Colombia',    countryCode:'CO', region:'Americas',      emoji:'🌺', costIndex:1, popularity:3, description:'Walled old city with Caribbean charm and color.' },
  { id:'prague_2',    name:'Kraków',      country:'Poland',      countryCode:'PL', region:'Europe',        emoji:'🏰', costIndex:1, popularity:3, description:'Medieval beauty, Auschwitz history, and great beer.' },
  { id:'phuket',      name:'Phuket',      country:'Thailand',    countryCode:'TH', region:'Asia',          emoji:'🏖️', costIndex:1, popularity:4, description:'Tropical beaches, vibrant nightlife, and island hopping.' },
];

const CITY_GRADIENTS = [
  'linear-gradient(135deg, #1a4a8a, #3B82F6)',
  'linear-gradient(135deg, #7c2d12, #ea580c)',
  'linear-gradient(135deg, #14532d, #16a34a)',
  'linear-gradient(135deg, #4c1d95, #7c3aed)',
  'linear-gradient(135deg, #831843, #db2777)',
  'linear-gradient(135deg, #164e63, #0891b2)',
  'linear-gradient(135deg, #713f12, #ca8a04)',
  'linear-gradient(135deg, #0f172a, #475569)',
];

function getCityGradient(cityId) {
  const hash = cityId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return CITY_GRADIENTS[hash % CITY_GRADIENTS.length];
}

async function searchCities(query, region = 'all') {
  if (window.SygicAPI && window.SYGIC_API_KEY !== 'YOUR_SYGIC_API_KEY_HERE') {
      const results = await window.SygicAPI.searchSygicCities(query);
      if (results && results.length > 0) return results;
  }
  // Fallback to static data
  let results = CITIES;
  if (region !== 'all') results = results.filter(c => c.region === region);
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
    );
  }
  return results;
}

async function getCityById(id) { 
  let c = CITIES.find(c => c.id === id);
  if (c) return c;
  
  if (window.SygicAPI && window.SYGIC_API_KEY !== 'YOUR_SYGIC_API_KEY_HERE') {
      return await window.SygicAPI.getSygicCityById(id);
  }
  return null;
}
