const actionsInputsModel = require('../../server/models/action-inputs-model')

describe('actions inputs model', () => {
  test('if error provided, should populate errorMessage', async () => {
    const error = 'sample error message'
    const model = actionsInputsModel('', '', error)
    expect(model.errorMessage).toEqual(
      expect.objectContaining({ text: error })
    )
  })

  test('if error isn\'t provided, errorMessage should be omitted', async () => {
    const model = actionsInputsModel('', '')
    expect(model.errorMessage).toBeUndefined()
  })

  test('label class set to govuk-label--xl', async () => {
    const model = actionsInputsModel('', '')
    expect(model.label.classes).toBe('govuk-label--xl')
  })

  test('label isPageHeading is true', async () => {
    const model = actionsInputsModel('', '')
    expect(model.label.isPageHeading).toBeTruthy()
  })

  test('id is actionInput', async () => {
    const model = actionsInputsModel('', '')
    expect(model.id).toBe('actionInput')
  })

  test('name is actionInput', async () => {
    const model = actionsInputsModel('', '')
    expect(model.label.classes).toBe('govuk-label--xl')
  })

  test('title and hint refers to fencing for Action ID FG1', async () => {
    const model = actionsInputsModel('', 'FG1')
    expect(model.label.text).toBe('Enter a fence length in metres')
    expect(model.hint.text).toBe('How long is the fence you want to claim on in metres for ?')
  })

  test('title and hintrefers to acres for Action ID SW6', async () => {
    const model = actionsInputsModel('', 'SW6')
    expect(model.label.text).toBe('Enter the area in hectares')
    expect(model.hint.text).toBe('What is the area you wish to claim on in hectares for ?')
  })
})
