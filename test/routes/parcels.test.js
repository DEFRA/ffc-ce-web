let parcelsService
const parcel = { ref: 'SD75492628' }

let session

function createMocks () {
  jest.mock('../../server/services/parcels-service')
  parcelsService = require('../../server/services/parcels-service')
  parcelsService.getParcels = () => { return Promise.resolve([parcel]) }

  jest.mock('../../server/session')
  session = require('../../server/session')
  session.setParcelRef = jest.fn((request, parcelRef) => parcelRef)
}

describe('Parcels route test', () => {
  let createServer
  let server

  beforeAll(() => {
    createMocks()
    createServer = require('../../server/createServer')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /parcels route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/parcels'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain(parcel.ref)
  })

  test('POST /parcels route redirects to GET /actions if parcel chosen', async () => {
    const postOptions = {
      method: 'POST',
      url: '/parcels',
      payload: {
        parcelRef: parcel.ref
      }
    }

    const postResponse = await server.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('/actions')

    expect(session.setParcelRef.mock.calls.length).toBe(1)
    expect(session.setParcelRef.mock.calls[0][1]).toBe(parcel.ref)
  })

  test('POST /parcels route returns error message in body if no parcel chosen', async () => {
    const postOptions = {
      method: 'POST',
      url: '/parcels',
      payload: {
        parcelRef: undefined
      }
    }

    const postResponse = await server.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('You must choose a parcel')
  })

  afterEach(async () => {
    await server.stop()
  })

  afterAll(() => {
    jest.unmock('../../server/services/parcels-service')
    jest.unmock('../../server/session')
  })
})
