const paymentsModel = require('../../server/models/payments-model')

describe('payments model', () => {
  test('Confirmation title indicates entitlement when entitled flag is true', () => {
    const model = paymentsModel(true)
    expect(model.panel.titleText).toBe('You\'re entitled to a payment')
  })

  test('Confirmation title informs no entitlement when entitled flag is false', () => {
    const model = paymentsModel(false)
    expect(model.panel.titleText).toBe('You\'re not entitled to a payment')
  })

  test('Confirmation html includes payment when entitled to a payment', () => {
    const testCases = [36, 82, 194]
    for (const testCase of testCases) {
      const model = paymentsModel(true, '', '', testCase)
      expect(model.panel.html).toContain(testCase.toString())
    }
  })

  test('Confirmation html includes parcel ref when entitled to a payment', () => {
    const testCases = ['AA1111', 'BB2222', 'CC3333']
    for (const testCase of testCases) {
      const model = paymentsModel(true, testCase)
      expect(model.panel.html).toContain(testCase)
    }
  })

  test('Confirmation html includes action id when entitled to a payment', () => {
    const testCases = ['aaa111', 'bbb222', 'ccc333']
    for (const testCase of testCases) {
      const model = paymentsModel(true, '', testCase)
      expect(model.panel.html).toContain(testCase)
    }
  })

  test('Confirmation html excludes payment when not entitled to a payment', () => {
    const testCases = [36, 82, 194]
    for (const testCase of testCases) {
      const model = paymentsModel(false, '', '', testCase)
      expect(model.panel.html).not.toContain(testCase.toString())
    }
  })

  test('Confirmation html includes parcel ref when not entitled to a payment', () => {
    const testCases = ['AA1111', 'BB2222', 'CC3333']
    for (const testCase of testCases) {
      const model = paymentsModel(false, testCase)
      expect(model.panel.html).toContain(testCase)
    }
  })

  test('Confirmation html includes action id when not entitled to a payment', () => {
    const testCases = ['aaa111', 'bbb222', 'ccc333']
    for (const testCase of testCases) {
      const model = paymentsModel(false, '', testCase)
      expect(model.panel.html).toContain(testCase)
    }
  })

  test('Contains eligible flag', () => {
    const testCases = [true, false]
    for (const testCase of testCases) {
      const model = paymentsModel(testCase)
      expect(model.eligible).toBe(testCase)
    }
  })
})
