const paymentsModel = require('../../server/models/payments-model')

describe('payments model', () => {
  test('sets entitled flag', () => {
    const testCases = [{ entitled: true, payment: 1 }, { entitled: false }]
    for (const testCase of testCases) {
      const { entitled, payment } = testCase
      expect(paymentsModel(entitled, payment)).toEqual(
        expect.objectContaining({ entitled })
      )
    }
  })

  test('sets payment', () => {
    const testCases = [52, 86, 99]
    for (const testCase of testCases) {
      expect(paymentsModel(true, testCase)).toEqual(
        expect.objectContaining({ payment: testCase })
      )
    }
  })

  test('defaults payment to 0 if not provided and entitled is false', () => {
    expect(paymentsModel(false)).toEqual(
      expect.objectContaining({ payment: 0 })
    )
  })

  test('throws error if entitled is true and no payment provided', () => {
    expect(() => paymentsModel(true)).toThrow('payment should be provided if entitled is true')
  })
})
