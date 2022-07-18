const {test, expect} = require('@playwright/test')
const data = require('../../../data/api/test-data.json')

test.describe('Get OAuth Token Api tests', () => {
   
    test('Get Staff OAuth Token @smoke', async({request}) => {
        const response = await request.post('/v1/staff/token?api_key='+data.api_key, {data: data.request.body.authorization})
        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text())
        expect(body.access_token).not.toBeNull()
        
    })

    test('Get Staff OAuth Token without api_key @smoke', async({request}) => {
        const response = await request.post('/v1/staff/token', {data: data.request.body.authorization})
        expect(response.ok()).not.toBeTruthy();
        expect(response.status()).toEqual(401);        
    })

    test('Get Staff OAuth Token without request body @smoke', async({request}) => {
        const response = await request.post('/v1/staff/token', {data: {}})
        expect(response.ok()).not.toBeTruthy();
        expect(response.status()).toEqual(401);        
    })

})