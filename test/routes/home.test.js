describe('Home route test', () => {
  let createServer
  let server

  beforeAll(() => {
    createServer = require('../../server/createServer')
  })

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  test('GET / route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('GET / unknown route returns 404', async () => {
    const options = {
      method: 'GET',
      url: '/noSuchPage'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(404)
  })

  afterEach(async () => {
    await server.stop()
  })
})
