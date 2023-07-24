import { registerNewUser } from '../../services/register/index.js'

describe('POST the test data to the MOCK DB', async() => {
    const testData = {
        name: 'Test2',
        email: 'test2@test.com',
        password: 'test456',
        role: 'customer'
    }
    test(`It should return ${testData}`, async () => {
        expect(await registerNewUser(testData).toBe({
            success: true,
            message: 'Account Created'
        }))
    })
})