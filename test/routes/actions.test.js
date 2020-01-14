let actionsService
const action = { id: 'FG1', description: 'Fencing' }
const parcelRef = 'PR12345'

let session

function createMocks () {
  jest.mock('../../server/services/actions-service')
  actionsService = require('../../server/services/actions-service')
  actionsService.getActions = () => { return Promise.resolve([action]) }

  jest.mock('../../server/session')
  session = require('../../server/session')
  session.getParcelRef = (request) => parcelRef
  session.setActionId = jest.fn((request, actionId) => actionId)
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
    expect(response.payload).toContain(parcelRef)
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

    expect(session.setActionId.mock.calls.length).toBe(1)
    expect(session.setActionId.mock.calls[0][0]).toBe(action.id)
  })

  test('POST /actions route returns error message in body if no action chosen', async () => {
    const postOptions = {
      method: 'POST',
      url: '/actions',
      payload: {}
    }

    const postResponse = await server.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('You must choose an action')
    // I would expect setActionId to not be called but based on tracing the POST handler
    // runs before the options.validate.failAction.
    // In the end it doesn't matter for the code here but it's not intuitive and warrants
    // further investigation
    expect(session.setActionId.mock.calls.length).toBe(1)
  })

  afterEach(async () => {
    await server.stop()
  })

  afterAll(() => {
    jest.unmock('../../server/services/actions-service')
    jest.unmock('../../server/session')
  })
})
