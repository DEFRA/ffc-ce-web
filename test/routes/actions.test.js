let actionsService
const action = { id: 'FG1', description: 'Fencing' }

function createMocks () {
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

describe('Actions route test', () => {
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
  test('GET /actions route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/actions'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain(action.id)
  })

  test('POST /actions route redirects to GET /action-inputs if action chosen', async () => {
    const postOptions = {
      method: 'POST',
      url: '/actions',
      payload: {
        actionId: action.id
      }
    }

    const postResponse = await server.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('/action-inputs')

    const getResponse = await server.inject(getRedirectOptions(postResponse))
    expect(getResponse.statusCode).toBe(200)
    // verify service response is rendered on the page
    expect(getResponse.payload).toContain(action.id)
  })

  test('POST /actions route returns error message in body if no action chosen', async () => {
    const postOptions = {
      method: 'POST',
      url: '/actions',
      payload: {
        actionId: undefined
      }
    }

    const postResponse = await server.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('You must choose an action')
  })

  afterEach(async () => {
    await server.stop()
  })

  afterAll(() => {
    jest.unmock('../../server/services/actions-service')
  })
})
