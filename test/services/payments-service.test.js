const mockConfig = {
  paymentCalculationUrl: 'payment-calculation-url',
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

    test('makes a GET request to payment-calculations endpoint', async () => {
      await paymentsService.calculatePayment(getSampleRequestPayload())
      expect(wreck.post).toHaveBeenCalledWith(
        mockConfig.paymentCalculationUrl,
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

    test('passes parcel ref in payload', async () => {
      const parcelRef = 'abc-123'
      await paymentsService.calculatePayment(parcelRef, 'a1', 0)
      expect(wreck.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          payload: expect.objectContaining({
            parcelRef
          })
        })
      )
    })

    test('passes action in payload', async () => {
      const id = 'action-1'
      await paymentsService.calculatePayment('ddd-111', id, 0)
      expect(wreck.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          payload: expect.objectContaining({
            actions: expect.arrayContaining([
              expect.objectContaining({ action: { id } })
            ])
          })
        })
      )
    })

    test('passes quantity in payload', async () => {
      const quantity = 99
      await paymentsService.calculatePayment('ddd-111', 'a1', quantity)
      expect(wreck.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          payload: expect.objectContaining({
            actions: expect.arrayContaining([
              expect.objectContaining({ options: { quantity } })
            ])
          })
        })
      )
    })

    test('returns server payload', async () => {
      const payload = { eligible: true, value: 99 }
      wreck.post.mockImplementation(() => ({ payload }))
      const result = await paymentsService.calculatePayment(getSampleRequestPayload)
      expect(result).toEqual(payload)
    })

    const getSampleRequestPayload = (payload = {}) => ({
      parcelRef: '',
      quantity: 0,
      ...payload
    })
  })
})
