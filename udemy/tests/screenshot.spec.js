import { test, expect } from '@playwright/test';  
// Import Playwright’s test runner and expect assertion library

// --------------------- PAGE SCREENSHOT ---------------------
test('page screenshot', async ({ page }) => {
 
   // Open the OpenCart demo site
  await page.goto('https://demo.opencart.com/');  


  // Take a screenshot of the **current viewport only**
  // File is saved inside `tests/screenshots/` with a unique timestamp
  await page.screenshot({ 
    path: 'tests/screenshots/' + Date.now() + 'HomePage.png' 
  });
  
});

// --------------------- FULL PAGE SCREENSHOT ---------------------
test('Full page screenshot', async ({ page }) => {
 
   // Open the site again
  await page.goto('https://demo.opencart.com/');  

    // Capture a **full-page screenshot** (scrolls and stitches the entire page)
  await page.screenshot({ 
    path: 'tests/screenshots/' + Date.now() + 'FullHomePage.png',
    fullPage: true 
  });
});

// --------------------- ELEMENT SCREENSHOT ---------------------
test('Element screenshot', async ({ page }) => {
 
 // Open the site again
  await page.goto('https://demo.opencart.com/');  
  
  // Capture screenshot of a **specific element** (Featured products section)
  await page.locator('//*[@id="content"]/div[2]').screenshot({ 
    path: 'tests/screenshots/' + Date.now() + 'FeaturedProducts.png' 
  });
});
