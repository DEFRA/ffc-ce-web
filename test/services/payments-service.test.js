const mockConfig = {
  paymentUrl: 'payment-url',
  restClientTimeoutMillis: 99
}

const wreck = require('@hapi/wreck')
jest.mock('@hapi/wreck')
wreck.post.mockImplementation(() => Promise.resolve(() => ({ payload: {} })))
wreck.defaults.mockImplementation(() => wreck)
jest.mock('../../server/config', () => mockConfig)

describe('payments service', () => {
  const paymentsService = require('../../server/services/payments-service')

  // important we don't clear mocks before this test...
  test('sets timeout on inclusion', () => {
    expect(wreck.defaults).toHaveBeenCalledWith(
      expect.objectContaining({
        timeout: mockConfig.restClientTimeoutMillis
      })
    )
  })

  describe('payments service tests', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('makes a POST request to payment-calculations endpoint', async () => {
      const { parcelRef, actionId, quantity } = getSampleRequestPayload()
      await paymentsService.calculatePayment(parcelRef, actionId, quantity)
      expect(wreck.post).toHaveBeenCalledWith(
        `${mockConfig.paymentUrl}/parcels/${parcelRef}/actions/${actionId}/payment-calculation`,
        expect.any(Object)
      )
    })

    test('requests response as JSON', async () => {
      await paymentsService.calculatePayment(getSampleRequestPayload())
      expect(wreck.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ json: true })
      )
    })

    test('passes quantity in payload', async () => {
      const quantity = 99
      await paymentsService.calculatePayment('ddd-111', 'a1', quantity)
      const payloadData = JSON.stringify({ quantity })
      expect(wreck.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          payload: expect.stringMatching(payloadData)
        })
      )
    })

    test('returns server payload', async () => {
      const payload = { eligible: true, value: 99 }
      wreck.post.mockImplementation(() => ({ payload }))
      const result = await paymentsService.calculatePayment(getSampleRequestPayload())
      expect(result).toEqual(payload)
    })

    const getSampleRequestPayload = () => ({
      parcelRef: 'SD12345678',
      actionId: 'FG1',
      quantity: 0
    })
  })
})
