/*By default, failed assertion will terminate test execution. 
Playwright also supports soft assertions 
failed soft assertions do not terminate test execution, but mark the test as failed. */


const { test, expect } = require('@playwright/test');

test('SoftAssertions demo',async ({page})=>{

   await page.goto('https://www.demoblaze.com/index.html');

   //Hard assertions
   /*await expect(page).toHaveTitle('STORE');
   await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
   await expect(page.locator('.navbar-brand')).toBeVisible(); 
  */
   //Soft assertions
   await expect.soft(page).toHaveTitle('STORE123');
   await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
   await expect.soft(page.locator('.navbar-brand')).toBeVisible(); 

} )
