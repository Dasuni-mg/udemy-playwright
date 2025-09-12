const { test, expect } = require("@playwright/test");

test("handle inputbox", async ({ page }) => {
  await page.goto("https://itera-qa.azurewebsites.net/home/automation");

  //Inputbox - firstname

  //Check weather the inputbox is visible
  await expect(await page.locator("//input[@id='name']")).toBeVisible();
  // Check weather the inputbox is empty or not
  await expect(await page.locator("//input[@id='name']")).toBeEmpty();
  //Check weather the inputbox is editable
  await expect(await page.locator("//input[@id='name']")).toBeEditable();
  //Check weather the inputbox is enabled
  await expect(await page.locator("//input[@id='name']")).toBeEnabled();

  await page.locator("//input[@id='name']").fill("John");
  await page.fill("//input[@id='name']", "John");

  await page.waitForTimeout(5000); //pausing code
});
