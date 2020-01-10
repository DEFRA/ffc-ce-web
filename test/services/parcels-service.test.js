let parcelsSevice
jest.mock('@hapi/wreck')

const mockParcels = [{ ref: '1234' }]

function stubWreckCall () {
  const wreck = require('@hapi/wreck')
  wreck.defaults = () => {
    return {
      get: () => {
        return Promise.resolve({ payload: { toString: () => JSON.stringify(mockParcels) } })
      }
    }
  }
}

describe('parcelService', () => {
  beforeAll(() => {
    stubWreckCall()
    parcelsSevice = require('../../server/services/parcels-service')
  })

  test('get parcels', async () => {
    const result = await parcelsSevice.getParcels()
    expect(result).toBeDefined()
    expect(result.length).toEqual(1)
    expect(result[0]).toEqual(mockParcels[0])
  })

  afterAll(async () => {
    jest.unmock('@hapi/wreck')
  })
})
