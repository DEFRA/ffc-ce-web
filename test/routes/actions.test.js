let actionsService

const goodActionID = 'GOOD1'

const actions = [
  { id: goodActionID, description: 'Fencing', eligible: true },
  { id: 'BAD1', description: 'New Action', eligible: false, reason: 'Why it is false' }
]
const parcelRef = 'PR12345'

let session

function createMocks () {
  jest.mock('../../server/services/actions-service')
  actionsService = require('../../server/services/actions-service')
  actionsService.getActions.mockImplementation(() => Promise.resolve(actions))

  jest.mock('../../server/session')
  session = require('../../server/session')
  session.getParcelRef.mockImplementation((request) => parcelRef)
  session.setActionId.mockImplementation((request, actionId) => actionId)
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
    expect(response.payload).toContain(goodActionID)
    expect(response.payload).toContain(actions[1].id)
    expect(response.payload).toContain(actions[1].reason)
  })

  test('POST /actions route redirects to GET /action-inputs if action chosen', async () => {
    const postOptions = {
      method: 'POST',
      url: '/actions',
      payload: {
        actionId: goodActionID
      }
    }

    const postResponse = await server.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('/action-inputs')

    expect(session.setActionId.mock.calls.length).toBe(1)
    expect(session.setActionId.mock.calls[0][1]).toBe(goodActionID)
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
    expect(session.setActionId.mock.calls.length).toBe(0)
  })

  test('actions service getActions call requires parcel ref', async () => {
    const postOptions = {
      method: 'POST',
      url: '/actions',
      payload: {}
    }

    await server.inject(postOptions)

    expect(actionsService.getActions).toHaveBeenCalledWith(parcelRef)
  })

  afterEach(async () => {
    await server.stop()
    jest.clearAllMocks()
  })
})
