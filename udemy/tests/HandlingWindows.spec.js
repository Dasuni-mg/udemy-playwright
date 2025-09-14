const { test, expect, chromium } = require('@playwright/test');

//
// 🔹 Example 1: Handling multiple pages opened manually
//
test('Handle Pages/Windows', async () => {
    // 1. Launch a new browser instance
    const browser = await chromium.launch();

    // 2. Create a new browser context (like a fresh user profile/session)
    const context = await browser.newContext();

    // 3. Create two separate pages (tabs) inside the same context
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    // 4. List all pages in the context
    const allPages = context.pages();
    console.log("No. of pages created:", allPages.length);  // Should print 2

    // 5. Navigate Page 1 → OrangeHRM login page
    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page1).toHaveTitle('OrangeHRM');

    // 6. Navigate Page 2 → OrangeHRM official site
    await page2.goto("https://www.orangehrm.com/");
    await expect(page2).toHaveTitle(
        'OrangeHRM HR Software | Free & Open Source HR Software | HRMS | HRIS | OrangeHRM'
    );

    // 7. Pause briefly (for demo purposes)
    await page1.waitForTimeout(3000);
    await page2.waitForTimeout(3000);

    // 8. Close the browser
    await browser.close();
});

/////////////////////////////////////////////////////////////

//
// 🔹 Example 2: Handling a new page automatically opened by clicking a link
//
test.only('Handle multiple Pages/Windows', async () => {
    // 1. Launch a new browser instance
    const browser = await chromium.launch();

    // 2. Create a new context (like a new session/profile)
    const context = await browser.newContext();

    // 3. Create first page (main tab)
    const page1 = await context.newPage();
    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // Print the title of the first page
    console.log(await page1.title());
    await expect(page1).toHaveTitle('OrangeHRM');

    // 4. Prepare to capture a new page (before clicking the link)
    const pagePromise = context.waitForEvent('page');

    // 5. Click the "OrangeHRM, Inc" link → This opens a new tab/window
    await page1.locator('//a[normalize-space()="OrangeHRM, Inc"]').click();

    // 6. Wait for the new page to be created and get a handle to it
    const newPage = await pagePromise;

    // Print the title of the new page
    console.log(await newPage.title());
    await expect(newPage).toHaveTitle(
        'OrangeHRM HR Software | Free & Open Source HR Software | HRMS | HRIS | OrangeHRM'
    );

    // 7. Pause briefly (for demo purposes)
    await page1.waitForTimeout(3000);
    await newPage.waitForTimeout(3000);

    // 8. Close the browser
    await browser.close();
});
