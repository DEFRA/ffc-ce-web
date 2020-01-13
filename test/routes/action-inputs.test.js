describe('Parcels route test', () => {
  let createServer
  let server

  beforeAll(() => {
    createServer = require('../../server/createServer')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET /action-inputs route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/action-inputs'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('POST /action-inputs route redirects to GET /calculation-result if calculation requested', async () => {
    const calculationRequest = {
      parcelRef: 'SD75492628',
      action: {
        ref: 'FG1',
        amount: '54.5'
      }
    }

    const postOptions = {
      method: 'POST',
      url: '/action-inputs',
      payload: calculationRequest
    }

    const postResponse = await server.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('/calculation-result')
  })
})
