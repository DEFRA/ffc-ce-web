const paymentService = require('../../server/services/payments-service')
const createServer = require('../../server/createServer')
const session = require('../../server/session')

jest.mock('../../server/services/payments-service')
paymentService.calculatePayment.mockImplementation(() => ({ eligible: true, value: 1 }))
jest.mock('../../server/session')
session.getParcelRef.mockImplementation(() => 'ddd-111')
session.getActionId.mockImplementation(() => 'action-1')
session.getActionInput.mockImplementation(() => 43)

describe('Payments route test', () => {
  let server

  beforeEach(async () => {
    jest.clearAllMocks()
    server = await createServer()
  })

  test('GET /calculation-result route returns 200', async () => {
    const response = await server.inject(getOptions())
    expect(response.statusCode).toBe(200)
  })

  test('Calls payment service with provided parcel ref, action id and action input', async () => {
    const parcelRef = 'abc-123'
    const actionId = 'commando-roll'
    const actionInput = 22
    session.getParcelRef.mockImplementation(() => parcelRef)
    session.getActionId.mockImplementation(() => actionId)
    session.getActionInput.mockImplementation(() => actionInput)

    await server.inject(getOptions())
    expect(paymentService.calculatePayment).toHaveBeenCalledWith(parcelRef, actionId, actionInput)
  })

  test('Displays payment amount in response', async () => {
    const testCases = [
      { eligible: true, value: 12 },
      { eligible: true, value: 91 },
      { eligible: true, value: 186 }
    ]
    for (const testCase of testCases) {
      paymentService.calculatePayment.mockImplementation(() => testCase)
      const response = await server.inject(getOptions())
      expect(response.payload).toContain(`£${testCase.value}`)
    }
  })

  test('Displays payment amount in response', async () => {
    paymentService.calculatePayment.mockImplementation(() => ({ eligible: false }))
    const response = await server.inject(getOptions())
    expect(response.payload).toContain('You are not entitled to carry out that Action on that Parcel.')
  })

  afterEach(async () => {
    await server.stop()
  })

  const getOptions = () => ({
    method: 'GET',
    url: '/calculation-result'
  })
})
