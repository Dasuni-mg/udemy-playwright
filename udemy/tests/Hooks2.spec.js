// test.beforeEach
// This is a hook that runs before every single test inside your test file.
// It’s used to set up preconditions (like opening a page, logging in, seeding data).

// test.afterEach
// This hook runs after every single test inside your test file.
// It’s used for cleanup (like logging out, clearing cookies, closing DB connections).


// Suppose you run 2 tests (Home Page Test and Add Product to cart Test):

// 🔄 beforeEach → Opens browser + logs in

// ▶️ Test 1 runs (Home Page Test)

// 🔄 afterEach → Logs out

// 🔄 beforeEach → Opens browser + logs in again

// ▶️ Test 2 runs (Add Product to cart Test)

// 🔄 afterEach → Logs out


import { test, expect } from "@playwright/test";

let page;

// Runs before each test case
test.beforeEach(async ({ browser }) => {
  // Open a new browser page
  page = await browser.newPage();

  // Navigate to the Demoblaze homepage
  await page.goto("https://www.demoblaze.com/index.html");

  // Click on the "Log in" button to open the login modal
  await page.locator("#login2").click();

  // Enter username in the login input field
  await page.locator("#loginusername").fill("pavanol");

  // Enter password in the login input field
  await page.locator("#loginpassword").fill("test@123");

  // Click on the "Log in" button inside the login modal
  await page.locator('//button[normalize-space()="Log in"]').click();
});


// Runs after each test case
test.afterEach(async () => {
  // Log out after each test to reset session
  await page.locator("#logout2").click();
});


// Test Case 1: Validate number of products on the home page
test("Home Page Test No Of products", async () => {
  // Find all product elements on the homepage
  const products = await page.$$("#tbodyid .hrefch");

  // Print number of products in the console
  console.log("Number of products:", products.length);

  // Verify that exactly 9 products are displayed
  expect(products).toHaveLength(9);
});


// Test Case 2: Add a product to the cart
test("Add Product to cart Test", async () => {
  // Click on the "Samsung galaxy s6" product link
  await page.locator('//a[normalize-space()="Samsung galaxy s6"]').click();

  // Click on the "Add to cart" button
  await page.locator(".btn.btn-success.btn-lg").click();

  // Handle the popup alert after adding product
  page.on("dialog", async (dialog) => {
    // Verify the alert message contains "Product added"
    expect(dialog.message()).toContain("Product added. ");

    // Accept (close) the alert
    await dialog.accept();
  });
});
