const {test, expect} = require('@playwright/test')
const randomstring = require("randomstring");
const data = require('../../../data/ui/test-data.json')

test.describe('Registration Tests', () => {

    test('register a new user @regression', async({page}) => {
        await page.goto('/');
        await expect(page).toHaveTitle(data.title.landing_page);
        await page.click('text=Accept everything');
        await page.click('text=Century City');
        await page.waitForLoadState();
        await page.click('#user-menu-toggler');
        await page.waitForLoadState();
        await page.locator('a.text-white.dropdown-toggle', {clickCount:2}).click();
        await page.click('text=Register now');

        await expect(page).toHaveTitle(data.title.register_page);
        
        await page.click('#idmr');
        await page.fill('#firstnameReg', data.firstName)
        await page.fill('#lastnameReg', data.lastName)
        await page.fill('#emailReg', randomstring.generate(7)+'@westfield.com')
        await page.fill('#firstpassword', data.password)
        await page.$eval("#loyaltyOptincheck", (element) => element.scrollIntoView());
       
        expect(await page.isChecked('#offersEmail')).toBeTruthy()
        expect(await page.isChecked('#loyaltyOptincheck')).not.toBeTruthy()
    
        await page.click('div.input-checkbox label#lblloyaloptin span');
        await page.click('#regSubmit');
        await page.waitForLoadState();
        const orderSent = page.locator('.on-myrewards h1.page-title');
        await orderSent.waitFor({state:'visible',timeout:30000});
        await expect(page).toHaveTitle(data.title.home_page);
       
    })
})

