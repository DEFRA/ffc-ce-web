const action = { id: 'FG1', description: 'Fencing' }
const parcelRef = 'PR12345'

let session

function createMocks () {
  jest.mock('../../server/session')
  session = require('../../server/session')
  session.getParcelRef = (request) => parcelRef
  session.getActionId = (request) => action.id
  session.setActionInput = jest.fn((request, actionInput) => actionInput)
}

describe('Action Inputs route test', () => {
  const expectedErrorMessage = 'You must enter a number greater than zero with, at most, 2 decimal places'
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

  test('GET /action-inputs route returns 200', async () => {
    const options = {
      method: 'GET',
      url: '/action-inputs'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain(parcelRef)
    expect(response.payload).toContain(action.id)
  })

  test('POST /action-inputs route redirects to GET /calculation-result if calculation requested', async () => {
    const actionInput = 54.5
    const postOptions = {
      method: 'POST',
      url: '/action-inputs',
      payload: {
        actionInput
      }
    }

    const postResponse = await server.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('/calculation-result')
    expect(session.setActionInput.mock.calls.length).toBe(1)
    expect(session.setActionInput.mock.calls[0][1]).toBe(actionInput.toString())
  })

  test('POST /action-inputs route returns error message in body if no input entered', async () => {
    const postOptions = {
      method: 'POST',
      url: '/action-inputs',
      payload: {}
    }

    const postResponse = await server.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain(expectedErrorMessage)
    // I would expect setActionInput to not be called but based on tracing the POST handler
    // runs before the options.validate.failAction.
    // In the end it doesn't matter for the code here but it's not intuitive and warrants
    // further investigation
    expect(session.setActionInput.mock.calls.length).toBe(1)
  })

  test('POST /action-inputs route returns error message in body if not a number entered', async () => {
    const actionInput = 'not a number'
    const postOptions = {
      method: 'POST',
      url: '/action-inputs',
      payload: {
        actionInput
      }
    }

    const postResponse = await server.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain(expectedErrorMessage)
    // I would expect setActionInput to not be called but based on tracing the POST handler
    // runs before the options.validate.failAction.
    // In the end it doesn't matter for the code here but it's not intuitive and warrants
    // further investigation
    expect(session.setActionInput.mock.calls.length).toBe(1)
  })

  afterEach(async () => {
    await server.stop()
  })

  afterAll(() => {
    jest.unmock('../../server/session')
  })
})
