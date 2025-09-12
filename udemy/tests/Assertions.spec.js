const { test, expect } = require('@playwright/test');

test('Home Page',async ({page})=>{

  // Open the URL
  await page.goto('https://demo.nopcommerce.com/register');

  // 1) Page has URL
  await expect(page).toHaveURL('https://demo.nopcommerce.com/register');

  // 2) Page has title
  await expect(page).toHaveTitle('nopCommerce demo store. Register');
  
  // 3) Element is visible : Check logo visibility on page
  const logoElement = await page.locator('.header-logo img');
  await expect(logoElement).toBeVisible(); 

  // 4) Element is enabled : Check search store box enabled
  const searchStoreInput = await page.locator('#small-searchterms');
  await expect(searchStoreInput).toBeEnabled(); 
    //await expect(searchStoreInput).toBeDisabled(); 

  // 5) Radio/checkbox is checked: 
  
  //radio button -male radio button
  const maleRadioButton=await page.locator('#gender-male')
  await maleRadioButton.click(); // select male radio button
  await expect(maleRadioButton).toBeChecked()

  //Check box  - News letter checkbox
  const newsletterCheckbox = await page.locator('#Newsletter');
  await expect(newsletterCheckbox).toBeChecked()
  

  //6) Element has attribute
  const regButton=await page.locator('#register-button');
  await expect(regButton).toHaveAttribute('type', 'submit');

//7 Element matches text
 await expect(await page.locator('.page-title h1')).toHaveText('Register');

  //8 Element contains text
 await expect(await page.locator('.page-title h1')).toContainText('Regi');

//9 Input element has value
const emailInput = await page.locator('#Email');
  await emailInput.fill('test@example.com');
  await expect(emailInput).toHaveValue('test@example.com');

//10) List of elements has given length
const options = await page.locator('select[name="DateOfBirthMonth"] option');
await expect(options).toHaveCount(13);

  await page.close();

} )
