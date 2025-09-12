const {test, expect}=require('@playwright/test')

test('handle radio button',async ({page})=>{

    await page.goto('https://itera-qa.azurewebsites.net/home/automation');

    //Radio button
    await page.locator("//input[@value='option2']").check(); //male
    //await page.check("//input[@value='option2']");

    // check weather the radio button is checked or not
    await expect(await page.locator("//input[@value='option2']")).toBeChecked();
    // check returns true if the radio button is checked 
    await expect(await page.locator("//input[@value='option2']").isChecked()).toBeTruthy();//male
    //check returns false if the radio button is not checked 
    await expect(await page.locator("//input[@value='option1']").isChecked()).toBeFalsy(); //female


    await page.waitForTimeout(5000); //pausing code

})