let actionsService
jest.mock('@hapi/wreck')

let payload
const parcelRef = 'AB12345678'

function stubWreckCall () {
  const wreck = require('@hapi/wreck')
  wreck.defaults = () => {
    return {
      get: (ref) => {
        return Promise.resolve({ payload })
      }
    }
  }
}

describe('actionService', () => {
  beforeAll(() => {
    // Test follows the structure of parcels-service.test.js, which says:
    // "I tried to stub the call before each, but only the return setup in the first test
    // was returned, despite trying a combination of clear/reset mocks so I resorted to
    // setting the payload to a local variable that can be changed before each test
    // https://github.com/facebook/jest/issues/7136
    // issue was fixed in November. but not perhaps not made it into the lastest version,
    // though there are still requests on the issue above to reopen the bug"
    stubWreckCall()
    actionsService = require('../../server/services/actions-service')
  })

  test('get actions return JSON', async () => {
    const mockActions = { actions: [{ id: '1', description: 'an action' }] }
    payload = mockActions
    const result = await actionsService.getActions(parcelRef)
    expect(result).toBeDefined()
    expect(result.length).toEqual(1)
    expect(result[0]).toEqual(mockActions.actions[0])
  })

  test('get actions returns empty array for empty payload', async () => {
    payload = undefined
    const result = await actionsService.getActions(parcelRef)
    expect(result).toBeDefined()
    expect(result.length).toEqual(0)
  })

  afterAll(() => {
    jest.unmock('@hapi/wreck')
  })
})
