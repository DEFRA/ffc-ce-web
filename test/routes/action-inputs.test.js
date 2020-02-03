const action = {
  id: 'FG1',
  description: 'Fencing',
  input: {
    unit: 'metre',
    description: 'metres',
    upperbound: 100,
    lowerbound: 2
  },
  inputs: [
    {
      unit: 'metre',
      description: 'fence length'
    }
  ]
}
const parcelRef = 'PR12345'
const allParcels = [{ ref: parcelRef, description: 'Test parcel', totalPerimeter: 10, totalArea: 1 }]

let session

function createMocks () {
  jest.mock('../../server/session')
  session = require('../../server/session')
  session.getParcelRef = (request) => parcelRef
  session.getActionId = (request) => action.id
  session.getAllParcelData = (request) => allParcels
  session.setActionInput = jest.fn((request, actionInput) => actionInput)

  jest.mock('../../server/services/actions-service')
  const actionsService = require('../../server/services/actions-service')
  actionsService.getActionWithInput.mockResolvedValue(action)
}

describe('Action Inputs route test', () => {
  const expectedErrorMessage = 'You must enter a number greater than zero'
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
  })

  test('GET /action-inputs displays bounds if available', async () => {
    const options = {
      method: 'GET',
      url: '/action-inputs'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain(`Please choose a value between ${action.input.lowerbound} and ${action.input.upperbound}`)
  })

  test('POST /action-inputs route redirects to GET /calculation-result if calculation requested', async () => {
    const actionInput = '54.5'
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
    expect(session.setActionInput.mock.calls.length).toBe(0)
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
    expect(session.setActionInput.mock.calls.length).toBe(0)
  })

  afterEach(async () => {
    await server.stop()
    jest.clearAllMocks()
  })
})
