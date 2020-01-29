const paymentsModel = require('../../server/models/payments-model')

describe('payments model', () => {
  test('Confirmation text includes title', () => {
    expect(paymentsModel(true, '', '', 1).panel.titleText).toBeDefined()
    expect(paymentsModel(false, '', '', 1).panel.titleText).toBeDefined()
  })

  test('Confirmation text indicates entitlement when entitled flag is true', () => {
    const model = paymentsModel(true, '', '', 1)
    expect(model.panel.html).toBe('You\'re eligible for a payment')
  })

  test('Confirmation text informs application unsuccessful when entitled flag is false', () => {
    const model = paymentsModel(false, '', '', 1)
    expect(model.error.titleText).toBe('Application unsuccessful')
  })

  test('Confirmation text includes error messages when entitled flag is false', () => {
    const model = paymentsModel(false, '', '', 1, ['Message 1', 'Message 2'])
    expect(model.error.errorList).toStrictEqual(
      [
        {
          text: 'Message 1'
        },
        {
          text: 'Message 2'
        }
      ]
    )
  })

  test('Contains eligible flag', () => {
    const testCases = [true, false]
    for (const testCase of testCases) {
      const model = paymentsModel(testCase, '', '', 1)
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
      expect(model.actionTitle).toBe(testCase)
    }
  })

  test('Contains payment', () => {
    const testCases = [
      {
        input: 36.124214,
        output: '36.12'
      },
      {
        input: 82,
        output: '82.00'
      },
      {
        input: 0.158,
        output: '0.16'
      },
      {
        input: 194.1,
        output: '194.10'
      }
    ]
    for (const testCase of testCases) {
      const model = paymentsModel(true, '', '', testCase.input)
      expect(model.payment).toBe(testCase.output)
    }
  })
})
