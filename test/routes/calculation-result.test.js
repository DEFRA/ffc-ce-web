const paymentService = require('../../server/services/payments-service')
const createServer = require('../../server/createServer')
const session = require('../../server/session')

jest.mock('../../server/services/payments-service')
jest.mock('../../server/session')

describe('Payments route test', () => {
  let server

  beforeEach(async () => {
    jest.clearAllMocks()
    paymentService.calculatePayment.mockImplementation(() => ({ eligible: true, value: 1 }))
    session.getParcelRef.mockImplementation(() => 'ddd-111')
    session.getActionId.mockImplementation(() => 'action-1')
    session.getActionInput.mockImplementation(() => 1)
    server = await createServer()
  })

  test('GET /calculation-result route returns 200', async () => {
    const response = await server.inject(getOptions())
    expect(response.statusCode).toBe(200)
  })

  test('provides request to getParcelRef', async () => {
    await server.inject(getOptions())
    expect(session.getParcelRef).toHaveBeenCalledWith(
      expect.objectContaining({
        yar: expect.objectContaining({
          get: expect.any(Function)
        })
      })
    )
  })

  test('provides request to getActionId', async () => {
    await server.inject(getOptions())
    expect(session.getActionId).toHaveBeenCalledWith(
      expect.objectContaining({
        yar: expect.objectContaining({
          get: expect.any(Function)
        })
      })
    )
  })

  test('provides request to getActionInput', async () => {
    await server.inject(getOptions())
    expect(session.getActionInput).toHaveBeenCalledWith(
      expect.objectContaining({
        yar: expect.objectContaining({
          get: expect.any(Function)
        })
      })
    )
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

  test('Displays parcel ref in response for eligible application', async () => {
    const testCases = ['AA1111', 'BB2222', 'CC3333']
    for (const testCase of testCases) {
      session.getParcelRef.mockImplementation(() => testCase)
      const response = await server.inject(getOptions())
      expect(response.payload).toContain(testCase)
    }
  })

  test('Displays action id in response for eligible application', async () => {
    const testCases = ['aaa111', 'bbb222', 'ccc333']
    for (const testCase of testCases) {
      session.getActionId.mockImplementation(() => testCase)
      const response = await server.inject(getOptions())
      expect(response.payload).toContain(testCase)
    }
  })

  test('Displays result text', async () => {
    const testCases = [true, false]
    for (const testCase of testCases) {
      paymentService.calculatePayment.mockImplementation(() => ({ eligible: testCase, value: 1 }))
      const response = await server.inject(getOptions())
      expect(response.payload).toContain('Result')
    }
  })

  test('Displays not entitled message in response when paymentService deems a parcel ineligible', async () => {
    paymentService.calculatePayment.mockImplementation(() => ({ eligible: false }))
    const response = await server.inject(getOptions())
    expect(response.payload).toContain('You\'re not eligible for a payment')
  })

  test('Displays parcel ref in response for ineligible application', async () => {
    const testCases = ['AA1111', 'BB2222', 'CC3333']
    paymentService.calculatePayment.mockImplementation(() => ({ eligible: false }))

    for (const testCase of testCases) {
      session.getParcelRef.mockImplementation(() => testCase)
      const response = await server.inject(getOptions())
      expect(response.payload).toContain(testCase)
    }
  })

  test('Displays action id in response for ineligible application', async () => {
    const testCases = ['aaa111', 'bbb222', 'ccc333']
    paymentService.calculatePayment.mockImplementation(() => ({ eligible: false }))

    for (const testCase of testCases) {
      session.getActionId.mockImplementation(() => testCase)
      const response = await server.inject(getOptions())
      expect(response.payload).toContain(testCase)
    }
  })

  afterEach(async () => {
    await server.stop()
  })

  const getOptions = () => ({
    method: 'GET',
    url: '/calculation-result'
  })
})
