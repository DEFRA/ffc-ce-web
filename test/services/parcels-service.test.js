let parcelsService
jest.mock('@hapi/wreck')

let payload

function stubWreckCall () {
  const wreck = require('@hapi/wreck')
  wreck.defaults = () => {
    return {
      get: () => {
        return Promise.resolve({ payload })
      }
    }
  }
}

describe('parcelService', () => {
  beforeAll(async () => {
    // I tried to stub the call before each, but only the return setup in the first test
    // was returned, despite trying a combination of clear/reset mocks so I resorted to
    // setting the payload to a local variable that can be changed before each test
    // https://github.com/facebook/jest/issues/7136
    // issue was fixed in November. but not perhaps not made it into the lastest version,
    // though there are still requests on the issue above to reopen the bug
    stubWreckCall()
    parcelsService = require('../../server/services/parcels-service')
  })

  test('get parcels return JSON', async () => {
    const mockParcels = [{ ref: '1234' }]
    payload = { toString: () => JSON.stringify(mockParcels) }
    const result = await parcelsService.getParcels()
    expect(result).toBeDefined()
    expect(result.length).toEqual(1)
    expect(result[0]).toEqual(mockParcels[0])
  })

  test('get parcels returns undefined for empty payload', async () => {
    payload = undefined
    const result = await parcelsService.getParcels()
    expect(result).toBeUndefined()
  })

  afterAll(async () => {
    jest.unmock('@hapi/wreck')
  })
})
