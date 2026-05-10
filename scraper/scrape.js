const { chromium } = require('playwright');
const fs = require('fs');

async function scrapeApp() {
  console.log('🚀 Launching Playwright...');
  // Ensure the browser is installed
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const data = {
    dashboard: {},
    discovery: {}
  };

  try {
    console.log('🌐 Navigating to Dashboard (http://localhost:5173)...');
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for animations

    console.log('📸 Scraping Dashboard...');
    // Scrape Upcoming Trips
    const upcomingTrips = await page.$$eval('a[href^="/trips/"]', elements => {
      return elements.map(el => {
        const title = el.querySelector('h4')?.textContent;
        const dates = el.querySelector('p')?.textContent;
        return { title, dates };
      }).filter(t => t.title);
    });
    data.dashboard.upcomingTrips = upcomingTrips;

    // Scrape Recommended Destinations
    const recommended = await page.$$eval('h4', elements => {
      return elements.map(el => el.textContent).filter(text => text !== 'Upcoming Trips' && text !== 'Traveloop');
    });
    data.dashboard.destinations = recommended;

    console.log('✅ Dashboard Data:', JSON.stringify(data.dashboard, null, 2));

    console.log('\n🌐 Navigating to Discovery...');
    // Click on Discovery in Top Nav
    await page.click('text="Discovery"');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('📸 Scraping Discovery...');
    // Scrape Trending Cities
    const trendingCities = await page.$$eval('h4', elements => {
      return elements.map(el => el.textContent);
    });
    data.discovery.trendingCities = trendingCities;

    console.log('✅ Discovery Data:', JSON.stringify(data.discovery, null, 2));

    // Save to file
    fs.writeFileSync('scraped_data.json', JSON.stringify(data, null, 2));
    console.log('\n💾 Successfully saved scraped data to scraped_data.json');

  } catch (error) {
    console.error('❌ Error during scraping:', error);
  } finally {
    console.log('Closing browser...');
    await browser.close();
  }
}

scrapeApp();
