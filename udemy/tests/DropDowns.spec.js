const { test, expect } = require('@playwright/test');

test("Handle dropdowns", async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  // --- Multiple ways to select option from the dropdown ---
  await page.locator("#country").selectOption({ label: 'India' });   // label / visible text
  await page.locator("#country").selectOption('India');             // visible text
  await page.locator("#country").selectOption({ value: 'uk' });     // by value
  await page.locator("#country").selectOption({ index: 1 });        // by index
  await page.selectOption("#country", 'India');                     // by text

  // --- Assertions ---

  // 1) Check number of options in dropdown - Approach 1
  const allOptionsLocator = page.locator('#country option');
  await expect(allOptionsLocator).toHaveCount(10);

  // 2) Check number of options in dropdown - Approach 2
  const allOptionsElements = await page.$$('#country option');
  console.log("Number of options:", allOptionsElements.length);
  expect(allOptionsElements.length).toBe(10);

  // 3) Check presence of a value in the dropdown - Approach 1
  const dropdownText = await page.locator('#country').textContent();
  expect(dropdownText.includes('India')).toBeTruthy();

  // 4) Check presence of a value in the dropdown - Approach 2 (looping)
  let status = false;
  for (const option of allOptionsElements) {
    let value = await option.textContent();
    if (value.includes('France')) {
      status = true;
      break;
    }
  }
  expect(status).toBeTruthy();

  // 5) Select option from dropdown using loop
  for (const option of allOptionsElements) {
    let value = await option.textContent();
    if (value.includes('France')) {
      await page.selectOption("#country", value.trim());
      break;
    }
  }

  await page.waitForTimeout(5000);
});
