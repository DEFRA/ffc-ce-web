let parcelsService
const parcel = { ref: 'SD75492628' }

let actionsService
const action = { id: 'FG1', description: 'Fencing' }

function createMocks () {
  jest.mock('../../server/services/parcels-service')
  parcelsService = require('../../server/services/parcels-service')
  parcelsService.getParcels = () => { return Promise.resolve([parcel]) }

  jest.mock('../../server/services/actions-service')
  actionsService = require('../../server/services/actions-service')
  actionsService.getActions = () => { return Promise.resolve([action]) }
}

function extractSessionCookie (response) {
  const setCookie = response.headers['set-cookie']
  return (setCookie && setCookie[0]) ? setCookie[0].split(';')[0] : ''
}

function getRedirectOptions (response) {
  const cookie = extractSessionCookie(response)
  return {
    method: 'GET',
    headers: { cookie },
    url: response.headers.location
  }
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

    const getResponse = await server.inject(getRedirectOptions(postResponse))
    expect(getResponse.statusCode).toBe(200)
    // verify service response is rendered on the page
    expect(getResponse.payload).toContain(parcel.ref)
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
  })
})
