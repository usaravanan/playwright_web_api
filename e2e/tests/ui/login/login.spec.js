const { test, expect, chromium } = require('@playwright/test')
const data = require('../../../data/ui/test-data.json')

test.describe('Login Tests', () => {
    
    test.beforeEach(async ({page}) => {
        await page.goto('/');
        await expect(page).toHaveTitle(data.title.landing_page);
        await page.click('text=Accept everything');
        await page.click('text=Century City');
        await page.waitForLoadState();
        await page.click('#user-menu-toggler');
        await page.waitForLoadState();
        await page.locator('a.text-white.dropdown-toggle', { clickCount: 2 }).click();
        await expect(page).toHaveTitle(data.title.login_page);
    })

    test('login with valid user @smoke', async ({ page }) => {
        if (process.env.BROWSERSTACK == 'true')
            page = bsPage
        await page.fill('#email', data.email)
        await page.fill('#password', data.password)
        await page.click('#loginsubmit');
        await page.waitForLoadState();
        const orderSent = page.locator('.on-myrewards h1.page-title');
        await orderSent.waitFor({ state: 'visible', timeout: 30000 });
        await expect(page).toHaveTitle(data.title.home_page);
    })

    test('login with invalid user @smoke1', async ({page}) => {
        if (process.env.BROWSERSTACK == 'true')
            page = bsPage
        await page.fill('#email', 'dummy@outlook.com')
        await page.fill('#password', data.password)
        await page.click('#loginsubmit');
        await page.waitForLoadState();
        const passwordError = page.locator('#password-error');
        await passwordError.waitFor({ state: 'visible', timeout: 30000 });
        await expect(passwordError.innerText()).not.toBeNull()
        await expect(page).toHaveTitle(data.title.login_page);
    })

})

