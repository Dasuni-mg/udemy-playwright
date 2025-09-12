// beforeAll: Runs once before all tests → logs in once.
// afterAll: Runs once after all tests → logs out once.
// Home Page Test: Validates number of products displayed.
// Add Product to cart Test: Adds an item to cart & validates the success alert.

import { test, expect } from '@playwright/test';

let page; // declare a variable to hold the browser page instance

// Runs ONCE before all tests in this file
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage(); // open a new browser tab/page
  await page.goto('https://www.demoblaze.com/index.html'); // navigate to demo website homepage

  // Click the login button in the header to open login modal
  await page.locator('#login2').click();

  // Fill username into login modal input
  await page.locator('#loginusername').fill('pavanol');

  // Fill password into login modal input
  await page.locator('#loginpassword').fill('test@123');

  // Click the "Log in" button inside the modal
  await page.locator('//button[normalize-space()="Log in"]').click();
});

// Runs ONCE after all tests in this file
test.afterAll(async () => {
  // Click logout button to end the session
  await page.locator('#logout2').click();
});

// ---------------- TEST CASE 1 ----------------
test('Home Page Test NoOf products', async () => {
  // Get all product elements from homepage
  const products = await page.$$('#tbodyid .hrefch');

  // Print number of products in console
  console.log('Number of products:', products.length);

  // Assert that there are exactly 9 products
  expect(products).toHaveLength(9);
});

// ---------------- TEST CASE 2 ----------------
test('Add Product to cart Test', async () => {
  // Click on the product "Samsung galaxy s6" link
  await page.locator('//a[normalize-space()="Samsung galaxy s6"]').click();

  // Click "Add to cart" button on product page
  await page.locator('.btn.btn-success.btn-lg').click();

  // Handle the alert popup (dialog) that appears after adding to cart
  page.on('dialog', async dialog => {
    // Verify that alert message contains expected text
    expect(dialog.message()).toContain('Product added. ');
    // Accept/close the alert
    await dialog.accept();
  });
});
