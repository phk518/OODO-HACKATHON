/* ============================================================
   activities-data.js — Activity templates per city category
   ============================================================ */

const ACTIVITY_CATEGORIES = [
  { id:'sightseeing', label:'Sightseeing', emoji:'🏛️', color:'#3B82F6' },
  { id:'food',        label:'Food & Drink',emoji:'🍽️', color:'#F59E0B' },
  { id:'culture',     label:'Culture',     emoji:'🎨', color:'#8B5CF6' },
  { id:'adventure',   label:'Adventure',   emoji:'🏔️', color:'#10B981' },
  { id:'shopping',    label:'Shopping',    emoji:'🛍️', color:'#EC4899' },
  { id:'nature',      label:'Nature',      emoji:'🌿', color:'#84CC16' },
  { id:'nightlife',   label:'Nightlife',   emoji:'🎶', color:'#F97316' },
  { id:'wellness',    label:'Wellness',    emoji:'🧘', color:'#06B6D4' },
];

const CITY_ACTIVITIES = {
  paris: [
    { name:'Eiffel Tower', category:'sightseeing', avgCost:25, duration:180, emoji:'🗼', description:'Visit the iconic iron lattice tower with panoramic city views.' },
    { name:'Louvre Museum', category:'culture', avgCost:17, duration:240, emoji:'🎨', description:'World\'s largest art museum — home to the Mona Lisa.' },
    { name:'Seine River Cruise', category:'adventure', avgCost:15, duration:90, emoji:'🚢', description:'Glide past Notre-Dame, Eiffel Tower, and historic bridges.' },
    { name:'Montmartre Stroll', category:'sightseeing', avgCost:0, duration:120, emoji:'🎭', description:'Charming hilltop neighbourhood with Sacré-Cœur Basilica.' },
    { name:'Croissants at a Café', category:'food', avgCost:12, duration:60, emoji:'🥐', description:'Experience authentic Parisian café culture.' },
    { name:'Palace of Versailles', category:'culture', avgCost:30, duration:300, emoji:'👑', description:'Magnificent royal palace and manicured gardens.' },
    { name:'Moulin Rouge Show', category:'nightlife', avgCost:120, duration:150, emoji:'💃', description:'The world-famous can-can cabaret show.' },
  ],
  rome: [
    { name:'Colosseum', category:'sightseeing', avgCost:20, duration:150, emoji:'🏛️', description:'Iconic ancient amphitheatre where gladiators once fought.' },
    { name:'Vatican & Sistine Chapel', category:'culture', avgCost:27, duration:180, emoji:'🕊️', description:'Michelangelo\'s masterpiece ceiling and St. Peter\'s Basilica.' },
    { name:'Roman Forum Walk', category:'sightseeing', avgCost:12, duration:120, emoji:'🏺', description:'Stroll through the heart of ancient Rome.' },
    { name:'Trevi Fountain', category:'sightseeing', avgCost:0, duration:30, emoji:'⛲', description:'Throw a coin in the most famous fountain in the world.' },
    { name:'Pasta Making Class', category:'food', avgCost:75, duration:180, emoji:'🍝', description:'Learn to make authentic Roman pasta from scratch.' },
    { name:'Aperitivo at a Rooftop Bar', category:'nightlife', avgCost:25, duration:120, emoji:'🍷', description:'Enjoy Campari spritz with views of the eternal city skyline.' },
  ],
  barcelona: [
    { name:'Sagrada Família', category:'sightseeing', avgCost:30, duration:120, emoji:'⛪', description:'Gaudí\'s breathtaking unfinished masterpiece cathedral.' },
    { name:'Park Güell', category:'nature', avgCost:10, duration:90, emoji:'🦎', description:'Gaudí\'s mosaic park with sweeping Barcelona views.' },
    { name:'La Boqueria Market', category:'food', avgCost:25, duration:90, emoji:'🥩', description:'Vibrant covered market with fresh produce and tapas.' },
    { name:'Barceloneta Beach', category:'nature', avgCost:0, duration:180, emoji:'🏖️', description:'Sun, sand, and volleyball on the city beach.' },
    { name:'Gothic Quarter Walk', category:'sightseeing', avgCost:0, duration:120, emoji:'🏰', description:'Maze of medieval lanes with Roman ruins and boutiques.' },
    { name:'Flamenco Show', category:'nightlife', avgCost:45, duration:90, emoji:'💃', description:'Authentic flamenco performance with dinner.' },
  ],
  tokyo: [
    { name:'Shibuya Crossing', category:'sightseeing', avgCost:0, duration:30, emoji:'🚦', description:'The world\'s busiest intersection — pure Tokyo energy.' },
    { name:'Senso-ji Temple', category:'culture', avgCost:0, duration:90, emoji:'⛩️', description:'Tokyo\'s oldest and most revered Buddhist temple.' },
    { name:'Tsukiji Outer Market', category:'food', avgCost:30, duration:120, emoji:'🐟', description:'Fresh sushi and street food at Japan\'s famous fish market area.' },
    { name:'teamLab Borderless', category:'culture', avgCost:32, duration:180, emoji:'✨', description:'Immersive digital art museum unlike anything in the world.' },
    { name:'Shinjuku Golden Gai', category:'nightlife', avgCost:40, duration:180, emoji:'🏮', description:'Labyrinth of tiny bars each with their own personality.' },
    { name:'Akihabara Tech Shopping', category:'shopping', avgCost:100, duration:180, emoji:'🎮', description:'Electronics paradise — anime, gadgets, arcades.' },
    { name:'Mt. Fuji Day Trip', category:'adventure', avgCost:50, duration:480, emoji:'🗻', description:'Visit Japan\'s iconic volcano from Tokyo by bullet train.' },
  ],
  bali: [
    { name:'Tanah Lot Temple', category:'sightseeing', avgCost:5, duration:120, emoji:'🌊', description:'Dramatic sea temple perched on a rocky outcrop.' },
    { name:'Ubud Rice Terraces', category:'nature', avgCost:5, duration:180, emoji:'🌾', description:'UNESCO-listed Tegallalang rice terraces — stunning green tiers.' },
    { name:'Monkey Forest Sanctuary', category:'nature', avgCost:4, duration:90, emoji:'🐒', description:'Sacred forest with over 700 Balinese long-tailed macaques.' },
    { name:'Kuta Beach Surf Lesson', category:'adventure', avgCost:30, duration:120, emoji:'🏄', description:'Learn to surf on Bali\'s famous waves.' },
    { name:'Balinese Cooking Class', category:'food', avgCost:35, duration:240, emoji:'🥥', description:'Make satay, rendang, and gado gado from scratch.' },
    { name:'Traditional Balinese Massage', category:'wellness', avgCost:15, duration:90, emoji:'🧘', description:'Full-body massage at a traditional spa.' },
  ],
  new_york: [
    { name:'Central Park Walk', category:'nature', avgCost:0, duration:180, emoji:'🌳', description:'843 acres of green escape in the heart of Manhattan.' },
    { name:'Metropolitan Museum of Art', category:'culture', avgCost:25, duration:240, emoji:'🏛️', description:'World-class collection of 5,000 years of art.' },
    { name:'Empire State Building', category:'sightseeing', avgCost:44, duration:120, emoji:'🏙️', description:'Iconic 102-floor Art Deco skyscraper with NYC panoramas.' },
    { name:'Broadway Show', category:'culture', avgCost:120, duration:180, emoji:'🎭', description:'See a legendary musical on the Great White Way.' },
    { name:'Brooklyn Bridge Walk', category:'adventure', avgCost:0, duration:90, emoji:'🌉', description:'Pedestrian walkway with stunning Manhattan skyline views.' },
    { name:'Street Food at Smorgasburg', category:'food', avgCost:30, duration:120, emoji:'🥪', description:'Famous open-air food market in Brooklyn.' },
    { name:'Times Square at Night', category:'sightseeing', avgCost:0, duration:60, emoji:'✨', description:'The dazzling neon crossroads of the world.' },
  ],
  dubai: [
    { name:'Burj Khalifa Sky', category:'sightseeing', avgCost:40, duration:120, emoji:'🏗️', description:'148th floor observation deck — tallest building on earth.' },
    { name:'Dubai Museum of the Future', category:'culture', avgCost:35, duration:150, emoji:'🔮', description:'Futuristic ring-shaped building showcasing tomorrow\'s world.' },
    { name:'Desert Safari', category:'adventure', avgCost:75, duration:360, emoji:'🐫', description:'Dune bashing, camel riding, and Bedouin dinner under the stars.' },
    { name:'Dubai Food Tour', category:'food', avgCost:60, duration:180, emoji:'🫕', description:'Sample Emirati cuisine and global flavours in the souks.' },
    { name:'Dubai Mall & Fountain Show', category:'sightseeing', avgCost:0, duration:120, emoji:'⛲', description:'World\'s largest mall with spectacular water fountain display.' },
  ],
  london: [
    { name:'British Museum', category:'culture', avgCost:0, duration:240, emoji:'🏛️', description:'8 million objects spanning 2 million years of human history.' },
    { name:'Tower of London', category:'sightseeing', avgCost:30, duration:150, emoji:'🗝️', description:'Historic fortress, Crown Jewels, and Beefeater tour.' },
    { name:'Borough Market', category:'food', avgCost:25, duration:90, emoji:'🧀', description:'London\'s oldest and finest food market under the railway.' },
    { name:'West End Musical', category:'culture', avgCost:85, duration:180, emoji:'🎵', description:'World-class theatre in the heart of London\'s theatre district.' },
    { name:'Thames River Cruise', category:'adventure', avgCost:20, duration:75, emoji:'🚢', description:'See London\'s skyline from the River Thames.' },
    { name:'Kew Gardens', category:'nature', avgCost:22, duration:240, emoji:'🌸', description:'UNESCO-listed royal botanical gardens with giant glasshouses.' },
  ],
};

// Generic activities for cities without specific data
const GENERIC_ACTIVITIES = [
  { name:'City Walking Tour', category:'sightseeing', avgCost:15, duration:180, emoji:'🚶', description:'Explore the city\'s main sights with a knowledgeable guide.' },
  { name:'Local Food Market', category:'food', avgCost:20, duration:120, emoji:'🥘', description:'Browse and taste local street food and fresh produce.' },
  { name:'Museum Visit', category:'culture', avgCost:15, duration:150, emoji:'🏛️', description:'Discover the history and culture of this fascinating city.' },
  { name:'Sunset Viewpoint', category:'sightseeing', avgCost:0, duration:60, emoji:'🌅', description:'Watch the sun set over the city from a stunning vantage point.' },
  { name:'Local Restaurant Dinner', category:'food', avgCost:35, duration:90, emoji:'🍷', description:'Experience authentic local cuisine at a highly-rated restaurant.' },
  { name:'Day Hike', category:'adventure', avgCost:10, duration:300, emoji:'🥾', description:'Explore stunning natural landscapes around the city.' },
  { name:'Bike Tour', category:'adventure', avgCost:25, duration:180, emoji:'🚴', description:'Cycle through the city\'s most scenic neighbourhoods.' },
  { name:'Cooking Class', category:'food', avgCost:60, duration:210, emoji:'👨‍🍳', description:'Learn to cook authentic local dishes from scratch.' },
  { name:'Spa & Wellness', category:'wellness', avgCost:80, duration:120, emoji:'🧖', description:'Relax and rejuvenate at a top-rated local spa.' },
  { name:'Shopping District', category:'shopping', avgCost:100, duration:180, emoji:'🛍️', description:'Explore local markets and designer boutiques.' },
];

async function getActivitiesForCity(cityId) {
  if (window.SygicAPI && window.SYGIC_API_KEY !== 'YOUR_SYGIC_API_KEY_HERE') {
      const results = await window.SygicAPI.getSygicActivities(cityId);
      if (results && results.length > 0) return results;
  }
  return CITY_ACTIVITIES[cityId] || GENERIC_ACTIVITIES;
}

async function filterActivities(cityId, { category = 'all', maxCost = Infinity } = {}) {
  let acts = await getActivitiesForCity(cityId);
  if (category !== 'all') acts = acts.filter(a => a.category === category);
  if (maxCost < Infinity) acts = acts.filter(a => a.avgCost <= maxCost);
  return acts;
}

function getCategoryInfo(id) {
  return ACTIVITY_CATEGORIES.find(c => c.id === id) || { id, label: id, emoji: '⭐', color: '#94A3B8' };
}
