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

  afterEach(async () => {
    jest.unmock('@hapi/wreck')
  })
})
