const paymentsModel = require('../../server/models/payments-model')

describe('payments model', () => {
  test('Confirmation text includes title', () => {
    expect(paymentsModel(true).panel.titleText).toBeDefined()
  })

  test('Confirmation text indicates entitlement when entitled flag is true', () => {
    const model = paymentsModel(true)
    expect(model.panel.html).toBe('You\'re eligible for a payment')
  })

  test('Confirmation text informs no entitlement when entitled flag is false', () => {
    const model = paymentsModel(false)
    expect(model.panel.html).toBe('You\'re not eligible for a payment')
  })

  test('Contains eligible flag', () => {
    const testCases = [true, false]
    for (const testCase of testCases) {
      const model = paymentsModel(testCase)
      expect(model.eligible).toBe(testCase)
    }
  })

  test('Contains parcelRef', () => {
    const testCases = ['AA1111', 'BB2222', 'CC3333']
    for (const testCase of testCases) {
      const model = paymentsModel(true, testCase, '', 1)
      expect(model.parcelRef).toBe(testCase)
    }
  })

  test('Contains actionId', () => {
    const testCases = ['aaa111', 'bbb222', 'ccc333']
    for (const testCase of testCases) {
      const model = paymentsModel(true, '', testCase, 1)
      expect(model.actionId).toBe(testCase)
    }
  })

  test('Contains payment', () => {
    const testCases = [36, 82, 194]
    for (const testCase of testCases) {
      const model = paymentsModel(true, '', '', testCase)
      expect(model.payment).toBe(testCase)
    }
  })
})
