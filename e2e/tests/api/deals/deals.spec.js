const {test, expect} = require('@playwright/test')
const data = require('../../../data/api/test-data.json')

test.describe('Deals api tests', () => {
    let token;
    test.beforeAll(async({request}) => {
        const response = await request.post('/v1/staff/token?api_key='+data.api_key, {data: data.request.body.authorization})
        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text())
        token = body.access_token
        expect(token).not.toBeNull()
        
    })

    test('Get Deal @smoke', async({request}) => {
       const response = await request.get('/v1/deals/'+data.deal_id+'?api_key='+data.api_key, {headers:{Authorization: 'Bearer '+token}})
        expect(response.ok()).toBeTruthy();
        const body = JSON.parse(await response.text())

        expect(body.data.deal_id).not.toBeNull()
        expect(body.data.deal_id).toEqual(data.deal_id)
    })

    test('Create Deal @regression', async({request}) => {
        const response = await request.post('/v1/deals?api_key='+data.api_key, {headers:{Authorization: 'Bearer '+token}, data : data.request.body.create_deal})
         expect(response.ok()).toBeTruthy();
         const body = JSON.parse(await response.text())
 
         expect(body.data.deal_id).not.toBeNull()
         expect(body.data.description).toEqual(data.request.body.create_deal.description)
     })

})