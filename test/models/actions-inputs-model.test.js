const actionsInputsModel = require('../../server/models/action-inputs-model')

describe('actions inputs model', () => {
  test('if error provided, should populate errorMessage', () => {
    const error = 'sample error message'
    const model = actionsInputsModel('', '', error)
    expect(model.errorMessage).toEqual(
      expect.objectContaining({ text: error })
    )
  })

  test('if error isn\'t provided, errorMessage should be omitted', () => {
    const model = actionsInputsModel('', '')
    expect(model.errorMessage).toBeUndefined()
  })

  test('hint text contains parcelRef', () => {
    const parcelRef = 'SS1234'
    const model = actionsInputsModel(parcelRef, '')
    expect(model.hint.text).toContain(parcelRef)
  })

  test('hint text contains actionId', () => {
    const actionId = 'acb123'
    const model = actionsInputsModel('', actionId)
    expect(model.hint.text).toContain(actionId)
  })

  test('label class set to govuk-label--xl', () => {
    const model = actionsInputsModel('', '')
    expect(model.label.classes).toBe('govuk-label--xl')
  })

  test('label isPageHeading is true', () => {
    const model = actionsInputsModel('', '')
    expect(model.label.isPageHeading).toBeTruthy()
  })

  test('id is actionInput', () => {
    const model = actionsInputsModel('', '')
    expect(model.id).toBe('actionInput')
  })

  test('name is actionInput', () => {
    const model = actionsInputsModel('', '')
    expect(model.label.classes).toBe('govuk-label--xl')
  })
})
